import os
import asyncio
from dotenv import load_dotenv
from pinecone import Pinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from config.db import chunk_collection

# environment
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY


#  initialize pinecone client
pc=Pinecone(api_key=PINECONE_API_KEY)
index=pc.Index(PINECONE_INDEX_NAME)
#  define embedding model
embed_model=GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
#  define llm model
llm=ChatGroq(temperature=0.3, model_name="llama-3.3-70b-versatile", groq_api_key=GROQ_API_KEY)
#  define chat prompt
rag_prompt = PromptTemplate.from_template(
    """
You are a helpful educational assistant.
Answer the question using ONLY the context below.

Question:
{question}

Context:
{context}

If relevant, mention the document source.

"""
)

quiz_prompt = PromptTemplate.from_template(
     """
You are a test-generating assistant.

Using the context below, generate {num_questions}
multiple-choice questions.

Format STRICTLY as:

Question 1: ...
A) ...
B) ...
C) ...
Correct Answer: A

Context:
{context}
"""
)
# define rag chain
rag_chain = rag_prompt | llm
quiz_chain = quiz_prompt | llm

#  define the chat function
async def answer_query(query:str,user_role:str,user_grade:int)->dict:
    # embedding generation
    embedding = await asyncio.to_thread(embed_model.embed_query,query)
    #  etrieve relevant embedding from vector db
    results = await asyncio.to_thread(
        index.query,vector = embedding,top_k=5,include_metadata=True,filter={
            "grade":user_grade,
            "role":{"$in":["Public",user_role]}
        },
    )
    #  validation check 
    if not results.get("matches"):
        return {"answer":"No relevant information found","sources":[]}

    #  retrieve context from mongodb
    # get chunk id
    chunk_ids = [ m["id"] for m in results["matches"]]
    #  get document/text
    docs=list(chunk_collection.find({"chunk_id":{"$in":chunk_ids}}))
    #  validation check
    if not docs:
        return {"answer":"Context unavailable","sources":[]}
    #  preserve context order 
    doc_map = { d["chunk_id"]:d for d in docs}
    ordered_map = [doc_map[cid] for cid in chunk_ids if cid in doc_map]

    context = "\n\n".join(d["text"] for d in ordered_map)
    sources = list({ d["source"] for d in ordered_map})

    response = await asyncio.to_thread(
        rag_chain.invoke,
        {"question":query,"context":context}
    )
    answer_text = (
        response.content
        if hasattr(response,"content")
        else str(response)
    )

    return {
        "answer":answer_text,
        "sources":sources,
    }



async def quiz_generation(topic:str,user_role:str,user_grade:int,num_questions:int=3,)->dict:
    # embedding generation
    embedding = await asyncio.to_thread(embed_model.embed_query,topic)
    # retrieve relevant embedding from vector db
    results = await asyncio.to_thread(
        index.query,vector = embedding,top_k=5,include_metadata=True,filter={
            "grade":user_grade,
            "role":{"$in":["Public",user_role]}
        },
    )
    # validation check 
    if not results.get("matches"):
        return {"quiz":"No relevant information found to generate quiz","sources":[]}

    # retrieve context from mongodb
    # get chunk id
    chunk_ids = [ m["id"] for m in results["matches"]]
    # get document/text
    docs = list(chunk_collection.find({"chunk_id":{"$in":chunk_ids}}))
    # validation check
    if not docs:
        return {"quiz":"Context unavailable to generate quiz","sources":[]}
    # preserve context order 
    doc_map = { d["chunk_id"]:d for d in docs}
    ordered_map = [doc_map[cid] for cid in chunk_ids if cid in doc_map]

    context="\n\n".join(d["text"] for d in ordered_map)
    sources=list({ d["source"] for d in ordered_map})
    # gather response
    response = await asyncio.to_thread(
        quiz_chain.invoke,
        {"num_questions":num_questions,"context":context}
    )
    # get proper answer
    quiz_text = (
        response.content
        if hasattr(response,"content")
        else str(response)
    )

    return {
        "quiz":quiz_text,
        "sources":sources,
    }

from fastapi import APIRouter, UploadFile,File,Form,HTTPException
from config.db import documents_collection
from .vectorstore import load_vectorstore
import uuid
import datetime

router=APIRouter()

@router.post("/upload_docs")
async def upload_docs(file: UploadFile=File(...),topic:str=Form(...),):
    """
    Upload a PDF docuent and index it into:
    - MongoDB (full text chunks)
    - Pinecone (embeddings only)

    Access is set to 'Public' by default
    """

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )
    
    doc_id=str(uuid.uuid4())
    ACCESS_ROLE="Public"

    # call vectiorstore function
    try:
        await load_vectorstore(uploaded_files=[file],role=ACCESS_ROLE,doc_id=doc_id,topic=topic)
        documents_collection.insert_one({
            "doc_id": doc_id,
            "filename": file.filename,
            "topic": topic,
            "access": ACCESS_ROLE,
            "uploaded_at": datetime.datetime.utcnow(),
    })
    except Exception as e:
        print("Error during document upload:",e)
        raise HTTPException(
            status_code=500,
            detail="Failed to process and index the document"
        )
    
    return {
        "message":f"{file.filename} uploaded and indexed successfully",
        "doc_id":doc_id,
        "topic":topic,
        "access":ACCESS_ROLE
    }
    
    
@router.get("/documents")
async def get_documents():
    cursor = documents_collection.find().sort("uploaded_at", -1)

    documents = []

    for doc in cursor:
        documents.append({
            "id": str(doc["_id"]),
            "doc_id": doc["doc_id"],
            "filename": doc["filename"],
            "topic": doc["topic"],
            "access": doc["access"],
            "uploaded_at": doc["uploaded_at"],
        })

    return {
        "documents": documents
    }


@router.get("/documents/topics")
async def get_topics():
    topics = documents_collection.distinct("topic")

    return {
        "topics": sorted(topics)
    }
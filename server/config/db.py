import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "test_db")


client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# collections
users_collection = db["users"]
chunk_collection = db["text"]
chat_history_collection = db["chat_history"]
quizzes_collection = db["quizzes"]
quiz_history = db["history"]
documents_collection = db["documents"]
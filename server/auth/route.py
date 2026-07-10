from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasic
from .model import StudentUser, TeacherUser
from config.db import users_collection
from .hash_utils import hash_password,verify_password

router = APIRouter()
security=HTTPBasic()

@router.post("/signup/student")
def signup_student(req:StudentUser):
    """Hnadles a student signup request"""
    # Check if username already exists
    if users_collection.find_one({"username":req.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # hash the passsword before storing
    hashed_password=hash_password(req.password)
    users_collection.insert_one({
        "fullname":req.fullname,
        "email":req.email,
        "username":req.username,
        "password":hashed_password,
        "grade":req.grade,
        "school":req.school,
    })
    return {"message":"Student user created successfully"}

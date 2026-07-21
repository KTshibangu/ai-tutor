from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Body
from .model import StudentUser, TeacherUser
from config.db import users_collection
from .hash_utils import hash_password,verify_password
from .jwt import verify_token, create_access_token


router = APIRouter()
security = HTTPBasic()
security = HTTPBearer()

def authenticate(credentials:HTTPAuthorizationCredentials=Depends(security)):
    """Authenticates a user using JWT"""
    payload = verify_token(credentials.credentials)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload


@router.post("/signup/student")
def signup_student(req:StudentUser):
    """Hnadles a student signup request"""
    # Check if username already exists
    if users_collection.find_one({"username":req.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # hash the passsword before storing
    hashed_password=hash_password(req.password)
    users_collection.insert_one({
        "fullName":req.fullName,
        "email":req.email,
        "username":req.username,
        "password":hashed_password,
        "role":"Student",
        "grade":req.grade,
        "school":req.school,
    })
    return {"message":"Student user created successfully"}



@router.post("/signup/teacher")
def teacher_student(req:TeacherUser):
    """Hnadles a Teacher signup request"""
    # Check if username already exists
    if users_collection.find_one({"username":req.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # hash the passsword before storing
    hashed_password=hash_password(req.password)
    users_collection.insert_one({
        "fullName":req.fullName,
        "email":req.email,
        "username":req.username,
        "password":hashed_password,
        "role":"Teacher",
        "school":req.school,
    })
    return {"message":"Teacher user created successfully"}


@router.post("/login")
def login(
    username: str = Body(...),
    password: str = Body(...)
):
    user = users_collection.find_one({
        "username": username
    })

    if not user:
        raise HTTPException(
            401,
            "Invalid username or password"
        )

    if not verify_password(password, user["password"]):
        raise HTTPException(
            401,
            "Invalid username or password"
        )

    token = create_access_token({
        "username": user["username"],
        "role": user["role"],
        "user_id": str(user["_id"])
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"],
        "username": user["username"]
    }
from pydantic import BaseModel

class StudentUser(BaseModel):
    fullName:str
    email:str
    username:str
    password:str
    grade:int
    school:str

class TeacherUser(BaseModel):
    fullName:str
    email:str
    username:str
    password:str
    school:str
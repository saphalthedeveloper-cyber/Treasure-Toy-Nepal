from datetime import datetime

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    password: str
    created_at: datetime
    updated_at: datetime

class UserLogin(BaseModel):
    email:EmailStr
    password:str
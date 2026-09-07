from datetime import date, datetime

from pydantic import BaseModel

class ChildCreate(BaseModel):
    user_id: int
    name: str 
    gender: str 
    date_of_birth: date 


class ChildResponse(BaseModel):
    id: int
    user_id: int
    name: str 
    gender: str 
    date_of_birth: date
    created_at: datetime
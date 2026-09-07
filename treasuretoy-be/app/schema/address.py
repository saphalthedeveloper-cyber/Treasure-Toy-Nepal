from datetime import datetime

from pydantic import BaseModel

class AddressCreate(BaseModel):
    user_id: int
    street: str
    city: str

class AddressResponse(BaseModel):
    id: int
    user_id: int
    street: str
    city: str
    created_at: datetime

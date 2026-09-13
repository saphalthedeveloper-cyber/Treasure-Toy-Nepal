from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel

class OrderCreate(BaseModel):
    user_id: int
    total_amount: Decimal

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: Decimal
    status: str = "pending"
    created_at: datetime
    updated_at: datetime
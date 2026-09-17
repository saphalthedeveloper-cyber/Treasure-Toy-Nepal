from decimal import Decimal
from datetime import datetime
from .order_item import OrderItemResponse
from pydantic import BaseModel,ConfigDict

class OrderCreate(BaseModel):
    user_id: int
    total_amount: Decimal

class OrderResponse(BaseModel):
    

    id: int
    user_id: int
    total_amount: Decimal
    status: str = "pending"
    items: list[OrderItemResponse]
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
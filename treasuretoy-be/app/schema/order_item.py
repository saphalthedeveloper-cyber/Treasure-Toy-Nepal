from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel

class OrderItemCreate(BaseModel):
    order_id: int
    product_id: int
    quantity: int = 1
   

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: Decimal
    created_at: datetime
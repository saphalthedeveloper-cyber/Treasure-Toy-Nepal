from decimal import Decimal
from datetime import datetime
from .products import ProductResponse
from pydantic import BaseModel

class OrderItemCreate(BaseModel):
    order_id: int
    product_id: int
    quantity: int 
    price:int
    class Config:from_attributes = True

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: Decimal
    created_at: datetime
    product: ProductResponse
    class Config:from_attributes = True
from decimal import Decimal
from datetime import datetime
from .order_item import OrderItemResponse
from pydantic import BaseModel,ConfigDict
from .payment import PaymentResponse

class OrderCreate(BaseModel):
    product_id: int
    quantity: int

class OrderResponse(BaseModel):
    

    id: int
    user_id: int
    total_amount: Decimal
    status: str = "pending"
    items: list[OrderItemResponse]
    created_at: datetime
    updated_at: datetime
    payment: list[PaymentResponse] | None = None
    delivery_fee: Decimal = 100

    model_config = ConfigDict(from_attributes=True)
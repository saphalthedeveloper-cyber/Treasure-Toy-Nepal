from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PaymentCreate(BaseModel):
    order_id: int
    amount: float
    method:str

class PaymentResponse(BaseModel):
    id: int
    order_id: int
    amount: float
    status: str
    method: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class EsewaPaymentResponse(BaseModel):
    payment_id: int
    total_amount: str
    transaction_uuid: str
    product_code: str
    signature: str
    signed_field_names: str
    payment_url: str
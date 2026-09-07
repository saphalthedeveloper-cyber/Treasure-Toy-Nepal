from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel,ConfigDict


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: Decimal
    stock: int
    category_id: int
    image: str | None
    min_age_months: int
    max_age_months: int 
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
    
    
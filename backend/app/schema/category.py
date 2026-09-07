from pydantic import BaseModel,ConfigDict
from typing import List

from .products import ProductResponse

class CategoryResponse(BaseModel):
    id: int
    age: str
    min_age_months: int
    max_age_months: int
    image: str
    products: List[ProductResponse] = []

model_config = ConfigDict(from_attributes=True)
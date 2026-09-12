from datetime import date, datetime

from pydantic import BaseModel

class SubscriptionCreate(BaseModel):
    user_id: int
    child_id: int
    plan: str
    start_date: date | None = None
    next_billing_date: date | None = None
    next_delivery_date: date | None = None


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    child_id: int
    status: str="{state.plan}"
    plan:str
    start_date: date | None
    next_billing_date: date | None
    next_delivery_date: date | None
    created_at: datetime
    updated_at: datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.security import get_current_user
from app.database import get_db
from app.models.subscription import Subscription
from app.schema.subscription import SubscriptionCreate, SubscriptionResponse

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.post("/", response_model=SubscriptionResponse)
def create_subscription(sub: SubscriptionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_sub = Subscription(**sub.model_dump(),status='ACTIVE')
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub
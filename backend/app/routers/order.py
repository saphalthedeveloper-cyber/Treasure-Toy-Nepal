from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.database import get_db
from app.models.order import Order
from app.schema.order import OrderCreate, OrderResponse
# from app.security import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    # ,current_user: User = Depends(get_current_user)
    new_order = Order(**order.model_dump())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order
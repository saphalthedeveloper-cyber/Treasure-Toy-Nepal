from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.products import Product
from app.models.users import User
from app.security import get_current_user
from app.database import get_db
from app.models.order_item import OrderItem
from app.schema.order_item import OrderItemCreate, OrderItemResponse

router = APIRouter(prefix="/order-items", tags=["Order Items"])


@router.post("/", response_model=OrderItemResponse)
def create_order_item(item: OrderItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == item.product_id).first()

    new_item = OrderItem(
        order_id=item.order_id,
        product_id=item.product_id,
        quantity=item.quantity,
        price=product.price
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
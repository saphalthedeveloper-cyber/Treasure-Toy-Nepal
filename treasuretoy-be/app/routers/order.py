from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.models.products import Product
from fastapi import HTTPException
from app.database import get_db
from app.models.order import Order
from app.schema.order import OrderCreate, OrderResponse
from app.security import get_current_user

router = APIRouter(prefix="/order", tags=["Orders"])


@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db) ,current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    item_total = product.price * order.quantity

    delivery_fee = 100

    total_price = item_total + delivery_fee

    new_order = Order(
        user_id=current_user.id,
        product_id=product.id,
        delivery_fee=delivery_fee,
        total_amount=total_price,
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    return new_order

@router.get('/orderhistory',response_model=list[OrderResponse])
def show_order(db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    db_order=db.query(Order).filter(
        Order.user_id==current_user.id
    ).all()
    return db_order
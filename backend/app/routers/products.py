from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.products import Product
from app.schema.products import ProductResponse
from app.security import get_current_user
from app.models.users import User

router = APIRouter(prefix="/products", tags=["Products"])



@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db),current_user:User=Depends(get_current_user)):
    db_product=db.query(Product).all()
    return db_product 

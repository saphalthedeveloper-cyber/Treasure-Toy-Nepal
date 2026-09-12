from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.orm import Session
from sqlalchemy.orm import Session
from app.models.users import User
# from app.security import get_current_user
from app.database import get_db
from app.models.category import Category
from app.schema.category import CategoryResponse

router = APIRouter(prefix="/category", tags=["Category"])


@router.get("/", response_model=list[CategoryResponse])
def get_category(db: Session = Depends(get_db)):
    #  , current_user: User = Depends(get_current_user)
    
    db_category=db.query(Category).order_by(Category.min_age_months).all()
    if not db_category:
            raise HTTPException(status_code=404, detail="Category not found")
    return db_category

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

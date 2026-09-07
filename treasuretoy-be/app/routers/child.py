from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.security import get_current_user
from app.database import get_db
from app.models.child import Child
from app.schema.child import ChildCreate, ChildResponse

router = APIRouter(prefix="/children", tags=["Children"])


@router.post("/", response_model=ChildResponse)
def create_child(child: ChildCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_child = Child(**child.model_dump())
    db.add(new_child)
    db.commit()
    return new_child
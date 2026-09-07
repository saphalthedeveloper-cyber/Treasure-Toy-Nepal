from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.security import get_current_user
from app.database import get_db
from app.models.address import Address
from app.schema.address import AddressCreate, AddressResponse

router = APIRouter(prefix="/addresses", tags=["Addresses"])


@router.post("/", response_model=AddressResponse)
def create_address(address: AddressCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    new_address = Address(**address.model_dump())
    db.add(new_address)
    db.commit()
    db.refresh(new_address)
    return new_address
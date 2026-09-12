from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.users import User
from app.schema.users import UserCreate, UserResponse,UserLogin
from app.security import hash_password,verify_password,create_access_token

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_existing=db.execute(select(User).where(User.email==user.email)).scalar_one_or_none()
    if user_existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user already exits"
        )
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post('/login')
def login(user:UserLogin,db:Session=Depends(get_db)):
        
        db_user=db.execute(select(User).where(User.email==user.email)
        ).scalar_one_or_none()

        if not db_user :
             raise HTTPException(
                   status_code=status.HTTP_401_UNAUTHORIZED,
                   detail="Invalid email and password"
             ) 
           
        is_valid=verify_password(user.password,db_user.password)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
    )
        
        data={"sub":db_user.email}
        access_token=create_access_token(data)
        return {
            "message":"login Succesfull",
            "access_token":access_token,
             "user_id": db_user.id,

        }

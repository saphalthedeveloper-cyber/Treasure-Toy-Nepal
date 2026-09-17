from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.users import User
from app.schema.users import UserCreate, UserResponse,UserLogin,GoogleLoginRequest
from app.security import hash_password,verify_password,create_access_token
import os
import httpx
router = APIRouter(prefix="/users", tags=["Users"])



GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_USERINFO_URL='https://www.googleapis.com/oauth2/v3/userinfo'

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
             "username":db_user.name,
             "email":db_user.email,

        }

@router.post('/auth/google/login')
def googleLogin(user:GoogleLoginRequest,db:Session=Depends(get_db)):
    try:
        resp=httpx.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {user.credentials}"},
                timeout=5.0,
        )
        resp.raise_for_status()

        google_user = resp.json()

        google_id = google_user["sub"]
        email = google_user["email"]
        name = google_user.get("name", "")

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google credentials"
        )
    
    existing_user = db.query(User).filter(
        User.google_id == google_id
    ).first()

    if not existing_user:
        existing_user = db.query(User).filter(
            User.email == email
        ).first()

    if existing_user:
        if not existing_user.google_id:
            existing_user.google_id = google_id
        db.commit()
        db.refresh(existing_user)
    else:
        existing_user = User(
            name=name,
            email=email,
            password=None,
            google_id=google_id
        )
        db.add(existing_user)
        db.commit()
        db.refresh(existing_user)

    data = {"sub": existing_user.email}
    access_token = create_access_token(data)
    
    return {
        "message": "Google login successful",
        "access_token": access_token,
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email
        }
    }

    

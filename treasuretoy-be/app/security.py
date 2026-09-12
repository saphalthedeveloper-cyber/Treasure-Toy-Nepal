from passlib.context import CryptContext
from datetime import datetime,timezone,timedelta
from jose import jwt,JWTError
from fastapi import Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select 
from sqlalchemy.orm import Session
from app.models.users import User
from app.database import get_db
import os
from dotenv import load_dotenv

load_dotenv()


pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(password,hash_password):
    return pwd_context.verify(password,hash_password)

def create_access_token(data:dict):
    to_encode=data.copy()

    expire=datetime.now(timezone.utc)+timedelta(minutes=3000)
    to_encode.update({
        "exp":expire
    })
    token=jwt.encode(to_encode,os.getenv("SECRET_KEY"),algorithm= os.getenv("ALGORITHM"))
    return token

oauth2_schema=OAuth2PasswordBearer(tokenUrl="/users/login")

def get_current_user(token:str=Depends(oauth2_schema),db:Session=Depends(get_db)):
    try:
        payload=jwt.decode(
            token,
            os.getenv("SECRET_KEY"),
            os.getenv("ALGORITHM")
        )
        email = payload.get('sub')

        if not email:
            raise HTTPException(
                status_code=401,
                detail="invalid token"
            )

        user=db.execute(select(User).where(User.email==email)).scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="invalid token"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="invaild token or expired"
        )
        
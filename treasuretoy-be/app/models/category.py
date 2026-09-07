from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    age = Column(String(255), nullable=False, unique=True)
    min_age_months = Column(Integer, nullable=False)
    max_age_months = Column(Integer, nullable=False)
    image = Column(String) 
    products = relationship("Product", back_populates="category")
    
   
    
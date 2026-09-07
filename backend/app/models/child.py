from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, func
from app.database import Base

class Child(Base):
    __tablename__ = "children"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255))
    gender = Column(String(10))
    date_of_birth = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
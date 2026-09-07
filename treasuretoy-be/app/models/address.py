from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from app.database import Base

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    street = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
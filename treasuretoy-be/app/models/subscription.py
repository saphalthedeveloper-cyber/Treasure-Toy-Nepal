from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, func
from app.database import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    child_id = Column(Integer, ForeignKey("children.id"), nullable=False)
    status = Column(String(20), nullable=False)
    start_date = Column(Date)
    next_billing_date = Column(Date)
    next_delivery_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())
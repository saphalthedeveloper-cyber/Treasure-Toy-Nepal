from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, func,Numeric
from sqlalchemy.orm import relationship
from app.database import Base
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    method = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False, default="pending")
    transaction_uuid = Column(String(255), unique=True, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    order = relationship("Order", back_populates="payments")


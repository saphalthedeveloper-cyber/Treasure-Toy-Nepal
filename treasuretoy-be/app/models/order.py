from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, func
from app.database import Base
from sqlalchemy.orm import relationship

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False,index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False,index=True)
    total_amount = Column(Numeric(10, 2), nullable=False)
    delivery_fee = Column(Numeric(10, 2),nullable=False,default=100)
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product",back_populates="order")
    payments = relationship("Payment", back_populates="order",cascade="all, delete-orphan" )
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
   
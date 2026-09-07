from sqlalchemy import Column, Integer, String, Boolean, Numeric, DateTime, ForeignKey, func
from app.database import Base
from sqlalchemy.orm import relationship


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    image = Column(String(255))
    min_age_months = Column(Integer, nullable=False)
    max_age_months = Column(Integer, nullable=False)
    category = relationship(
        "Category",
        back_populates="products"
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    
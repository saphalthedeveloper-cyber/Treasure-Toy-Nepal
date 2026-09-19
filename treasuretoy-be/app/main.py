from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import products, category, users, child, subscription, order, order_item, address,payment
from app.models import Product,User,Category,Address,Child,OrderItem,Order,Subscription,Payment
from app.seed import seed

app = FastAPI(title="Treasure Toy API")


Base.metadata.create_all(bind=engine) 
seed() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(products.router)
app.include_router(category.router)
app.include_router(users.router)
app.include_router(child.router)
app.include_router(subscription.router)
app.include_router(order.router)
app.include_router(order_item.router)
app.include_router(address.router)
app.include_router(payment.router)



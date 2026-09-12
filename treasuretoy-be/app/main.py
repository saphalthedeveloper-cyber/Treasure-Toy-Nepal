from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import products, category, users, child, subscription, order, order_item, address


app = FastAPI(title="Treasure Toy API")

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



from ollama import Client
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.security import get_current_user
from app.database import get_db
from app.schema.ai import ChatResponse, ChatRequest
from app.models.order import Order
from app.models.products import Product 
from sqlalchemy import or_

router = APIRouter(prefix="/chat", tags=["Chat"])

client=Client(
        host="http://ollama:11434",
)
def search_products(db,message):
    message = message.strip().lower()
    return db.query(Product).filter(
         or_(
            Product.name.ilike(f"%{message}%"),
            Product.description.ilike(f"%{message}%"),
        )
        ).limit(5).all()

@router.post("/", response_model=ChatResponse)
def chat_with_ai(chat: ChatRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    products = search_products(db, chat.message)
    products_details=[]
    for product in products:
        product_text=(
            f"Name:{product.name}\n"
            f"Price:{product.price}\n"
            f"Descritpion:{product.description}"
        )
        products_details.append(f"Products Details:{product_text}")
    products_details=".\n".join(products_details)

    orders=(
        db.query(Order).filter(Order.user_id==current_user.id).all()
    )
    
    if orders:
        order_details=[]
        for order in orders:
            order_text=(
                f"Order ID:{order.id}\n"
                f"Order Status:{order.status}\n"
                f"Order Product Name:{order.product.name}\n"
                f"Order Total: NPR{order.total_amount}"
            )
            
            payment_details=[]
            for payment in order.payments:
                payment_details.append(
                    f"Payment Method: {payment.method}\n "
                    f"Payment Status: {payment.status}\n "
                    f"Payment Amount: NPR {payment.amount}"
                )

            if payment_details:
                payment_text = "\n".join(payment_details)
            else:
                payment_text = "No payment record found."

            order_details.append(
            f"{order_text}\nPayment Details:\n{payment_text}"
            )

        order_details = "\n\n".join(order_details)
    else:
        order_details = "This customer has no orders."

        
    response=client.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "system",
                "content": (
                    """
                    You are the TreasureToy Nepal customer support assistant.
                    Answer questions using the product, order, and payment
                    information supplied by the backend.
                    Product information describes toys available for purchase , dont enter order here.
                    Order information describes purchases already made by a customer.
                    Never confuse available products with ordered products.
                    Do not invent prices, availability, order details, or payment
                    information. If information is missing, say so.
                    While showing ptoducts its the best everytime.
                    """
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Customer's order information:\n{order_details}\n\n"
                    f"Products Details:\n{products_details}\n\n"
                    f"Customer's question: {chat.message}"
                ),
            },
        ],
    )
    answer =response.message.content
    return {"reply":answer}

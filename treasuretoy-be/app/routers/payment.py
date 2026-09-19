from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.users import User
from app.database import get_db
from app.models.payment import Payment
from app.schema.payment import PaymentCreate, PaymentResponse,EsewaPaymentResponse
from app.security import get_current_user

import os
import uuid
import hmac
import hashlib
import base64

router = APIRouter(prefix="/payment", tags=["Payment"])



def generate_esewa_signature(total_amount: str,transaction_uuid: str,product_code: str,secret_key: str):
    message = (f"total_amount={total_amount},"f"transaction_uuid={transaction_uuid},"f"product_code={product_code}")
    digest = hmac.new(
        secret_key.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256
    ).digest()
    signature=base64.b64encode(digest).decode("utf-8")

    return signature

@router.post("/", response_model=PaymentResponse)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cod_payment = Payment(
        order_id=payment.order_id,
        amount=payment.amount,
        method=payment.method,
        status="pending",
    )
    db.add(cod_payment)
    db.commit()
    db.refresh(cod_payment)
    return cod_payment

@router.post("/esewa", response_model=EsewaPaymentResponse)
def create_esewa_payment(payment:PaymentCreate ,db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
        transaction_uuid = str(uuid.uuid4())
        product_code = os.getenv("ESEWA_PRODUCT_CODE")
        secret_key = os.getenv("ESEWA_SECRET_KEY")
        payment_url = os.getenv("ESEWA_PAYMENT_URL")

        total_amount = str(payment.amount)

        final_signature = generate_esewa_signature(
            total_amount=total_amount,
            transaction_uuid=transaction_uuid,
            product_code=product_code,
            secret_key=secret_key
        )

        esewa_payment = Payment(
            order_id=payment.order_id,
            amount=payment.amount,
            method="Esewa",
            status="pending",
            transaction_uuid=transaction_uuid
        ) 
        db.add(esewa_payment)
        db.commit()
        db.refresh(esewa_payment)
        return {
            "payment_id": esewa_payment.id,
            "total_amount": total_amount,
            "transaction_uuid": transaction_uuid,
            "product_code": product_code,
            "signature": final_signature,
            "signed_field_names": "total_amount,transaction_uuid,product_code",
            "payment_url": payment_url
        }

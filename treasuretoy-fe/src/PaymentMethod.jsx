import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethod = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const order_id = localStorage.getItem("orderid");

    const handleCOD = async () => {
        try {
            const token = localStorage.getItem("token");
            const totalprice = localStorage.getItem("ordertotalprice");

            const CODresponse = await fetch("http://127.0.0.1:8000/payment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    order_id: Number(order_id),
                    method: "Cash On Delivery",
                    amount: Number(totalprice),
                }),
            });

            if (!CODresponse.ok) {
                throw new Error(
                    `Payment failed with status ${CODresponse.status}`
                );
            }

            const paymentCOD = await CODresponse.json();
            localStorage.setItem("method",paymentCOD.method)
            console.log("Payment COD:", paymentCOD);

            navigate("/payment/success")
        } catch (error) {
            console.error("COD payment error:", error);
        }
    };

    const handleEsewa = async () => {

        try {
            const token = localStorage.getItem("token");
            const totalprice = localStorage.getItem("ordertotalprice");
            const Esewaresponse = await fetch("http://127.0.0.1:8000/payment/esewa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    order_id: Number(order_id),
                    method: "Esewa",
                    amount: Number(totalprice),
                }),
            });
            if (!Esewaresponse.ok) {
                throw new Error(
                    `Payment failed with status ${Esewaresponse.status}`
                );
            }

            const paymentEsewa = await Esewaresponse.json();
            localStorage.setItem("method","Esewa Mobile Wallet")
            console.log("Payment Esewa:", paymentEsewa);
            

            const form = document.createElement("form");
            form.method = "POST";
            form.action = paymentEsewa.payment_url;

            const fields = {
                amount: paymentEsewa.total_amount,
                tax_amount: "0",
                total_amount: paymentEsewa.total_amount,
                transaction_uuid: paymentEsewa.transaction_uuid,
                product_code: paymentEsewa.product_code,
                product_service_charge: "0",
                product_delivery_charge: "0",
                success_url: "http://localhost:5173/payment/success",
                failure_url: "http://localhost:5173/payment/failure",
                signed_field_names: paymentEsewa.signed_field_names,
                signature: paymentEsewa.signature,
            }
            Object.entries(fields).forEach(([name, value]) => {
                 const input = document.createElement("input");
                  input.type = "hidden";
                   input.name = name;
                    input.value = value; form.appendChild(input);
                 }); 
                 document.body.appendChild(form);
                 form.submit();
        }
        catch (error) {
                console.error("COD payment error:", error);

            }

        };

        return (
            <>
                <h1 className="payment-title">Payment Method</h1>

                <div className="payment-container">
                    <h2>Select Payment Method</h2>

                    <div className="payment-methods">
                        <button type="button" onClick={handleCOD}>
                            Cash On Delivery
                        </button>

                        <button type="button" onClick={handleEsewa}>
                            Esewa Mobile Wallet
                        </button>
                    </div>
                </div>
            </>
        );
    };

    export default PaymentMethod;
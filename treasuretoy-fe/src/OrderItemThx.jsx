import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderItemThx = () => {
  const [deliveryDate, setDeliveryDate] = useState("");
const location = useLocation();
  const id = location.state.orderid;
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);

    const formattedDate = date.toLocaleDateString("en-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDeliveryDate(formattedDate);
  }, []);

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Thank You! 🎉</h1>

        <p className="thankyou-message">
          Your order has been successfully placed.
        </p>

        <div className="order-info">
          <div className="info-row">
            <span>Order ID</span>
            <strong>#{id}</strong>
          </div>

          <div className="info-row">
            <span>Payment</span>
            <strong>Cash on Delivery</strong>
          </div>

          <div className="info-row">
            <span>Estimated Delivery</span>
            <strong>{deliveryDate}</strong>
          </div>
        </div>

        <p className="delivery-message">
          🎁 Your order is being prepared for delivery.
        </p>

        <button
          className="home-button"
          onClick={() => window.location.href = "/"}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
};

export default OrderItemThx;
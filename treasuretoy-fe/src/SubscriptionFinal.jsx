import { useEffect, useState } from "react";
const SubscriptionFinal = () => {
 const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const date = new Date();

    // Add 3 days
    date.setDate(date.getDate() + 3);

    // Format date
    const formattedDate = date.toLocaleDateString("en-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setStartDate(formattedDate);
  }, []);

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Thank You! 🎉</h1>

        <p className="thankyou-message">
          Your TreasureToy subscription has been successfully confirmed.
        </p>

        <div className="subscription-info">
          <div className="info-row">
            <span>Subscription</span>
            <strong>Discovery Plan</strong>
          </div>

          <div className="info-row">
            <span>Payment</span>
            <strong>Cash on Delivery</strong>
          </div>

          <div className="info-row">
            <span>Start Date</span>
            <strong>{startDate}</strong>
          </div>
        </div>

        <p className="delivery-message">
          🎁 Your first TreasureToy box will be prepared for you.
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
}
 
export default SubscriptionFinal;
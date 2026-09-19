

const PaymentFailure = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">

        <div className="failed-icon">
          X
        </div>

        <h1>Failed!</h1>

        <p className="thankyou-message">
          Your order has been failed.
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

export default PaymentFailure;
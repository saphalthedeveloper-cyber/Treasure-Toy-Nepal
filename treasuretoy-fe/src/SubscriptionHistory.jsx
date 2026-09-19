import useFetch from './UseFetch';

const SubscriptionHistory = () => {
    const {
        data: subscriptions,
        loading,
        error
    } = useFetch(
        "http://127.0.0.1:8000/subscription/subscriptionhistory/"
    );

    if (loading) {
        return <p>Loading subscriptions...</p>;
    }

    if (error) {
        return <p>Failed to load subscriptions.</p>;
    }

    if (!subscriptions || subscriptions.length === 0) {
        return <p>No subscriptions found.</p>;
    }

    console.log(subscriptions);

    return (
        <div className="subscription-history">
            <h1> My Subscription</h1>

            {subscriptions.map((subscription) => (
                <div
                    className="subscription-card"
                    key={subscription.id}
                >
                    

                    <p>
                        <strong>Subscription ID:</strong>{" "}
                        {subscription.id}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="subscription-status">
                            {subscription.status}
                        </span>
                    </p>

                    <p>
                        <strong>Plan:</strong>{" "}
                        <span className="subscription-plan">
                            {subscription.plan}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SubscriptionHistory;
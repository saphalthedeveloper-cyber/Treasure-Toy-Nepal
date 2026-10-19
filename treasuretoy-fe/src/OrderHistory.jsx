import useFetch from "./UseFetch"

const OrderHistory = () => {
    const { data: orders, loading, error } = useFetch("http://127.0.0.1:8000/order/orderhistory/");
    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>Failed to load orders.</p>;
    }

    if (!orders || orders.length === 0) {
        return <p>No orders found.</p>;
    }
    const handleCancel = async (orderId) => {
        const token = localStorage.getItem("token");
        try {

            const DeleteOrder = await fetch(`http://127.0.0.1:8000/order/orderhistory/${orderId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            if (!DeleteOrder.ok) {
                throw new Error("Failed to cancel order");
            }
            const CancelRes = await DeleteOrder.json();
            console.log(CancelRes);
            window.location.reload();
        }

        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="order-history">
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div className="order-card" key={order.id}>
                    <h2>Order #{order.id}</h2>



                    <h3>Items</h3>

                    {(order.items || []).map((item) => (
                        <div className="order-item" key={item.id}>

                            <img
                                src={`/images/${item.product.image}`}
                                alt={item.product.name}
                            />

                            <div className="item-details">
                                <p className="product-name">
                                    {item.product.name}
                                </p>

                                <p>Product ID: {item.product_id}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: Rs. {item.price}</p>
                                <p>Description: {item.product.description}</p>
                                <p className="order-total">
                                    Total Amount: Rs. {order.total_amount}
                                </p>
                                <button onClick={() => handleCancel(order.id)}className="cancel-button" >cancel</button>
                            </div>

                        </div>
                    ))}
                </div>
            ))}
        </div>

    )
}
export default OrderHistory;
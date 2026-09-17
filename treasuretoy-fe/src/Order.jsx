import { useState ,useEffect} from "react";
import useFetch from "./UseFetch";
import { useParams ,useNavigate} from "react-router-dom";
const Order= () => {
  const navigate=useNavigate();
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const { data:products, loading, error } = useFetch(`http://127.0.0.1:8000/products/${id}`)
 const [submitError, setSubmitError] = useState(null);
 const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
   const price = Number(products.price);
  const delivery = 100;
  const totalPrice = price * quantity + delivery;


  const handleSubmit= async (e)=> {
      e.preventDefault();
      if (!street.trim() || !city.trim()) {
        setSubmitError("Please enter your street and city.");

        setTimeout(() => {
        setSubmitError(null);
      }, 3000);
        return;
    }
     
   try {
      const token = localStorage.getItem("token"); 
      const user = localStorage.getItem("userId");

      const orderRes = await fetch('http://127.0.0.1:8000/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id:user,
          total_amount:totalPrice
        }),
      });

      if (!orderRes.ok) {
        throw new Error(`Order failed with status ${orderRes.status}`);
      }
      const order = await orderRes.json();
      console.log("Order placed:", order);
      const orderItemRes=await fetch('http://127.0.0.1:8000/orderitem/',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id:order.id,
          quantity:quantity,
          price:price,
          product_id:products.id
        }),
      })
      const addressRes=await fetch('http://127.0.0.1:8000/addresses/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`, },
        body: JSON.stringify({
          user_id: user,
          street:street,
          city:city,
        }),
      });

      
      if (!addressRes.ok) throw new Error(`Address save failed with status ${addressRes.status}`);
   const address =await addressRes.json();
   if(address.length===0) throw new Error('No Delivery Address');
      console.log("Order placed:", address);
      if (!orderItemRes.ok) {
        throw new Error(`Order item failed with status ${orderItemRes.status}`);
      }

      const orderItem=await orderItemRes.json();
      console.log("Order placed:", orderItem);
    navigate('/orderitemthx',{state:{orderid:order.id}}); 
    } catch (err) {
      setSubmitError(err.message);
    }
  };
  
  return (
    <>


        <form onSubmit={handleSubmit} className="product-container-order">
       
       
       <img className="product-image-order" src={`/images/${products.image}`} alt={products.name} />
 
  <div className="details">
         <h2>{products.name}</h2>
        <p>{products.description}</p>
         
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 1) setQuantity(val);
          }}
            required
          />
        
        <p>NPR {price.toFixed(2)}</p>
          </div>
              <div className="price-container-4">
  <div className="price-row">
    <h2>Delivery</h2>
    <h3>NPR {delivery.toFixed(2)}</h3>
      
    
  </div>
  <div className="price-row">
    <h3 className="add-title">Delivery Address</h3>
     
          <div className="add">
             <input
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        
      />
          </div>
     
  </div>
  
  <div className="price-row">
    <h2>Price</h2>
    <h3>NPR {price.toFixed(2)}</h3>
  </div>
  <div className="price-row">
    <h2>Total Price</h2>
    <h3>NPR {totalPrice.toFixed(2)}</h3>
  </div>

  <button className="confirm-btn" type="submit" >Confirm</button>
  <p className="submit-error">{submitError}</p>
</div>
    </form>
     
      
    </>
    
  );
}

export default Order;
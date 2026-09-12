import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Subscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, price } = location.state;

  const [childName, setChildName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Create child
      const childRes = await fetch('http://127.0.0.1:8000/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          name: childName,
          gender: gender,
          date_of_birth: dateOfBirth,
        }),
      });
      const child = await childRes.json();

      // 2. Create address
      await fetch('http://127.0.0.1:8000/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`, },
        body: JSON.stringify({
          user_id: userId,
          street:street,
          city:city,
        }),
      });

      // 3. Create subscription
      const subRes = await fetch('http://127.0.0.1:8000/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`,},
        body: JSON.stringify({
          user_id: userId,
          child_id: child.id,
          plan:plan
        }),
      });

      if (subRes.ok) {
        navigate('/subscriptionfinal');
      }
    } catch (err) {
      console.error('Error creating subscription:', err);
    }
  };

 

return (
  <div className="subscription-container">
    <form className="subscription-form" onSubmit={handleSubmit}>

      <h2>
        Subscribing to: {plan} (NPR {price}/month)
      </h2>

      <h3>Child Details</h3>

      <input
        name="childName"
        placeholder="Child's Name"
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
        required
      />

      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />

      <h3>Delivery Address</h3>

      <input
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <h3>Payment</h3>

      <p>Cash on Delivery</p>

      <button type="submit">
        Confirm Subscription
      </button>

    </form>
  </div>
);
};

export default Subscription;
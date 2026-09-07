import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/users", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        throw new Error("Could not create account. Try a different email.");
      }

      const data = await res.json();
      navigate('/users/login'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <img src="images/logo.png" alt="logo" className="login-logo" />
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" onClick={handleSubmit}>
             Sign Up
            </button>
            <p>Already have account <Link to="/users/login">Log In</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
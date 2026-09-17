import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      
      try {
        const googleRes = await fetch('http://127.0.0.1:8000/users/auth/google/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credentials: tokenResponse.access_token }),
        });

        if (!googleRes.ok) throw new Error('Login failed');
        const googleData = await googleRes.json();
    
        localStorage.setItem("token", googleData.access_token);
        localStorage.setItem("userId", googleData.user.id);
        localStorage.setItem("username", googleData.user.name);
        localStorage.setItem("email", googleData.user.email);
        navigate('/');
      }
      catch (err) {
        console.error('Google login error:', err);
      }
    
    },
      onError: () => {
      console.log("Google Login Failed");
    },
  })



const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);


  try {
    const res = await fetch("http://127.0.0.1:8000/users/login/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token)
    localStorage.setItem("userId", data.user_id);
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
    navigate('/');
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
        <img src="/images/logo.png" alt="logo" className="login-logo" />

        <form onSubmit={handleSubmit} className="login-form">


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
          <button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p>New to kidStage? <Link to="/users">Sign Up</Link></p>
        </form>
        <h2>OR</h2>

        <div className="google-login-container">
          <button
            type="button"
            className="custom-google-btn"
            onClick={() => loginWithGoogle()}
          > <img src="/images/google-logo.png" alt="google-logo" className="google-logo"/>
            <span className="google-sign-in">Sign in with Google</span> 
          </button>

        </div>
      </div>
    </div>
  </div>
);

}
export default Login;
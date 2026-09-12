
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
  const [showProfile,setShowProfile]=useState("false")
    const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
     const handleLogout = () => {
    localStorage.removeItem("token");
      localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
    navigate("/users/login");
  };
  
  return (
    <div className="navbar">
      <div className="logo-div">
        <img src="/images/logo.png" alt="KidStage logo" className="logo" />
      </div>

      {token ? (
        <div className="nav-link">
          <Link to="/">Home</Link>
          <Link to="/subscriptionplan">Subscription</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About</Link>
          
           <span onClick={()=>setShowProfile(!showProfile)} className="showprofile-logo">👤</span>
           {
            !showProfile && (
              <>
              <span className="showprofile">
               <span className="showprofile-username">{username}</span>
                  <span className="showprofile-email">{email}</span>
                   <button onClick={handleLogout} className="logout-btn">Logout</button>
              </span>
              
              </>
                 
            )
           }
          
           
         
        </div>
      ) : (
        <div className="nav-link">
          <Link to="/users/login">Log In</Link>
          <Link to="/users">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
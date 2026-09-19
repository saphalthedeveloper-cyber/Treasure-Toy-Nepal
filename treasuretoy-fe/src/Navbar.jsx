
import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect,useRef} from "react";


const Navbar = () => {
  const [showProfile,setShowProfile]=useState(false)
  const profileRef=useRef(null);
  useEffect(()=>{
    function handleClickOutside(event){
      if(
        profileRef.current && !profileRef.current.contains(event.target)){
          setShowProfile(false);
        }
      }
        document.addEventListener("mousedown",handleClickOutside)
      
        return()=>{
             document.removeEventListener("mousedown",handleClickOutside)
        }
      
  },[])

  function handleOrder(e){
        e.preventDefault()
        navigate('/orderhistory')
  }
   function handleSubscription(e){
        e.preventDefault()
        navigate('/subscriptionhistory')
  }


    const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
     const handleLogout = () => {
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
           <span ref={profileRef}>
           <span onClick={()=>setShowProfile(!showProfile)}  className="showprofile-logo">👤</span>
           {
            showProfile && (
              <>
              <span className="showprofile">
               <span className="showprofile-username">{username}</span>
                  <span className="showprofile-email">{email}</span>
                  <button onClick={handleOrder} className="show-profile-order">My Orders</button>
                  <button onClick={handleSubscription} className="show-profile-subscription">My Subscription</button>
                   <button onClick={handleLogout} className="logout-btn">Logout</button>
              </span>
              
              </>
                 
            )
           }
           </span>
          
          
           
         
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

import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
  const token = localStorage.getItem("token");
     const handleLogout = () => {
    localStorage.removeItem("token");
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
          <Link to="/subscription">Subscription</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
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
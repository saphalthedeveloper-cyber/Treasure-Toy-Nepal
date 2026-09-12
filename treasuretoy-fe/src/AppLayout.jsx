import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Navbar from './Navbar'
import Products from './Products'
import SubscriptionPlan from './SubscriptionPlan';
import Category from './Category';
import './App.css'
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup'
import Subscription from './Subscription';
import SubscriptionFinal from './SubscriptionFinal'


const AppLayout = () => {
    const location = useLocation();
    const login = location.pathname === '/users/login';
    const signup = location.pathname === '/users';

    return (<>
        {!login && !signup && <Navbar />}
        <Routes>
            <Route path="/users/login" element={<Login />} />
             <Route path="/users" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/subscriptionplan" element={<SubscriptionPlan />} />
             <Route path="/subscription" element={<Subscription />} />
             <Route path="/subscriptionfinal" element={<SubscriptionFinal />} />
        </Routes>
        {!login && !signup && <Footer />}
    </>
    );
}

export default AppLayout;

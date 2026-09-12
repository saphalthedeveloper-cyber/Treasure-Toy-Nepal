import {useNavigate} from 'react-router-dom'
const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const features1 = [
    'Age-appropriate toys',
    'Educational activities',
    'Personalized recommendations',
    'Parent activity guide',
    'Cancel or pause anytime',
  ];
  const features2 = [
    'All Treasure Plan benefits',
    '2-4 curated toys & activities',
    'Personalized learning focus',
    'Exclusive member offers',
    'Cancel or pause anytime',
  ];
  const features3 = [
    'All Discovery Plan benefits',
    'Premium & specialty items',
    'Advanced learning kits',
    'Dedicated support',
    'Cancel or pause anytime',
  ];

  const handleGetStarted1 = () => {
   navigate('/subscription', { state: { plan: 'TREASURE PLAN', price: 1500 }})
  };
const handleGetStarted2 = () => {
     navigate('/subscription', { state: { plan: 'DISCOVERY PLAN', price: 2000 }})
  };
  const handleGetStarted3 = () => {
    navigate('/subscription', { state: { plan: 'LEGACY PLAN', price: 2500 }})
  };
  return (
    <>
      <img className="sub-banner" src="images/sub-banner.jpeg" alt="sub" />
      <h1 className='sub-title'>Choose Your Plan</h1>
      <h3 className='sub-des'>Flexible plans to match your child's needs and your family's journey.</h3>
      <div className="pricing-card">
        <div className="pricing-card-1">

          <div className="card-header">
            <h3 className="plan-title">TREASURE PLAN</h3>
          </div>


          <div className="price-container">
            <span className="currency">NPR</span>
            <span className="price-amount">1500</span>
            <span className="price-period">/ month</span>
          </div>


          <ul className="features-list">
            {features1.map((feature, index) => (
              <li key={index} className="feature-item">

                <span>{feature}</span>
              </li>
            ))}
          </ul>


          <button className="cta-button" onClick={handleGetStarted1}>
            Get Started
          </button>

        </div>
        <div className="pricing-card-2">
          <span className="popular-badge">MOST POPULAR</span>
          <div className="card-header-2">
            <h3 className="plan-title">DISCOVERY PLAN</h3>
          </div>


          <div className="price-container-2">
            <span className="currency-2">NPR</span>
            <span className="price-amount-2">2000</span>
            <span className="price-period-2">/ month</span>
          </div>


          <ul className="features-list-2">
            {features2.map((feature, index) => (
              <li key={index} className="feature-item-2">

                <span>{feature}</span>
              </li>
            ))}
          </ul>


          <button className="cta-button-2" onClick={handleGetStarted2}>
            Get Started
          </button>

        </div>
        <div className="pricing-card-1">

          <div className="card-header">
            <h3 className="plan-title">LEGACY PLAN</h3>
          </div>


          <div className="price-container">
            <span className="currency">NPR</span>
            <span className="price-amount">2500</span>
            <span className="price-period">/ month</span>
          </div>


          <ul className="features-list">
            {features3.map((feature, index) => (
              <li key={index} className="feature-item">

                <span>{feature}</span>
              </li>
            ))}
          </ul>


          <button className="cta-button" onClick={handleGetStarted3}>
            Get Started
          </button>

        </div>
      </div>

    </>
  );
};

export default SubscriptionPlan;
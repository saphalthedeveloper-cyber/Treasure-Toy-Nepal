import { useNavigate } from "react-router-dom";

const About = () => {
     const navigate = useNavigate();
    const handleSubmit= (e)=>{
        e.preventDefault();
        navigate("/subscription")
    }
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-content">
          <h2>About Treasure Toys</h2>
          <p>
            Not every family can afford to buy new toys every time their
            child outgrows the old ones. Treasure Toys was born to solve
            exactly that — we believe every child deserves to play with
            toys that match their age and stage, without the burden of
            buying them all.
          </p>
          <p>
            Instead of selling toys, we send them. Through our subscription,
            we deliver age-appropriate toys to your doorstep. Your child
            plays, learns, and grows with them — and when they've outgrown
            a toy, it goes back to us to be loved by another child. If your
            child truly falls for a toy, you always have the option to buy
            it. But our real goal isn't selling — it's making sure no child
            is left without toys to play with.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Kids Served</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>Toys in Circulation</p>
          </div>
          <div className="stat">
            <h3>0-8</h3>
            <p>Age Range Covered</p>
          </div>
        </div>

        <div className="about-mission">
          <div className="mission-card">
            <span className="mission-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>
              To make quality, age-appropriate toys accessible to every
              middle-class family — not through buying, but through sharing.
            </p>
          </div>
          <div className="mission-card">
            <span className="mission-icon">🌈</span>
            <h3>Our Vision</h3>
            <p>
              A world where a child's play is never limited by a family's
              budget, and every toy gets a second, third, and fourth child
              to love it.
            </p>
          </div>
        </div>

        <div className="about-how">
          <h2 className="features-title">How It Works</h2>
          <div className="features-grid">

            <div className="feature-card">
              <span className="feature-icon">📝</span>
              <h4>1. Subscribe</h4>
              <p>Sign up and tell us your child's age and interests.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">📦</span>
              <h4>2. Receive Toys</h4>
              <p>We send age-appropriate toys straight to your door.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🔄</span>
              <h4>3. Play &amp; Return</h4>
              <p>Once outgrown, send the toy back so another child can enjoy it.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">💛</span>
              <h4>4. Love It? Keep It</h4>
              <p>If your child falls in love with a toy, you can choose to buy it.</p>
            </div>

          </div>
        </div>

        <div className="about-cta">
          <h3>Give your kid endless toys, not endless costs</h3>
          <p>Subscribe today and let the toys come to you — age after age, until they turn 8.</p>
          <button className="about-btn" onClick={handleSubmit}>Start Subscription</button>
        </div>

      </div>
    </section>
  )
}

export default About
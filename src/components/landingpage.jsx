import "./landingpage.css";

const LandingPage = ({ onGetStarted }) => {
  return (
    <section className="aboutus_section">
      <div className="aboutus_container">

        {/* Hero title (large & aesthetic) */}
        <header className="hero_block">
          <h1 className="hero_title">
            Conference Expense
            <br />
            <span className="hero_accent">Planner</span>
          </h1>
          <p className="hero_sub">Plan your next major event with us!</p>
        </header>

        <div className="about_text">
          <p>
            Welcome to BudgetEase Solutions, your trusted partner in simplifying
            budget management and financial solutions. At BudgetEase, we
            understand the importance of effective budget planning and strive
            to provide intuitive, user-friendly solutions to meet the diverse
            needs of our clients.
          </p>
          <p>
            With a commitment to efficiency and innovation, we empower
            individuals and businesses to take control of their finances and
            achieve their goals with ease.
          </p>
          <p>
            At BudgetEase Solutions, our mission is to make budgeting effortless
            and accessible for everyone. Whether you're a small business owner,
            a busy professional, or an individual looking to manage your
            personal finances, we offer tailored solutions to streamline your
            budgeting process.
          </p>
        </div>

        {/* local CTA — falls back to no-op if prop not provided */}
        <div className="landing_cta">

          <button className="landing_get_started fx-neon" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
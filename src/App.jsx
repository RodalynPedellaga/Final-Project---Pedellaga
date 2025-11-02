import { useState, useEffect, useRef } from "react";
import "./App.css";
import Conference from "./components/RoomSelection";
import AboutUs from "./components/landingpage";

function App() {
  const [showVenue, setShowVenue] = useState(false);
  const eventRef = useRef(null);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  // Lock page scroll until user clicks Get Started
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showVenue ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = prev || "auto";
    };
  }, [showVenue]);

  // When the conference section becomes visible, scroll to it smoothly
  useEffect(() => {
    if (showVenue && eventRef.current) {
      // small timeout to allow CSS transition to finish
      setTimeout(() => {
        eventRef.current.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [showVenue]);

  return (
    <>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1>
            <p className="budget_sentence">Plan your next major event with us!</p>
          </div>
          <div className="aboutus_main">
            <AboutUs onGetStarted={handleGetStarted} />
          </div>
        </div>
      </header>

      <div
        ref={eventRef}
        className={`event-list-container ${showVenue ? "visible" : ""}`}>
        <Conference />
      </div>
    </>
  );
}

export default App;
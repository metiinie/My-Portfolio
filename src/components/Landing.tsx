import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const BUILD_ITEMS = config.developer.whatIBuild;

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const [itemIndex, setItemIndex] = useState(0);
  const [animClass, setAnimClass] = useState<"slide-in" | "slide-out">("slide-in");

  useEffect(() => {
    const displayDuration = 2800; // Duration each item is shown
    const transitionDuration = 450; // Exit slide duration

    const interval = setInterval(() => {
      setAnimClass("slide-out");

      setTimeout(() => {
        setItemIndex((prev) => (prev + 1) % BUILD_ITEMS.length);
        setAnimClass("slide-in");
      }, transitionDuration);
    }, displayDuration + transitionDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <div className="landing-tagline-prefix">
              <span className="landing-tagline-dot"></span>
              <h3>I build Practical</h3>
            </div>
            <div className="landing-career-wrapper">
              <h2 className="landing-career-h2">
                <span className={`landing-career-text ${animClass}`}>
                  {BUILD_ITEMS[itemIndex]}
                </span>
              </h2>
            </div>
            <div className="landing-actions">
              <a href="#work" className="landing-btn landing-btn-primary" data-cursor="disable">
                View My Work →
              </a>
              <a href="#contact" className="landing-btn landing-btn-secondary" data-cursor="disable">
                Connect
              </a>
            </div>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src="/images/mypicnbg.png"
              alt={config.developer.fullName}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

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
            <h3>I build practical</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software Engineer</div>
              <div className="landing-h2-2">Applied AI Systems</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Full-Stack &amp; Python</div>
              <div className="landing-h2-info-1">Web &amp; Mobile Apps</div>
            </h2>
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

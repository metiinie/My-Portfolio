import "./styles/Career.css";
import { config } from "../config";
import { FaGraduationCap, FaAward, FaCertificate, FaCheckCircle } from "react-icons/fa";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  const match = period.match(/\b(20\d{2})\b/);
  return match ? match[1] : period;
};

const Career = () => {
  const { education, certifications, experiences } = config;

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&amp;</span>
          <br /> experience
        </h2>

        {/* Experience Timeline */}
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                  <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.55)", display: "block", marginTop: "2px" }}>
                    {exp.period} &bull; {exp.location}
                  </span>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Credentials: Education & Certifications */}
        <div className="career-credentials">
          {/* Education Block */}
          {education && (
            <div className="education-section">
              <div className="credentials-subhead">
                <FaGraduationCap className="credentials-subhead-icon" />
                <h3>Education &amp; Academic Foundation</h3>
              </div>

              <div className="education-card">
                <div className="edu-header">
                  <div>
                    <h4 className="edu-title">{education.degree}</h4>
                    <span className="edu-institution">{education.institution} &bull; {education.location}</span>
                  </div>
                  <span className="edu-period">{education.period}</span>
                </div>

                <ul className="edu-highlights">
                  {education.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>
                      <FaCheckCircle className="edu-bullet-icon" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Certifications Block */}
          {certifications && certifications.length > 0 && (
            <div className="certifications-section">
              <div className="credentials-subhead">
                <FaAward className="credentials-subhead-icon" />
                <h3>Certifications &amp; Formal Recognitions</h3>
              </div>

              <div className="certs-grid">
                {certifications.map((cert, cIdx) => (
                  <div key={cIdx} className="cert-item-card">
                    <div>
                      <div className="cert-item-header">
                        <div className="cert-icon-badge">
                          <FaCertificate />
                        </div>
                        <span className="cert-period-badge">{cert.period}</span>
                      </div>
                      <h4>{cert.title}</h4>
                      <div className="cert-item-org">{cert.organization}</div>
                    </div>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;

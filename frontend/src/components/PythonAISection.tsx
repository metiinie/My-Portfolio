import { config } from "../config";
import "./styles/PythonAISection.css";
import { FaPython } from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs";
import { LuWorkflow, LuBinary, LuLayers, LuSparkles } from "react-icons/lu";

const PythonAISection = () => {
  const { pythonAndAi } = config;

  return (
    <section className="python-ai-section section-container" id="python-ai">
      <div className="python-ai-container">
        <div className="python-ai-header">
          <div className="python-ai-badge">
            <FaPython className="badge-icon python-color" />
            <span>SPECIALIZATION FOCUS</span>
            <BsCpuFill className="badge-icon ai-color" />
          </div>
          <h2>
            Python Engineering <span>&amp;</span> Applied AI
          </h2>
          <p className="python-ai-subtitle">
            {pythonAndAi.subtitle}
          </p>
        </div>

        <div className="python-ai-content">
          <div className="python-ai-story-card">
            <h3>Bridging Practical Systems &amp; Intelligent Workflows</h3>
            <p className="python-ai-narrative">
              {pythonAndAi.description}
            </p>
            <div className="python-ai-principle">
              <LuSparkles className="principle-icon" />
              <blockquote>
                &ldquo;{pythonAndAi.approach}&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="python-ai-grid">
            <div className="python-ai-card">
              <div className="card-header">
                <div className="card-icon-wrap python-bg">
                  <FaPython />
                </div>
                <div>
                  <h4>Python &amp; Backend Engineering</h4>
                  <span>Architecture, Django &amp; Scalable APIs</span>
                </div>
              </div>
              <ul className="focus-list">
                <li>
                  <LuBinary className="list-icon" />
                  <span>Object-oriented design &amp; modular backend architecture</span>
                </li>
                <li>
                  <LuLayers className="list-icon" />
                  <span>Django 5, Django REST Framework, and Flask development</span>
                </li>
                <li>
                  <LuWorkflow className="list-icon" />
                  <span>Relational data modeling with PostgreSQL &amp; MySQL</span>
                </li>
                <li>
                  <LuBinary className="list-icon" />
                  <span>Automated workflows, Docker containerization &amp; CI/CD</span>
                </li>
              </ul>
              <div className="card-tags">
                <span>Python</span>
                <span>Django</span>
                <span>Flask</span>
                <span>PostgreSQL</span>
                <span>REST APIs</span>
                <span>Docker</span>
              </div>
            </div>

            <div className="python-ai-card">
              <div className="card-header">
                <div className="card-icon-wrap ai-bg">
                  <BsCpuFill />
                </div>
                <div>
                  <h4>Computer Vision &amp; AI-Assisted Dev</h4>
                  <span>OpenCV Biometrics &amp; Agentic Tools</span>
                </div>
              </div>
              <ul className="focus-list">
                <li>
                  <LuSparkles className="list-icon" />
                  <span>Biometric face recognition &amp; attendance management with OpenCV</span>
                </li>
                <li>
                  <LuWorkflow className="list-icon" />
                  <span>Facial landmark detection, embeddings &amp; anti-fraud logging</span>
                </li>
                <li>
                  <LuBinary className="list-icon" />
                  <span>AI-assisted development acceleration with Claude AI, Antigravity &amp; Codex</span>
                </li>
                <li>
                  <LuLayers className="list-icon" />
                  <span>Administrative dashboards for employee monitoring &amp; verification</span>
                </li>
              </ul>
              <div className="card-tags">
                <span>OpenCV</span>
                <span>Biometrics</span>
                <span>Antigravity</span>
                <span>Claude AI</span>
                <span>Codex</span>
                <span>Computer Vision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PythonAISection;

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
                  <span>Language Craft &amp; Architecture</span>
                </div>
              </div>
              <ul className="focus-list">
                <li>
                  <LuBinary className="list-icon" />
                  <span>Python language design &amp; object-oriented programming</span>
                </li>
                <li>
                  <LuLayers className="list-icon" />
                  <span>Dataclasses, methods, composition, iterators, and generators</span>
                </li>
                <li>
                  <LuWorkflow className="list-icon" />
                  <span>Python/Django &amp; FastAPI backend development</span>
                </li>
                <li>
                  <LuBinary className="list-icon" />
                  <span>Data handling, relational modeling, and business automation</span>
                </li>
              </ul>
              <div className="card-tags">
                <span>Python</span>
                <span>Django</span>
                <span>FastAPI</span>
                <span>PostgreSQL</span>
                <span>OOP Patterns</span>
              </div>
            </div>

            <div className="python-ai-card">
              <div className="card-header">
                <div className="card-icon-wrap ai-bg">
                  <BsCpuFill />
                </div>
                <div>
                  <h4>Applied AI &amp; Intelligent Automation</h4>
                  <span>Pragmatic, Testable Integration</span>
                </div>
              </div>
              <ul className="focus-list">
                <li>
                  <LuSparkles className="list-icon" />
                  <span>Machine learning foundations &amp; model evaluation</span>
                </li>
                <li>
                  <LuWorkflow className="list-icon" />
                  <span>Structured document intelligence &amp; OCR validation pipelines</span>
                </li>
                <li>
                  <LuBinary className="list-icon" />
                  <span>Deterministic schema validation (Pydantic) with uncertainty scoring</span>
                </li>
                <li>
                  <LuLayers className="list-icon" />
                  <span>Applied AI integration into operational business products</span>
                </li>
              </ul>
              <div className="card-tags">
                <span>Applied AI</span>
                <span>Document OCR</span>
                <span>Schema Validation</span>
                <span>Model Evaluation</span>
                <span>FastAPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PythonAISection;

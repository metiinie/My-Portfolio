import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";
import { MdArrowOutward } from "react-icons/md";

type FilterType = "all" | "featured" | "case-study" | "exploration";

const MyWorks = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects = config.projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.type === activeFilter;
  });

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          Engineered <span>Works</span>
        </h1>
        <p className="myworks-subtitle">
          Practical systems, mobile apps, operational case studies, and applied AI explorations by Awol Ibrahim Ayalew.
        </p>

        {/* Filter Navigation */}
        <div className="myworks-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
            data-cursor="disable"
          >
            All Works ({config.projects.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === "featured" ? "active" : ""}`}
            onClick={() => setActiveFilter("featured")}
            data-cursor="disable"
          >
            Featured Apps (3)
          </button>
          <button
            className={`filter-btn ${activeFilter === "case-study" ? "active" : ""}`}
            onClick={() => setActiveFilter("case-study")}
            data-cursor="disable"
          >
            Case Studies (2)
          </button>
          <button
            className={`filter-btn ${activeFilter === "exploration" ? "active" : ""}`}
            onClick={() => setActiveFilter("exploration")}
            data-cursor="disable"
          >
            Explorations &amp; AI (3)
          </button>
        </div>
      </div>

      <div className="myworks-grid">
        {filteredProjects.map((project, index) => {
          return (
            <div className="myworks-card" key={project.id}>
              <div className="myworks-card-top-bar">
                <span className="myworks-card-number">0{index + 1}</span>
                {project.statusBadge && (
                  <span className={`myworks-badge badge-${project.type}`}>
                    {project.statusBadge}
                  </span>
                )}
              </div>

              <div className="myworks-card-image">
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
              </div>

              <div className="myworks-card-info">
                <h3>{project.title}</h3>
                <p className="myworks-card-category">{project.category}</p>
                <p className="myworks-card-description">{project.description}</p>

                {project.problem && (
                  <div className="myworks-case-snippet">
                    <strong>The Problem:</strong> {project.problem}
                  </div>
                )}

                <div className="myworks-card-footer">
                  <div className="myworks-card-tech">
                    <strong>Tech Stack:</strong> {project.technologies}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="myworks-card-link"
                      data-cursor="disable"
                    >
                      <span>Repository / Details</span>
                      <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;

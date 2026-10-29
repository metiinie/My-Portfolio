import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";
import { MdArrowOutward } from "react-icons/md";

type FilterType = "all" | "featured" | "case-study" | "exploration";

interface CardImageProps {
  image: string;
  images?: string[];
  title: string;
}

const MyWorksCardImage = ({ image, images, title }: CardImageProps) => {
  const slides = images && images.length > 0 ? images : [image];
  const hasMultiple = slides.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!hasMultiple || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [hasMultiple, isHovered, slides.length]);

  if (!hasMultiple) {
    return (
      <div className="myworks-card-image">
        <img src={image} alt={title} loading="lazy" decoding="async" />
      </div>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="myworks-card-image myworks-has-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="work-carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((src, idx) => (
          <div
            className={`work-carousel-slide ${
              idx === currentIndex ? "active" : ""
            }`}
            key={idx}
          >
            <img
              src={src}
              alt={`${title} - screenshot ${idx + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="work-carousel-arrow work-carousel-prev"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }}
        aria-label="Previous screenshot"
        data-cursor="disable"
      >
        ‹
      </button>
      <button
        type="button"
        className="work-carousel-arrow work-carousel-next"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentIndex((prev) => (prev + 1) % slides.length);
        }}
        aria-label="Next screenshot"
        data-cursor="disable"
      >
        ›
      </button>

      <div className="work-carousel-dots">
        {slides.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`work-carousel-dot ${
              idx === currentIndex ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`View screenshot ${idx + 1}`}
            data-cursor="disable"
          />
        ))}
      </div>

      <div className="work-carousel-badge">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
};

const MyWorks = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflowY = "auto";
  }, []);

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
          Government platforms, cross-platform mobile apps, operational case studies, and applied AI systems by Awol Ibrahim Ayalew.
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
            Featured Systems ({config.projects.filter((p) => p.type === "featured").length})
          </button>
          <button
            className={`filter-btn ${activeFilter === "case-study" ? "active" : ""}`}
            onClick={() => setActiveFilter("case-study")}
            data-cursor="disable"
          >
            Case Studies ({config.projects.filter((p) => p.type === "case-study").length})
          </button>
          <button
            className={`filter-btn ${activeFilter === "exploration" ? "active" : ""}`}
            onClick={() => setActiveFilter("exploration")}
            data-cursor="disable"
          >
            Explorations &amp; Vision ({config.projects.filter((p) => p.type === "exploration").length})
          </button>
        </div>
      </div>

      <div className="myworks-grid">
        {filteredProjects.map((project, index) => {
          return (
            <div className="myworks-card" key={project.id}>
              <div className="myworks-card-top-bar">
                <span className="myworks-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.statusBadge && (
                  <span className={`myworks-badge badge-${project.type}`}>
                    {project.statusBadge}
                  </span>
                )}
              </div>

              <MyWorksCardImage
                image={project.image}
                images={(project as { images?: string[] }).images}
                title={project.title}
              />

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
                  <div className="myworks-card-links-group">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="myworks-card-link"
                        data-cursor="disable"
                        title="GitHub Repository"
                      >
                        <span>GitHub Repo</span>
                        <MdArrowOutward />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="myworks-card-link myworks-live-link"
                        data-cursor="disable"
                        title="Live Demo / Website"
                      >
                        <span>Live Site</span>
                        <MdArrowOutward />
                      </a>
                    )}
                    {!project.github && !project.liveUrl && project.link && (
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;

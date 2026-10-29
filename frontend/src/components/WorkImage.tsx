import { useState, useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  images?: string[];
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides =
    props.images && props.images.length > 0 ? props.images : [props.image];
  const hasMultiple = slides.length > 1;
  const isExternalLink = Boolean(props.link && !props.link.startsWith("/"));

  useEffect(() => {
    if (!hasMultiple || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [hasMultiple, isHovered, slides.length]);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideo(false);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
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

  const renderMediaContent = () => {
    if (!hasMultiple) {
      return (
        <>
          <img
            src={props.image}
            alt={props.alt}
            loading="lazy"
            decoding="async"
          />
          {isVideo && (
            <video src={video} autoPlay muted playsInline loop></video>
          )}
        </>
      );
    }

    return (
      <div
        className="work-carousel-viewport"
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
                alt={`${props.alt || "Project"} - screenshot ${idx + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="work-carousel-arrow work-carousel-prev"
          onClick={goPrev}
          aria-label="Previous screenshot"
          data-cursor="disable"
        >
          ‹
        </button>
        <button
          type="button"
          className="work-carousel-arrow work-carousel-next"
          onClick={goNext}
          aria-label="Next screenshot"
          data-cursor="disable"
        >
          ›
        </button>

        <div
          className="work-carousel-dots"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {slides.map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={`work-carousel-dot ${
                idx === currentIndex ? "active" : ""
              }`}
              onClick={(e) => goToSlide(e, idx)}
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

  return (
    <div className="work-image">
      {props.link ? (
        isExternalLink ? (
          <a
            className={`work-image-in ${hasMultiple ? "has-carousel" : ""}`}
            href={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            {renderMediaContent()}
          </a>
        ) : (
          <Link
            className={`work-image-in ${hasMultiple ? "has-carousel" : ""}`}
            to={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            {renderMediaContent()}
          </Link>
        )
      ) : (
        <div
          className={`work-image-in ${hasMultiple ? "has-carousel" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor={"disable"}
        >
          {renderMediaContent()}
        </div>
      )}
    </div>
  );
};

export default WorkImage;

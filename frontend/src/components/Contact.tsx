import { useState, FormEvent } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import {
  LuMail,
  LuPhoneCall,
  LuMapPin,
  LuCopy,
  LuCheck,
  LuSend,
  LuSparkles,
  LuArrowUp,
  LuFileText,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import "./styles/Contact.css";
import { config } from "../config";
import { lenis } from "./Navbar";

const INQUIRY_TOPICS = [
  "Full-Stack Web",
  "Mobile App",
  "Scalable ERP",
  "Gov / Business System",
  "Applied AI & CV",
  "Hiring / Role",
];

const Contact = () => {
  const [copiedField, setCopiedField] = useState<"email" | "phone" | "message" | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  const handleCopy = async (text: string, field: "email" | "phone" | "message") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    }
  };

  const composeInquiryBody = () => {
    const lines = [
      `Hi ${config.developer.name},`,
      "",
      message.trim() || `I'd love to discuss a ${selectedTopic} opportunity with you.`,
      "",
      "---",
      `Topic: ${selectedTopic}`,
      senderName.trim() ? `Name: ${senderName.trim()}` : "",
      senderEmail.trim() ? `Email: ${senderEmail.trim()}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio Inquiry · ${selectedTopic}]${senderName.trim() ? ` — ${senderName.trim()}` : ""}`
    );
    const body = encodeURIComponent(composeInquiryBody());
    window.location.href = `mailto:${config.contact.email}?subject=${subject}&body=${body}`;
    setFormStatus("sent");
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  const handleCopyInquiry = () => {
    const formatted = `To: ${config.contact.email}\nSubject: [Portfolio Inquiry · ${selectedTopic}]${
      senderName.trim() ? ` — ${senderName.trim()}` : ""
    }\n\n${composeInquiryBody()}`;
    handleCopy(formatted, "message");
  };

  const scrollToTop = () => {
    if (lenis && window.innerWidth > 768) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector) as HTMLElement | null;
    if (!target) return;
    if (window.innerWidth > 768 && lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      handle: "@metiinie",
      url: config.contact.github,
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      handle: "/in/awolbuilds",
      url: config.contact.linkedin,
      icon: <FaLinkedinIn />,
    },
    {
      name: "X (Twitter)",
      handle: "@awolbuilds",
      url: config.contact.twitter,
      icon: <FaXTwitter />,
    },
    {
      name: "Instagram",
      handle: "@awolbuilds",
      url: config.contact.instagram,
      icon: <FaInstagram />,
    },
    {
      name: "Facebook",
      handle: "/awolbuilds",
      url: config.contact.facebook,
      icon: <FaFacebookF />,
    },
  ];

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-glow contact-glow-left" aria-hidden="true" />
      <div className="contact-glow contact-glow-right" aria-hidden="true" />

      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <div className="contact-status-badge contact-header-anim">
            <span className="status-pulse-dot" />
            <span>AVAILABLE FOR NEW PROJECTS &amp; ROLES</span>
            <LuSparkles className="status-sparkle" />
          </div>

          <h2 className="contact-heading contact-header-anim">
            Let&apos;s Connect <span>&amp;</span> Build Together
          </h2>

          <p className="contact-subtitle contact-header-anim">
            Have a full-stack web platform, cross-platform mobile app, scalable ERP, or applied AI
            system in mind? Reach out directly or send a project brief below.
          </p>
        </div>

        {/* Main 2-Column Bento Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Channels & Social Ecosystem */}
          <div className="contact-info-col">
            {/* Direct Contact Cards */}
            <div className="contact-direct-cards">
              {/* Email Card */}
              <div className="contact-method-card contact-anim-card">
                <div className="method-card-main">
                  <div className="method-icon-wrap email-accent">
                    <LuMail />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Direct Email</span>
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="method-value"
                      data-cursor="disable"
                    >
                      {config.contact.email}
                    </a>
                  </div>
                </div>
                <div className="method-actions">
                  <button
                    type="button"
                    className={`method-action-btn ${copiedField === "email" ? "copied" : ""}`}
                    onClick={() => handleCopy(config.contact.email, "email")}
                    title="Copy email address"
                    data-cursor="disable"
                  >
                    {copiedField === "email" ? (
                      <>
                        <LuCheck />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <LuCopy />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="method-icon-link"
                    title="Open in email client"
                    data-cursor="disable"
                  >
                    <MdArrowOutward />
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="contact-method-card contact-anim-card">
                <div className="method-card-main">
                  <div className="method-icon-wrap phone-accent">
                    <LuPhoneCall />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Phone &amp; Direct Call</span>
                    <a
                      href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}
                      className="method-value"
                      data-cursor="disable"
                    >
                      {config.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="method-actions">
                  <button
                    type="button"
                    className={`method-action-btn ${copiedField === "phone" ? "copied" : ""}`}
                    onClick={() => handleCopy(config.contact.phone, "phone")}
                    title="Copy phone number"
                    data-cursor="disable"
                  >
                    {copiedField === "phone" ? (
                      <>
                        <LuCheck />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <LuCopy />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}
                    className="method-icon-link"
                    title="Call directly"
                    data-cursor="disable"
                  >
                    <MdArrowOutward />
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-method-card contact-anim-card">
                <div className="method-card-main">
                  <div className="method-icon-wrap location-accent">
                    <LuMapPin />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Location &amp; Timezone</span>
                    <span className="method-value static-val">{config.social.location}</span>
                  </div>
                </div>
                <div className="method-actions">
                  <span className="location-badge">UTC+3 · Remote Ready</span>
                </div>
              </div>
            </div>

            {/* Social Profiles Card */}
            <div className="contact-socials-card contact-anim-card">
              <div className="socials-card-header">
                <div>
                  <h4>Social Profiles &amp; Code</h4>
                  <p>Connect across networks or explore my repositories</p>
                </div>
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-resume-pill"
                  data-cursor="disable"
                >
                  <LuFileText />
                  <span>Resume</span>
                  <MdArrowOutward />
                </a>
              </div>

              <div className="socials-grid">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-card"
                    data-cursor="disable"
                  >
                    <span className="social-pill-icon">{item.icon}</span>
                    <span className="social-pill-text">
                      <strong>{item.name}</strong>
                      <small>{item.handle}</small>
                    </span>
                    <MdArrowOutward className="social-pill-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="contact-form-col">
            <form
              className="contact-form-card contact-anim-card"
              onSubmit={handleSendEmail}
            >
              <div className="form-card-top">
                <div>
                  <h3>Start a Conversation</h3>
                  <p>Select a focus area and compose a quick message</p>
                </div>
                <span className="response-time-tag">⚡ Replies within 24h</span>
              </div>

              {/* Topic Selector Pills */}
              <div className="form-group">
                <label className="form-label">What are we building?</label>
                <div className="topic-chips-wrap">
                  {INQUIRY_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`topic-chip ${selectedTopic === topic ? "active" : ""}`}
                      onClick={() => setSelectedTopic(topic)}
                      data-cursor="disable"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Morgan"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. alex@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Project Brief or Message
                </label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  rows={4}
                  placeholder={`Hi ${config.developer.name}, I'd love to discuss a ${selectedTopic} project...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Submit & Copy Actions */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="form-submit-btn"
                  data-cursor="disable"
                >
                  <LuSend />
                  <span>
                    {formStatus === "sent" ? "Opening Mail Client..." : "Send via Email"}
                  </span>
                </button>

                <button
                  type="button"
                  className={`form-copy-btn ${copiedField === "message" ? "copied" : ""}`}
                  onClick={handleCopyInquiry}
                  title="Copy formatted message to clipboard"
                  data-cursor="disable"
                >
                  {copiedField === "message" ? (
                    <>
                      <LuCheck />
                      <span>Copied Brief!</span>
                    </>
                  ) : (
                    <>
                      <LuCopy />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="contact-footer-bar contact-anim-card">
          <div className="footer-brand">
            <span className="footer-monogram">{config.developer.initials}</span>
            <div className="footer-brand-text">
              <strong>
                Designed &amp; Developed by <span>{config.developer.fullName}</span>
              </strong>
              <small>{config.developer.title}</small>
            </div>
          </div>

          <div className="footer-quick-links">
            <a href="#about" onClick={(e) => scrollToSection(e, "#about")} data-cursor="disable">
              About
            </a>
            <a href="#work" onClick={(e) => scrollToSection(e, "#work")} data-cursor="disable">
              Work
            </a>
            <a href="#career" onClick={(e) => scrollToSection(e, "#career")} data-cursor="disable">
              Career
            </a>
            <Link to="/myworks" data-cursor="disable">All Works</Link>
            <Link to="/play" data-cursor="disable">Play Chess</Link>
          </div>

          <div className="footer-right">
            <span className="footer-copyright">
              <MdCopyright /> {new Date().getFullYear()} {config.developer.name}
            </span>
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Back to top"
              data-cursor="disable"
            >
              <LuArrowUp />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

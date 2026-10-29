import { useState, FormEvent } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqezqygk";

const INQUIRY_TOPICS = [
  "Full-Stack Web",
  "Mobile App",
  "Scalable ERP",
  "Gov / Business System",
  "Applied AI & CV",
  "Hiring / Role",
];

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = config.contact.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (formStatus === "sending") return;

    setFormStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: senderName.trim() || "Portfolio Visitor",
          email: senderEmail.trim(),
          _replyto: senderEmail.trim(),
          topic: selectedTopic,
          _subject: `[Portfolio Inquiry · ${selectedTopic}]${senderName.trim() ? ` — ${senderName.trim()}` : ""}`,
          message:
            message.trim() ||
            `I'd love to discuss a ${selectedTopic} opportunity with you.`,
        }),
      });

      if (response.ok) {
        setFormStatus("sent");
        setSenderName("");
        setSenderEmail("");
        setMessage("");
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        const data = await response.json().catch(() => null);
        const errText =
          data?.errors?.map((err: { message?: string }) => err.message).filter(Boolean).join(", ") ||
          "Could not send message. Please try again or email directly.";
        setErrorMessage(errText);
        setFormStatus("error");
      }
    } catch {
      setErrorMessage("Network error while sending. Please try again or email directly.");
      setFormStatus("error");
    }
  };

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* Section Title */}
        <div className="contact-top-header">
          <h2 className="contact-main-title">
            Let Me <span>Hear You</span>
          </h2>
        </div>

        {/* Two-Column Minimal Layout */}
        <div className="contact-minimal-grid">
          {/* Left Column: Info Table Rows */}
          <div className="contact-left-list">
            <div className="contact-list-row">
              <span className="contact-row-label">EMAIL</span>
              <div className="contact-row-val-group">
                <a
                  href={`mailto:${config.contact.email}`}
                  className="contact-row-value"
                  data-cursor="disable"
                >
                  {config.contact.email}
                </a>
                <button
                  type="button"
                  className={`contact-copy-btn ${copiedEmail ? "copied" : ""}`}
                  onClick={handleCopyEmail}
                  data-cursor="disable"
                >
                  {copiedEmail ? "COPIED" : "COPY"}
                </button>
              </div>
            </div>

            <div className="contact-list-row">
              <span className="contact-row-label">PHONE</span>
              <div className="contact-row-val-group">
                <a
                  href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}
                  className="contact-row-value"
                  data-cursor="disable"
                >
                  {config.contact.phone}
                </a>
              </div>
            </div>

            <div className="contact-list-row">
              <span className="contact-row-label">LINKEDIN</span>
              <div className="contact-row-val-group">
                <a
                  href={config.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row-value contact-ext-link"
                  data-cursor="disable"
                >
                  in/awolbuilds <MdArrowOutward className="ext-arrow" />
                </a>
              </div>
            </div>

            <div className="contact-list-row">
              <span className="contact-row-label">GITHUB</span>
              <div className="contact-row-val-group">
                <a
                  href={config.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row-value contact-ext-link"
                  data-cursor="disable"
                >
                  @metiinie <MdArrowOutward className="ext-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Form */}
          <form className="contact-minimal-form" onSubmit={handleSendEmail}>
            {/* What are we building? columns */}
            <div className="minimal-field-group">
              <label className="minimal-field-label">WHAT ARE WE BUILDING?</label>
              <div className="what-we-build-grid">
                {INQUIRY_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`build-topic-btn ${selectedTopic === topic ? "active" : ""}`}
                    onClick={() => setSelectedTopic(topic)}
                    data-cursor="disable"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="minimal-field-group">
              <label htmlFor="contact-from-name" className="minimal-field-label">
                FROM_NAME
              </label>
              <input
                id="contact-from-name"
                name="name"
                type="text"
                className="minimal-input"
                placeholder="Your name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>

            <div className="minimal-field-group">
              <label htmlFor="contact-reply-to" className="minimal-field-label">
                REPLY_TO
              </label>
              <input
                id="contact-reply-to"
                name="email"
                type="email"
                className="minimal-input"
                placeholder="you@company.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>

            <div className="minimal-field-group">
              <label htmlFor="contact-prompt" className="minimal-field-label">
                PROMPT
              </label>
              <textarea
                id="contact-prompt"
                name="message"
                className="minimal-textarea"
                rows={5}
                placeholder="Tell me about the role, the problem, or the idea..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="minimal-submit-wrap">
              <button
                type="submit"
                className={`minimal-send-btn ${formStatus === "sent" ? "sent" : ""}`}
                disabled={formStatus === "sending"}
                data-cursor="disable"
              >
                {formStatus === "sending"
                  ? "Sending..."
                  : formStatus === "sent"
                  ? "Message sent ✓"
                  : "Send message →"}
              </button>
              {formStatus === "sent" && (
                <p className="minimal-form-feedback success" role="status">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              )}
              {formStatus === "error" && (
                <p className="minimal-form-feedback error" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Bottom Hairline Footer */}
        <div className="contact-minimal-footer">
          <p>
            Designed and Developed by <span>{config.developer.fullName}</span>
          </p>
          <p className="contact-copy-year">
            <MdCopyright /> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.4,
    delay: 0.2,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  var landingText = new TextSplitter(elements, {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 0.9,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.02,
      delay: 0.1,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade", ".landing-career-wrapper", ".landing-actions"],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
      y: 0,
      delay: 0.2,
      stagger: 0.06,
    }
  );
}

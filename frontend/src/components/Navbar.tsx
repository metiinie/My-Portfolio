import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    let rafId: number;

    if (window.innerWidth > 768) {
      // Initialize Lenis smooth scroll on desktop/tablet
      lenis = new Lenis({
        duration: 1.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.7,
        touchMultiplier: 2,
        infinite: false,
      });

      // Start paused on desktop where 3D loader runs; start immediately on tablet
      if (window.innerWidth > 1024) {
        lenis.stop();
      } else {
        lenis.start();
      }

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    } else {
      lenis = null;
    }

    // Handle navigation links on all devices (desktop, tablet, and mobile phone)
    const links = document.querySelectorAll(".header ul a");
    const clickHandlers: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> = [];

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handler = (e: Event) => {
        e.preventDefault();
        const current = e.currentTarget as HTMLAnchorElement;
        const section = current.getAttribute("data-href") || current.getAttribute("href");
        if (!section) return;
        const target = document.querySelector(section) as HTMLElement | null;
        if (!target) return;

        if (window.innerWidth > 768 && lenis) {
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.5,
          });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      element.addEventListener("click", handler);
      clickHandlers.push({ el: element, fn: handler });
    });

    const handleResize = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clickHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      window.removeEventListener("resize", handleResize);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {config.developer.initials}
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#career" href="#career">
              <HoverLinks text="CAREER" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

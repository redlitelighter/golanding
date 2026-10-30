import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { navLinks } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    // The nav is fixed, so it never scrolls past the top. Watch the page scroll
    // instead and toggle a class; the blur and colour fade is handled in CSS.
    ScrollTrigger.create({
      trigger: document.body,
      start: "top -60",
      end: "max",
      onToggle: (self) =>
        navRef.current?.classList.toggle("scrolled", self.isActive),
    });
  });

  return (
    <nav ref={navRef}>
      <div>
        <a href="#hero" className="brand">
          <img src="/images/logo.png" alt="" width="36" height="36" />
          <p>NBX-go</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <a href="#download" className="nav-cta">
          Download
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

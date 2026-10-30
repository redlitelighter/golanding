import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

const blocks = [
  {
    title: "Your keys, your phone",
    body: "A self-custodial wallet for Hedera built on Tether's WDK. Your recovery phrase is encrypted on the device, the app locks itself in the background, and you unlock with a password or biometrics.",
    tone: "",
  },
  {
    title: "Trade on SaucerSwap",
    body: "Swap any pair with the best route from live pools, place limit orders, watch live charts, and stake SAUCE for xSAUCE. Every trade settles on Hedera.",
    tone: "block-orange",
  },
  {
    title: "GO runs offline",
    body: "Say what you want and GO proposes the step. It runs on QVAC, so your chats never leave the phone, and you confirm every transaction yourself.",
    tone: "block-sky",
  },
];

const words = [
  "send.",
  "receive.",
  "swap.",
  "trade.",
  "stake.",
  "set a limit.",
  "scan a QR.",
  "read a chart.",
  "ask GO.",
  "speak to GO.",
  "hold HBAR.",
  "hold USDT0.",
  "hold SAUCE.",
  "check HashScan.",
  "stay offline.",
  "keep your keys.",
  "start small.",
  "go.",
];

const SCRAMBLE_CHARS = "01HBAR#$%+";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // 1. scrambleText: "load" items play in sequence, "scroll" items play when they enter
      const run = (el, delay = 0) => {
        const text = el.dataset.text || el.textContent;
        el.dataset.text = text;
        gsap.to(el, {
          duration: Number(el.dataset.duration) || 1.4,
          delay,
          ease: "none",
          scrambleText: {
            text,
            chars: SCRAMBLE_CHARS,
            speed: 0.6,
            revealDelay: 0.25,
          },
        });
      };

      if (!reduce) {
        const loadEls = gsap.utils.toArray("[data-scramble='load']");
        loadEls.forEach((el, i) => run(el, i * 0.35));

        gsap.utils.toArray("[data-scramble='scroll']").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => run(el),
          });
        });
      }

      // 2. sticky "you can" + words that light up as they pass the centre
      const items = gsap.utils.toArray("#words li");
      items.forEach((li, i) => {
        const first = i === 0;
        const last = i === items.length - 1;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: li,
            start: "top 62%",
            end: "bottom 38%",
            scrub: 0.2,
          },
        });
        tl.fromTo(
          li,
          { opacity: first ? 1 : 0.2 },
          { opacity: 1, ease: "none" },
        );
        if (!last) tl.to(li, { opacity: 0.2, ease: "none" });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root}>
      <section id="hero">
        <div className="hero-top">
          <h1 className="fluid" data-scramble="load" data-duration="1.8">
            NBX-go
          </h1>
          <p className="tagline" data-scramble="load">
            The next step.
          </p>
          <p className="lede" data-scramble="load" data-duration="2.6">
            A self-custodial wallet for Hedera, with an AI assistant that runs
            entirely on your phone. Swap, trade, stake and send from one app.
            Your keys and your chats stay with you.
          </p>
          <div className="cta-row">
            <a href="#download" className="btn btn-primary">
              Download the beta
            </a>
            <a href="#words" className="btn btn-ghost">
              See what you can do
            </a>
          </div>
        </div>

        <div className="hero-blocks">
          {blocks.map((b) => (
            <article key={b.title} className={`block ${b.tone}`}>
              <h3 data-scramble="scroll" data-duration="1">
                {b.title}
              </h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="words">
        <div className="words-wrap">
          <h2>
            <span aria-hidden="true">you can&nbsp;</span>
            <span className="sr-only-text">
              you can send, swap, trade, stake and ask GO.
            </span>
          </h2>
          <ul aria-hidden="true">
            {words.map((w, i) => (
              <li key={w} style={{ "--i": i }}>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="beta">
        <div className="block">
          <div>
            <h3 data-scramble="scroll">Beta, with real funds</h3>
            <p>
              NBX-go runs on Hedera mainnet. Start small. GO gives information,
              not financial advice, and NBX is not responsible for your
              financial decisions. NBX was incubated by the Nairobi Securities
              Exchange.
            </p>
          </div>
          <a href="#download" className="btn btn-primary">
            Get the APK
          </a>
        </div>
      </section>
    </main>
  );
}

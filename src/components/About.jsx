import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import Carousel from "./Carousel";
import CoinOrbit from "./CoinOrbit";
import { coins } from "../../constants";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

const SCRAMBLE_CHARS = "01HBAR#$%+";

const stack = [
  {
    title: "Hedera",
    tag: "The network",
    tone: "",
    body: "Every swap, send and stake settles on Hedera mainnet: fast, low-fee and carbon-negative. Network fees are paid in HBAR.",
  },
  {
    title: "Tether WDK",
    tag: "The wallet core",
    tone: "block-orange",
    body: "WDK creates and protects your keys and signs transactions on your device. Your recovery phrase stays encrypted on your phone.",
  },
  {
    title: "QVAC",
    tag: "The brain",
    tone: "block-sky",
    body: "QVAC runs GO on your phone, so your chats stay private and GO still works offline. GO proposes a step; you confirm it.",
  },
];

const swapSteps = [
  {
    title: "Say it or tap it",
    body: "Type or speak “swap 20 HBAR to SAUCE” to GO, or use the Swap tab. GO turns it into a proposed step. Nothing moves yet.",
  },
  {
    title: "Find the route",
    body: "SaucerSwap pools hold pairs of tokens, and the ratio in a pool sets the price. NBX-go reads the live pools and picks the best route, which may pass through more than one pool.",
  },
  {
    title: "Review the quote",
    body: "You see what you should receive, the price impact and the minimum you will accept. If the price moves past that minimum, the swap does not go through.",
  },
  {
    title: "Sign and settle",
    body: "You confirm, your wallet signs on the device, and Hedera settles it in seconds. Check it on HashScan. The first time you hold a new coin, Hedera asks for a one-time token association.",
  },
];

const carouselItems = coins.map(({ symbol, description, image }) => ({
  title: symbol,
  description,
  image,
}));

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray("[data-scramble]").forEach((el) => {
        const text = el.dataset.text || el.textContent;
        el.dataset.text = text;
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              duration: Number(el.dataset.duration) || 1.2,
              ease: "none",
              scrambleText: {
                text,
                chars: SCRAMBLE_CHARS,
                speed: 0.6,
                revealDelay: 0.2,
              },
            }),
        });
      });

      gsap.from(".about-steps li", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".about-steps",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <main ref={root}>
      <section id="about">
        <p className="kicker">About NBX-go</p>
        <h2 className="fluid-md" data-scramble data-duration="1.4">
          Three pieces, one app
        </h2>
        <p className="about-lede">
          NBX-go is a self-custodial wallet for Hedera. It is built from three
          parts that each do one job, and none of them ever holds your money for
          you.
        </p>

        <div className="about-stack">
          {stack.map((s) => (
            <article key={s.title} className={`block ${s.tone}`}>
              <p className="tag">{s.tag}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="swaps">
        <h2 className="fluid-md" data-scramble data-duration="1.2">
          How a swap works
        </h2>
        <ol className="about-steps">
          {swapSteps.map((s, i) => (
            <li key={s.title}>
              <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="about-note">
          GO gives information, not financial advice. Start small and confirm
          every step yourself.
        </p>
      </section>

      <section id="coins">
        <h2 className="fluid-md" data-scramble data-duration="1.2">
          Coins you can trade
        </h2>
        <CoinOrbit coins={coins} />

        <div
          className="about-carousel"
          style={{ height: "600px", position: "relative" }}
        >
          <Carousel
            items={carouselItems}
            baseWidth={300}
            aspectRatio={1.25}
            effect="tilt"
            indicator="dots"
            frame
            arrows={false}
            loop={false}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={false}
            theme="dark"
            peek={0}
            gap={16}
            radius={12}
            draggable
            round={false}
          />
        </div>
      </section>
    </main>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

export default function CoinOrbit({ coins }) {
  const root = useRef(null);
  const ring = useRef(null);

  useGSAP(
    () => {
      const circle = ring.current;
      const coinEls = gsap.utils.toArray(".coin", circle);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Place coins evenly on the circle edge. Starts at the top (-90deg).
      // clientWidth (not offsetWidth) because absolute children measure from the inner edge.
      const place = () => {
        const radius = circle.clientWidth / 2;
        const step = (Math.PI * 2) / coinEls.length;
        coinEls.forEach((el, i) => {
          const a = step * i - Math.PI / 2;
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            x: radius + Math.cos(a) * radius,
            y: radius + Math.sin(a) * radius,
          });
        });
      };
      place();

      const ro = new ResizeObserver(place);
      ro.observe(circle);

      // Ring turns one way, coins turn the other, so the icons always stay upright.
      const spin = gsap
        .timeline({
          repeat: -1,
          paused: reduce,
          defaults: { duration: 60, ease: "none" },
        })
        .to(circle, { rotation: 360 })
        .to(coinEls, { rotation: -360 }, 0);

      const toProgress = (rotation) =>
        spin.progress((((rotation % 360) + 360) % 360) / 360);

      Draggable.create(circle, {
        type: "rotation",
        inertia: true,
        onPressInit: () => spin.pause(),
        onDrag() {
          toProgress(this.rotation);
        },
        onThrowUpdate() {
          toProgress(this.rotation);
        },
        onThrowComplete() {
          if (reduce) return;
          spin.resume();
          // Ease back into the normal spin instead of snapping to full speed.
          gsap.fromTo(
            spin,
            { timeScale: 0 },
            { duration: 1, timeScale: 1, ease: "power1.in" },
          );
        },
      });

      return () => ro.disconnect();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="orbit"
      role="img"
      aria-label={`Coins you can trade: ${coins.map((c) => c.symbol).join(", ")}`}
    >
      <div ref={ring} className="orbit-ring">
        {coins.map((c) => (
          <div className="coin" key={c.symbol} aria-hidden="true">
            <span className="coin-fallback">{c.symbol}</span>
            <img
              src={c.image}
              alt=""
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
      <div className="orbit-center" aria-hidden="true">
        <p className="orbit-count">{coins.length}</p>
        <p className="orbit-label">coins on Hedera</p>
        <p className="orbit-hint">drag to spin</p>
      </div>
    </div>
  );
}

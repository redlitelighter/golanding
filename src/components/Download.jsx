import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

/* ------------------------------------------------------------------
   PASTE YOUR GOOGLE DRIVE SHARE LINK HERE.
   In Drive: right-click the APK > Share > set "Anyone with the link" > Copy link.
   It looks like https://drive.google.com/file/d/FILE_ID/view?usp=sharing
------------------------------------------------------------------- */
const DRIVE_LINK =
  "https://drive.google.com/file/d/1O4D4FvTmbdjRG94goM2xS1uhsslbPmFz/view?usp=sharing";

// Update these by hand whenever you upload a new build.
const VERSION = "v0.1.0-beta";
const FILE_SIZE = ""; // e.g. "180 MB", leave empty to hide
const UPDATED = ""; // e.g. "30 Oct 2026", leave empty to hide

const getFileId = (link) => {
  const match =
    link.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const fileId = getFileId(DRIVE_LINK);
const isConfigured = Boolean(fileId);
// Direct download link. For large files Google shows a "can't scan for viruses" page; tap
// "Download anyway" there. The view link is kept as the backup.
const DOWNLOAD_URL = isConfigured
  ? `https://drive.google.com/uc?export=download&id=${fileId}`
  : "#download";
const VIEW_URL = isConfigured
  ? `https://drive.google.com/file/d/${fileId}/view`
  : "#download";

export default function Download() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray("[data-scramble]").forEach((el, i) => {
        const text = el.textContent;
        gsap.to(el, {
          duration: Number(el.dataset.duration) || 1.2,
          delay: i * 0.2,
          ease: "none",
          scrambleText: {
            text,
            chars: "01HBAR#$%+",
            speed: 0.6,
            revealDelay: 0.2,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root}>
      <section id="download">
        <h2 className="fluid-md" data-scramble data-duration="1.4">
          Download NBX-go
        </h2>

        <div className="download-grid">
          <article className="block block-orange dl-main">
            <h3>Latest build for Android</h3>
            <p className="version">{VERSION}</p>
            {(FILE_SIZE || UPDATED) && (
              <p className="meta">
                {FILE_SIZE && <span>{FILE_SIZE}</span>}
                {UPDATED && <span>Updated {UPDATED}</span>}
              </p>
            )}
            {!isConfigured && (
              <p>
                The download link is not set yet. Add your Google Drive link in
                Download.jsx.
              </p>
            )}
            <div className="cta-row">
              <a
                href={DOWNLOAD_URL}
                className="btn btn-ghost"
                style={{ background: "#0b1220", borderColor: "#0b1220" }}
                {...(isConfigured
                  ? { rel: "noreferrer" }
                  : { "aria-disabled": true })}
              >
                Download APK
              </a>
            </div>
            <a
              className="fallback"
              href={VIEW_URL}
              target="_blank"
              rel="noreferrer"
            >
              Download did not start? Open the file in Google Drive
            </a>
          </article>

          <article className="block dl-specs">
            <h3>What you need</h3>
            <dl>
              <dt>Phone</dt>
              <dd>arm64 Android</dd>
              <dt>Network</dt>
              <dd>Hedera mainnet</dd>
              <dt>Build</dt>
              <dd>Beta, signed with a development key</dd>
              <dt>Fiat ramps</dt>
              <dd>M-Pesa, card and bank are coming soon</dd>
            </dl>
          </article>

          <article className="block dl-steps">
            <h3>Install in three steps</h3>
            <ol>
              <li>
                <strong>Download the APK</strong>
                Tap the button on your phone. If Google Drive warns that it
                cannot scan the file, choose Download anyway.
              </li>
              <li>
                <strong>Allow this source</strong>
                Android asks permission to install from this source because the
                beta uses a development key. Approve it for your browser or file
                manager.
              </li>
              <li>
                <strong>Open and agree to the beta terms</strong>
                Create or import a wallet, then start with a small amount. GO
                gives information, not financial advice.
              </li>
            </ol>
          </article>
        </div>
      </section>

      <footer>
        NBX-go is built on Tether's WDK (Apache License 2.0). Swaps by
        SaucerSwap, on-device AI by QVAC, network by Hedera.
      </footer>
    </main>
  );
}

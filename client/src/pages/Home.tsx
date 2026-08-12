/* Midnight Conservatory: an intimate, cinematic botanical stage. Keep the bouquet code-built, the pacing deliberate, and every interaction soft. */

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = "opening" | "bouquet";
type FlowerType = "rose" | "tulip" | "sprig";

type Flower = {
  id: string;
  name: string;
  type: FlowerType;
  x: number;
  y: number;
  delay: number;
  message: string;
  hue: "rose" | "blush" | "cream";
};

type Burst = { id: number; x: number; y: number } | null;

const STORAGE_LOGO = "/manus-storage/rose-bracket-mark_371373a1.png";

const flowers: Flower[] = [
  { id: "north-rose", name: "The north rose", type: "rose", x: 250, y: 120, delay: 0.15, message: "Made this one just for you.", hue: "rose" },
  { id: "left-tulip", name: "The left tulip", type: "tulip", x: 145, y: 210, delay: 0.55, message: "You make ordinary days feel special.", hue: "blush" },
  { id: "right-rose", name: "The right rose", type: "rose", x: 345, y: 195, delay: 0.85, message: "Every petal holds a little piece of my heart.", hue: "blush" },
  { id: "center-rose", name: "The center rose", type: "rose", x: 245, y: 250, delay: 1.05, message: "This one bloomed when I thought of your smile.", hue: "rose" },
  { id: "far-tulip", name: "The far tulip", type: "tulip", x: 380, y: 280, delay: 1.25, message: "A small reminder: you are deeply loved.", hue: "cream" },
  { id: "front-rose", name: "The front rose", type: "rose", x: 190, y: 355, delay: 1.9, message: "I would choose you in every version of this story.", hue: "rose" },
  { id: "left-sprig", name: "The left sprig", type: "sprig", x: 95, y: 325, delay: 0.2, message: "For all the quiet joy you bring with you.", hue: "cream" },
  { id: "right-sprig", name: "The right sprig", type: "sprig", x: 405, y: 360, delay: 0.38, message: "There is always room for one more little wonder.", hue: "blush" },
  { id: "far-left-sprig", name: "The far left sprig", type: "sprig", x: 72, y: 246, delay: 0.56, message: "You turn small moments into keepsakes.", hue: "blush" },
  { id: "far-right-sprig", name: "The far right sprig", type: "sprig", x: 428, y: 236, delay: 0.72, message: "A little bloom for every reason I adore you.", hue: "cream" },
  { id: "high-left-sprig", name: "The high left sprig", type: "sprig", x: 154, y: 116, delay: 0.84, message: "You are my favorite kind of beautiful.", hue: "cream" },
  { id: "high-right-sprig", name: "The high right sprig", type: "sprig", x: 364, y: 116, delay: 0.98, message: "I hope this finds you smiling.", hue: "blush" },
  { id: "front-left-sprig", name: "The front left sprig", type: "sprig", x: 126, y: 394, delay: 1.14, message: "For the warmth you carry into every room.", hue: "cream" },
  { id: "front-right-sprig", name: "The front right sprig", type: "sprig", x: 372, y: 411, delay: 1.3, message: "Love looks a little like this: handmade and growing.", hue: "blush" },
  { id: "low-sprig", name: "The low sprig", type: "sprig", x: 244, y: 424, delay: 1.45, message: "One more tiny yes to you.", hue: "cream" },
];

const leafDetails = [
  { x: 192, y: 437, rotation: -26, scale: 1.02 }, { x: 309, y: 442, rotation: 28, scale: .98 },
  { x: 222, y: 391, rotation: -43, scale: .84 }, { x: 286, y: 365, rotation: 38, scale: .88 },
  { x: 164, y: 466, rotation: -51, scale: .92 }, { x: 334, y: 486, rotation: 49, scale: 1.02 },
  { x: 180, y: 319, rotation: -58, scale: .7 }, { x: 322, y: 314, rotation: 56, scale: .72 },
  { x: 133, y: 286, rotation: -66, scale: .64 }, { x: 369, y: 273, rotation: 65, scale: .68 },
  { x: 207, y: 271, rotation: -36, scale: .62 }, { x: 302, y: 249, rotation: 39, scale: .64 },
  { x: 151, y: 374, rotation: -14, scale: .76 }, { x: 353, y: 389, rotation: 18, scale: .78 },
  { x: 226, y: 477, rotation: -9, scale: .7 }, { x: 281, y: 480, rotation: 11, scale: .72 },
];

const typedCopy = "Some gifts are bought. Some gifts are made. And some are written — one line of code at a time.";

function makeLoveNotes() {
  return Array.from({ length: 220 }, (_, index) => {
    const seed = index + 1;
    const x = (seed * 47.17) % 100;
    const y = (seed * 31.61 + (seed % 7) * 4) % 100;
    const rotation = ((seed * 29) % 34) - 17;
    const size = 9 + (seed % 5) * 1.8;
    const opacity = 0.2 + (seed % 6) * 0.055;
    const duration = 6.5 + (seed % 8) * 0.65;
    const delay = -((seed * 1.37) % 8);
    return { x, y, rotation, size, opacity, duration, delay };
  });
}

function RoseHead({ hue }: { hue: Flower["hue"] }) {
  const fill = hue === "rose" ? "url(#rosePetal)" : hue === "blush" ? "url(#blushPetal)" : "url(#creamPetal)";
  return (
    <g className="rose-head">
      {Array.from({ length: 24 }, (_, index) => {
        const ring = index % 3;
        const angle = index * 15;
        const scale = ring === 0 ? .58 : ring === 1 ? .78 : 1;
        const depth = ring === 0 ? 12 : ring === 1 ? 7 : 2;
        return (
          <path
            key={`rose-petal-${index}`}
            d="M0 11C-20 5-36-7-38-22C-40-37-28-49-16-45C-7-43-3-35 0-26C3-37 10-46 21-44C35-41 41-28 35-15C29-2 16 7 0 11Z"
            fill={ring === 0 ? "url(#roseCore)" : ring === 1 ? "url(#roseInner)" : fill}
            opacity={ring === 0 ? .95 : ring === 1 ? .88 : .82}
            transform={`rotate(${angle}) translate(0 ${depth}) scale(${scale})`}
            className={`petal petal-ring-${ring}`}
          />
        );
      })}
      <path d="M-27-15C-17-30-3-35 9-27M-18 0C-8-8 4-10 16-3" fill="none" stroke="rgba(255,226,220,.46)" strokeWidth="2" strokeLinecap="round" className="petal-highlight" />
      <circle cx="0" cy="0" r="5" fill="#6f213a" opacity=".74" />
    </g>
  );
}

function TulipHead({ hue }: { hue: Flower["hue"] }) {
  const fill = hue === "cream" ? "url(#creamPetal)" : hue === "blush" ? "url(#blushPetal)" : "url(#rosePetal)";
  return (
    <g className="tulip-head">
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={`tulip-petal-${index}`}
          d="M0 9C-25-1-31-27-8-56C-2-45 0-34 0-21C2-36 6-48 12-57C34-29 26-3 0 9Z"
          fill={index === 3 ? "url(#tulipInner)" : fill}
          opacity={index === 3 ? .96 : .78}
          transform={`rotate(${(index - 3) * 10}) translate(0 ${index === 3 ? 4 : 0}) scale(${index === 3 ? 1.03 : .95 + (index % 2) * .04})`}
          className="petal tulip-petal"
        />
      ))}
      <path d="M-25-25c6 12 13 18 21 23" fill="none" stroke="rgba(255,237,231,.45)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function SprigHead({ hue }: { hue: Flower["hue"] }) {
  const fill = hue === "cream" ? "url(#creamPetal)" : "url(#blushPetal)";
  return (
    <g className="sprig-head">
      {Array.from({ length: 5 }, (_, index) => (
        <ellipse key={`sprig-petal-${index}`} cx="0" cy="-11" rx="7" ry="15" fill={fill} transform={`rotate(${index * 72})`} opacity={.82 + (index % 2) * .08} />
      ))}
      <circle cx="0" cy="0" r="6" fill="url(#roseCore)" />
      <circle cx="0" cy="0" r="2.5" fill="#f8d69a" />
    </g>
  );
}

function FlowerHead({ flower }: { flower: Flower }) {
  if (flower.type === "rose") return <RoseHead hue={flower.hue} />;
  if (flower.type === "tulip") return <TulipHead hue={flower.hue} />;
  return <SprigHead hue={flower.hue} />;
}

function Bouquet({ activeFlower, bloomReady, onFlower }: { activeFlower: string | null; bloomReady: boolean; onFlower: (flower: Flower, event?: React.MouseEvent<SVGGElement>) => void }) {
  return (
    <svg className="bouquet-svg" viewBox="0 0 500 600" role="img" aria-label="A code-built bouquet of roses, tulips, leaves, and small flowers">
      <defs>
        <linearGradient id="stem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8ab39a" /><stop offset=".55" stopColor="#416b53" /><stop offset="1" stopColor="#1d3b30" /></linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fb99b" /><stop offset=".45" stopColor="#49765b" /><stop offset="1" stopColor="#203d30" /></linearGradient>
        <radialGradient id="rosePetal" cx="30%" cy="20%"><stop offset="0" stopColor="#ffd4d1" /><stop offset=".32" stopColor="#e98c9d" /><stop offset=".8" stopColor="#b64063" /><stop offset="1" stopColor="#632039" /></radialGradient>
        <radialGradient id="blushPetal" cx="30%" cy="20%"><stop offset="0" stopColor="#fff0e3" /><stop offset=".35" stopColor="#f2b3b1" /><stop offset=".8" stopColor="#ca667c" /><stop offset="1" stopColor="#70263e" /></radialGradient>
        <radialGradient id="creamPetal" cx="30%" cy="18%"><stop offset="0" stopColor="#fff6da" /><stop offset=".35" stopColor="#f6d7a7" /><stop offset=".78" stopColor="#c58b79" /><stop offset="1" stopColor="#6c3347" /></radialGradient>
        <radialGradient id="roseInner"><stop offset="0" stopColor="#f7b0b4" /><stop offset="1" stopColor="#8f294d" /></radialGradient>
        <radialGradient id="roseCore"><stop offset="0" stopColor="#ffd2c2" /><stop offset=".6" stopColor="#d66c7b" /><stop offset="1" stopColor="#9a3655" /></radialGradient>
        <radialGradient id="tulipInner"><stop offset="0" stopColor="#f5b9ad" /><stop offset="1" stopColor="#7f2947" /></radialGradient>
        <filter id="flowerShadow" x="-45%" y="-45%" width="190%" height="190%"><feDropShadow dx="0" dy="9" stdDeviation="7" floodColor="#000" floodOpacity=".45" /></filter>
      </defs>

      <g className="stems" aria-hidden="true">
        {[
          "M253 535C247 440 250 330 250 115", "M250 535C224 444 188 356 144 205", "M251 537C289 436 329 318 345 190",
          "M244 538C201 456 142 391 95 322", "M266 537C310 474 363 405 405 357", "M249 535C229 452 213 397 190 351",
          "M245 538C190 469 120 379 72 246", "M260 537C308 453 370 365 428 236", "M241 536C225 423 184 236 154 116",
          "M263 535C279 429 331 230 364 116", "M250 536C246 482 244 456 244 424", "M247 535C225 454 161 408 126 394",
          "M270 535C305 461 344 435 372 411",
        ].map((path, index) => <path key={`stem-${index}`} d={path} stroke="url(#stem)" strokeWidth={index < 3 ? 6 : 3.4 + (index % 3)} fill="none" className="stem-line" style={{ "--stem-delay": `${index * .08}s` } as React.CSSProperties} />)}
      </g>

      <g className="leaves" aria-hidden="true">
        {leafDetails.map((leaf, index) => (
          <g key={`leaf-${index}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.scale})`} className="leaf-shape">
            <path d="M0 0C-43-3-58-28-48-48C-23-45-3-29 0 0Z" fill="url(#leaf)" stroke="#9bc2aa" strokeOpacity=".34" strokeWidth="1.4" />
            <path d="M-3-3C-22-14-37-26-46-42" stroke="#b2d0b2" strokeOpacity=".42" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>

      <g className="ribbon" aria-hidden="true">
        <path d="M193 511C216 527 233 531 251 532c19-1 38-6 57-22l-8 44c-23 12-45 15-62 14-21 0-42-5-61-15Z" fill="#b95770" opacity=".96" />
        <path d="M215 535c-12 23-17 38-12 54 16-7 30-21 39-43Z" fill="#9e3d59" />
        <path d="M284 535c12 23 17 38 12 54-16-7-30-21-39-43Z" fill="#773048" />
        <path d="M212 523c20 8 49 10 77 0" stroke="#f0b578" strokeOpacity=".65" strokeWidth="2" fill="none" />
      </g>

      {flowers.map((flower) => (
        <g key={flower.id} transform={`translate(${flower.x} ${flower.y})`}>
          <g
            className={`flower flower-${flower.type} ${activeFlower === flower.id ? "is-active" : ""} ${bloomReady ? "is-bloomed" : ""}`}
            style={{ "--bloom-delay": `${flower.delay}s` } as React.CSSProperties}
            role="button"
            tabIndex={0}
            aria-label={`Tap ${flower.name}`}
            onClick={(event) => onFlower(flower, event)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onFlower(flower);
              }
            }}
          >
            <title>{flower.name}</title>
            <FlowerHead flower={flower} />
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  const requestedScene = window.location.pathname === "/final" ? "final" : window.location.pathname === "/bouquet" ? "bouquet" : new URLSearchParams(window.location.search).get("scene");
  const [scene, setScene] = useState<Scene>(() => {
    return requestedScene === "bouquet" || requestedScene === "final" ? "bouquet" : "opening";
  });
  const [bloomReady, setBloomReady] = useState(requestedScene === "bouquet" || requestedScene === "final");
  const [finalReveal, setFinalReveal] = useState(requestedScene === "final");
  const [activeFlower, setActiveFlower] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [burst, setBurst] = useState<Burst>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const loveNotes = useMemo(makeLoveNotes, []);

  useEffect(() => {
    if (scene !== "opening") return;
    const timer = window.setTimeout(() => setScene("bouquet"), 4700);
    return () => window.clearTimeout(timer);
  }, [scene]);

  useEffect(() => {
    if (scene !== "bouquet") return;
    const timer = window.setTimeout(() => setBloomReady(true), 5600);
    return () => window.clearTimeout(timer);
  }, [scene]);

  useEffect(() => {
    if (!bloomReady) return;
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setTypedText(typedCopy.slice(0, current));
      if (current >= typedCopy.length) window.clearInterval(timer);
    }, 29);
    return () => window.clearInterval(timer);
  }, [bloomReady]);

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setBurst(null), 1050);
    return () => window.clearTimeout(timer);
  }, [burst]);

  const handleFlower = (flower: Flower, event?: React.MouseEvent<SVGGElement>) => {
    setActiveFlower(flower.id);
    if (figureRef.current && event) {
      const flowerRect = event.currentTarget.getBoundingClientRect();
      const stageRect = figureRef.current.getBoundingClientRect();
      setBurst({ id: Date.now(), x: flowerRect.left - stageRect.left + flowerRect.width / 2, y: flowerRect.top - stageRect.top + flowerRect.height / 2 });
    } else {
      setBurst({ id: Date.now(), x: 50, y: 44 });
    }
  };

  const selectedMessage = flowers.find((flower) => flower.id === activeFlower)?.message;

  return (
    <div className={`experience ${scene} ${finalReveal ? "final-mode" : ""}`}>
      <section className={`opening-scene ${scene !== "opening" ? "is-leaving" : ""}`} aria-hidden={scene !== "opening"}>
        <div className="opening-glow opening-glow-one" />
        <div className="opening-glow opening-glow-two" />
        <div className="love-note-field">
          {loveNotes.map((note, index) => (
            <span
              key={index}
              className="love-note"
              style={{ "--note-x": `${note.x}%`, "--note-y": `${note.y}%`, "--note-rotation": `${note.rotation}deg`, "--note-size": `${note.size}px`, "--note-opacity": note.opacity, "--note-duration": `${note.duration}s`, "--note-delay": `${note.delay}s` } as React.CSSProperties}
            >
              I love you <b>♥</b>
            </span>
          ))}
        </div>
        <div className="opening-caption">
          <span className="opening-caption-line" />
          <span>for the one who makes the world softer</span>
        </div>
        <span className="sr-only">A field of tiny love notes is unfolding.</span>
      </section>

      <main className={`bouquet-scene ${scene === "bouquet" ? "is-visible" : ""}`}>
        <div className="scene-grain" aria-hidden="true" />
        <div className="scene-topline">
          <div className="brand-lockup">
            <img src={STORAGE_LOGO} alt="" className="brand-mark" />
            <span className="brand-wordmark">the love bouquet</span>
          </div>
          <span className="scene-index">01 / 02</span>
        </div>

        <div className="bouquet-layout">
          <header className="intro-block">
            <p className="eyebrow">A bouquet written in code</p>
            <h1>Some flowers are grown.<br /><em>These were written.</em></h1>
            <p className="intro-copy">A small digital garden for the person who makes every ordinary day feel a little more like spring.</p>
            <div className="code-signature"><span className="code-dot" /> <span>stems.js</span><span className="code-separator">/</span><span>made with love</span></div>
          </header>

          <div className="bouquet-column">
            <div className="bouquet-orbit orbit-one" />
            <div className="bouquet-orbit orbit-two" />
            <div className="bouquet-figure" ref={figureRef}>
              <div className="bloom-dust dust-one" />
              <div className="bloom-dust dust-two" />
              <div className="bloom-dust dust-three" />
              <div className="petal-fall" aria-hidden="true"><span>✦</span><span>·</span><span>✦</span><span>·</span></div>
              <Bouquet activeFlower={activeFlower} bloomReady={bloomReady} onFlower={handleFlower} />
              {burst && (
                <div className="heart-burst" key={burst.id} style={{ left: burst.x, top: burst.y }} aria-hidden="true">
                  <span>♥</span><span>♥</span><span>♥</span><span>✦</span><span>♥</span>
                </div>
              )}
            </div>
            <p className="tap-hint"><span className="tap-line" /> tap a flower to hear what it holds</p>
          </div>

          <section className="message-rail" aria-live="polite">
            <div className={`flower-message ${activeFlower ? "is-shown" : ""}`}>
              <span className="message-kicker">a little note from the garden</span>
              <p>{selectedMessage || "Every flower here has a little piece of my heart."}</p>
            </div>
            <div className={`bouquet-message ${bloomReady ? "is-ready" : ""}`}>
              <span className="message-kicker">for you, <span className="tiny-heart">♥</span></span>
              <p className="typed-message">“{typedText}”<span className="typing-cursor" /></p>
              <p className="message-signoff">I made this bouquet for you.</p>
            </div>
            <button className={`final-invite ${bloomReady ? "is-ready" : ""}`} type="button" onClick={() => setFinalReveal(true)}>
              <span>One more thing</span><span className="invite-heart">♥</span>
            </button>
          </section>
        </div>

        <footer className="scene-footer"><span>crafted one line at a time</span><span className="footer-thread" /><span>with all my heart</span></footer>
      </main>

      <div className={`final-letter ${finalReveal ? "is-visible" : ""}`} aria-hidden={!finalReveal}>
        <div className="final-letter-backdrop" />
        <div className="final-letter-inner">
          <span className="eyebrow">02 / 02 · the last petal</span>
          <div className="final-rule" />
          <p className="final-copy">If I could give you a real bouquet every time I wanted to remind you how special you are, I would.</p>
          <p className="final-copy">So I made you one instead.</p>
          <p className="final-copy final-copy-soft">Not because it’s better than real flowers…<br />but because this one will always have a little piece of me in its code.</p>
          <div className="final-heart">♥</div>
          <button className="return-button" type="button" onClick={() => setFinalReveal(false)}>Keep the bouquet close <span>↗</span></button>
        </div>
      </div>
    </div>
  );
}

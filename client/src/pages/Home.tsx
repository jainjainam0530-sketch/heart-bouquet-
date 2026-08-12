/* Midnight Conservatory: the gift now opens into a name-driven Bloom For You garden. The bouquet is procedural SVG, never stock imagery. */

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import QRCode from "qrcode";
import { createBouquet, flowerList, type BouquetFlower, type BouquetModel, type Palette } from "@/lib/bouquetEngine";
import { FLOWER_META, type FlowerType } from "@/lib/flowerLibrary";
import { normalizeName } from "@/lib/nameSeed";
import { generatePersonalNote, personalityLine } from "@/lib/noteGenerator";
import { createFreshBouquet } from "@/lib/variationHistory";

type Stage = "opening" | "intro" | "growing" | "bouquet" | "final";
type Burst = { id: number; x: number; y: number } | null;

const STORAGE_LOGO = "/manus-storage/rose-bracket-mark_371373a1.png";
const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
const sharedName = normalizeName(urlParams?.get("name") ?? "");
const previewView = urlParams?.get("view");
const sharedVariationId = Number.parseInt(urlParams?.get("v") ?? "0", 10) || 0;

function PetalRose({ palette }: { palette: Palette }) {
  return <g className="rose-head">{Array.from({ length: 24 }, (_, index) => { const ring = index % 3; const angle = index * 15; const scale = ring === 0 ? .58 : ring === 1 ? .78 : 1; const depth = ring === 0 ? 12 : ring === 1 ? 7 : 2; return <path key={index} d="M0 11C-21 12-38 2-41-14C-44-29-35-43-22-44C-10-45-4-36 1-26C6-38 16-46 27-41C40-35 43-20 36-8C28 5 14 12 0 11Z" fill={ring === 0 ? "url(#roseCore)" : ring === 1 ? "url(#roseInner)" : "url(#petalMain)"} opacity={ring === 0 ? .96 : ring === 1 ? .88 : .82} transform={`rotate(${angle}) translate(0 ${depth}) scale(${scale})`} className={`petal petal-ring-${ring}`} />; })}<path d="M-28-17C-17-28-4-32 7-25M-19-1C-8-8 4-9 15-3" fill="none" stroke={palette.highlight} strokeOpacity=".48" strokeWidth="1.8" strokeLinecap="round" /><circle cx="0" cy="0" r="5" fill="url(#roseCore)" opacity=".8" /></g>;
}

function PetalTulip({ palette }: { palette: Palette }) {
  return <g className="tulip-head">{Array.from({ length: 7 }, (_, index) => <path key={index} d="M-23-8C-30-30-18-49 0-55C18-49 30-30 23-8C18 8 9 16 0 18C-9 16-18 8-23-8Z" fill={index === 3 ? "url(#petalInner)" : "url(#petalMain)"} opacity={index === 3 ? .96 : .78} transform={`rotate(${(index - 3) * 9}) translate(0 ${index === 3 ? 4 : 0}) scale(${index === 3 ? 1.03 : .92 + (index % 2) * .04})`} className="petal" />)}<path d="M-20-10C-15-27-7-38 0-45M0-45C8-38 15-26 20-10" fill="none" stroke={palette.highlight} strokeOpacity=".5" strokeWidth="1.7" strokeLinecap="round" /></g>;
}

function PetalCherry({ palette }: { palette: Palette }) {
  return <g className="cherry-head">{Array.from({ length: 5 }, (_, index) => <ellipse key={index} cx="0" cy="-12" rx="10" ry="19" fill="url(#petalSoft)" transform={`rotate(${index * 72})`} opacity=".9" />)}<circle r="6" fill={palette.gold} /><circle r="2" fill={palette.deep} /></g>;
}

function PetalDaisy({ palette }: { palette: Palette }) {
  return <g className="daisy-head">{Array.from({ length: 8 }, (_, index) => <ellipse key={index} cx="0" cy="-15" rx="7" ry="23" fill="#fff0dc" opacity=".88" transform={`rotate(${index * 45})`} />)}<circle r="10" fill={palette.gold} /><circle r="4" fill={palette.deep} /></g>;
}

function PetalSunflower({ palette }: { palette: Palette }) {
  return <g className="sunflower-head">{Array.from({ length: 14 }, (_, index) => <ellipse key={index} cx="0" cy="-21" rx="7" ry="30" fill="#e6b45f" opacity=".92" transform={`rotate(${index * 25.7})`} />)}<circle r="19" fill="#70402e" /><circle r="10" fill={palette.deep} opacity=".85" /></g>;
}

function PetalHibiscus({ palette }: { palette: Palette }) {
  return <g className="hibiscus-head">{Array.from({ length: 5 }, (_, index) => <path key={index} d="M0 4C-30-8-35-36-13-50C-5-55 0-42 0-29C3-43 12-56 22-48C43-31 30-7 0 4Z" fill="url(#petalMain)" opacity=".86" transform={`rotate(${index * 72})`} />)}<circle r="8" fill={palette.deep} /><path d="M0 5C8-9 12-21 11-37" stroke={palette.gold} strokeWidth="3" fill="none" strokeLinecap="round" /></g>;
}

function PetalLavender({ palette }: { palette: Palette }) {
  return <g className="lavender-head"><path d="M0 30C-4 10-3-15 1-53" stroke={palette.leafLight} strokeWidth="3" fill="none" />{Array.from({ length: 9 }, (_, index) => <ellipse key={index} cx={index % 2 ? 7 : -7} cy={20 - index * 9} rx="8" ry="12" fill="url(#petalSoft)" opacity=".9" transform={`rotate(${index % 2 ? 22 : -22} ${index % 2 ? 7 : -7} ${20 - index * 9})`} />)}</g>;
}

function PetalCarnation({ palette }: { palette: Palette }) {
  return <g className="carnation-head">{Array.from({ length: 18 }, (_, index) => <path key={index} d="M0 5C-17-3-21-19-8-29C-3-34 0-25 0-18C4-29 13-32 17-24C24-10 13 0 0 5Z" fill="url(#petalSoft)" opacity=".82" transform={`rotate(${index * 20}) scale(${.72 + (index % 3) * .12})`} />)}<circle r="7" fill={palette.deep} opacity=".7" /></g>;
}

function PetalWildflower({ palette }: { palette: Palette }) {
  return <g className="wildflower-head">{Array.from({ length: 5 }, (_, index) => <ellipse key={index} cx="0" cy="-10" rx="6" ry="13" fill={index % 2 ? palette.highlight : palette.secondary} transform={`rotate(${index * 72})`} opacity=".88" />)}<circle r="4" fill={palette.gold} /></g>;
}

function FlowerHead({ type, palette }: { type: FlowerType; palette: Palette }) {
  if (type === "rose") return <PetalRose palette={palette} />;
  if (type === "tulip") return <PetalTulip palette={palette} />;
  if (type === "cherry") return <PetalCherry palette={palette} />;
  if (type === "daisy") return <PetalDaisy palette={palette} />;
  if (type === "sunflower") return <PetalSunflower palette={palette} />;
  if (type === "hibiscus") return <PetalHibiscus palette={palette} />;
  if (type === "lavender") return <PetalLavender palette={palette} />;
  if (type === "carnation") return <PetalCarnation palette={palette} />;
  return <PetalWildflower palette={palette} />;
}

function BouquetArtwork({ model, activeFlower, onFlower, growthProgress }: { model: BouquetModel; activeFlower: string | null; onFlower: (flower: BouquetFlower, event: MouseEvent<SVGGElement>) => void; growthProgress: number }) {
  const palette = model.palette;
  return <svg className="bouquet-svg" viewBox="0 0 500 600" role="img" aria-label={`A code-built personalized bouquet for ${model.name}`}>
    <defs>
      <linearGradient id="stemGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={palette.leafLight} /><stop offset=".5" stopColor={palette.leaf} /><stop offset="1" stopColor="#1e342b" /></linearGradient>
      <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={palette.leafLight} /><stop offset=".5" stopColor={palette.leaf} /><stop offset="1" stopColor="#233b30" /></linearGradient>
      <radialGradient id="petalMain" cx="28%" cy="18%"><stop offset="0" stopColor={palette.highlight} /><stop offset=".4" stopColor={palette.secondary} /><stop offset="1" stopColor={palette.petal} /></radialGradient>
      <radialGradient id="petalSoft" cx="30%" cy="15%"><stop offset="0" stopColor={palette.highlight} /><stop offset=".5" stopColor={palette.secondary} /><stop offset="1" stopColor={palette.petal} /></radialGradient>
      <radialGradient id="petalInner"><stop offset="0" stopColor={palette.secondary} /><stop offset="1" stopColor={palette.deep} /></radialGradient>
      <radialGradient id="roseInner"><stop offset="0" stopColor={palette.secondary} /><stop offset="1" stopColor={palette.deep} /></radialGradient>
      <radialGradient id="roseCore"><stop offset="0" stopColor={palette.highlight} /><stop offset=".65" stopColor={palette.petal} /><stop offset="1" stopColor={palette.deep} /></radialGradient>
      <filter id="flowerShadow" x="-45%" y="-45%" width="190%" height="190%"><feDropShadow dx="0" dy="9" stdDeviation="7" floodColor="#000" floodOpacity=".45" /></filter>
    </defs>
    <g className="stems" aria-hidden="true">{model.flowers.map((flower, index) => <path key={`stem-${flower.id}`} d={`M250 560 C${250 + flower.bend} 488, ${flower.x + flower.bend / 2} ${flower.y + 110}, ${flower.x} ${flower.y + 26}`} stroke="url(#stemGradient)" strokeWidth={flower.role === "hero" ? 6 : 3.4 + (index % 3)} fill="none" className="stem-line" style={{ "--stem-delay": `${flower.delay}s` } as CSSProperties} />)}</g>
    <g className="leaves" aria-hidden="true">{model.leaves.map((leaf, index) => <g key={`leaf-${index}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.scale})`} className="leaf-shape"><path d="M0 0C-43-3-58-28-48-48C-23-45-3-29 0 0Z" fill="url(#leafGradient)" stroke={palette.leafLight} strokeOpacity=".34" strokeWidth="1.4" /><path d="M-3-3C-22-14-37-26-46-42" stroke={palette.leafLight} strokeOpacity=".42" strokeWidth="1.4" fill="none" strokeLinecap="round" /></g>)}</g>
    <g className={`bouquet-ribbon ${growthProgress > .76 ? "is-ready" : ""}`} aria-hidden="true"><path d="M193 511C216 527 233 531 251 532c19-1 38-6 57-22l-8 44c-23 12-45 15-62 14-21 0-42-5-61-15Z" fill={palette.petal} /><path d="M215 535c-12 23-17 38-12 54 16-7 30-21 39-43Z" fill={palette.deep} /><path d="M284 535c12 23 17 38 12 54-16-7-30-21-39-43Z" fill={palette.deep} opacity=".8" /><path d="M212 523c20 8 49 10 77 0" stroke={palette.gold} strokeOpacity=".7" strokeWidth="2" fill="none" /><circle cx="251" cy="530" r="13" fill={palette.secondary} opacity=".9" /></g>
    {model.flowers.map((flower) => <g key={flower.id} transform={`translate(${flower.x} ${flower.y}) rotate(${flower.rotation}) scale(${flower.scale})`}><g className={`flower flower-${flower.type} ${activeFlower === flower.id ? "is-active" : ""}`} style={{ "--bloom-delay": `${flower.delay}s`, "--bloom-progress": growthProgress } as CSSProperties} role="button" tabIndex={0} aria-label={`Tap the ${FLOWER_META[flower.type].label}`} onClick={(event) => onFlower(flower, event)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onFlower(flower, event as unknown as MouseEvent<SVGGElement>); } }}><title>{FLOWER_META[flower.type].label}</title><FlowerHead type={flower.type} palette={palette} /></g></g>)}
  </svg>;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>(() => previewView === "intro" || previewView === "growing" || previewView === "bouquet" || previewView === "final" ? previewView : "opening");
  const [name, setName] = useState(sharedName);
  const [model, setModel] = useState<BouquetModel | null>(sharedName ? createBouquet(sharedName, sharedVariationId) : previewView && previewView !== "intro" ? createBouquet("best friend") : null);
  const [growthProgress, setGrowthProgress] = useState(previewView === "bouquet" || previewView === "final" ? 1 : previewView === "growing" ? .52 : 0);
  const [activeFlower, setActiveFlower] = useState<string | null>(null);
  const [burst, setBurst] = useState<Burst>(null);
  const [error, setError] = useState("");
  const [shareState, setShareState] = useState("");
  const [qrOpen, setQrOpen] = useState(urlParams?.get("qr") === "1");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrError, setQrError] = useState("");
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage !== "opening") return;
    const timer = window.setTimeout(() => setStage(model ? "growing" : "intro"), 4400);
    return () => window.clearTimeout(timer);
  }, [stage, model]);

  useEffect(() => {
    if (stage !== "growing" || !model) return;
    const start = performance.now();
    const duration = 6600;
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / duration);
      setGrowthProgress(progress);
      if (progress >= 1) {
        window.clearInterval(timer);
        window.setTimeout(() => setStage("bouquet"), 360);
      }
    }, 48);
    return () => window.clearInterval(timer);
  }, [stage, model]);

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setBurst(null), 1050);
    return () => window.clearTimeout(timer);
  }, [burst]);

  const growthLabel = growthProgress < .18 ? "Growing something" : growthProgress < .34 ? "Letting the stems find their shape" : growthProgress < .53 ? "Unfolding a few leaves" : growthProgress < .74 ? "Choosing the flowers" : growthProgress < .9 ? "Adding a little ribbon" : "Letting it settle";
  const selectedMessage = model?.flowers.find((flower) => flower.id === activeFlower);
  const gardenTypes = useMemo(() => model ? flowerList(model) : [], [model]);

  function startGrowth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeName(name);
    if (!normalized) {
      setError("Give me a name to grow this for.");
      return;
    }
    setError("");
    const nextModel = createFreshBouquet(normalized);
    setName(normalized);
    setModel(nextModel);
    setActiveFlower(null);
    setGrowthProgress(0);
    setStage("growing");
    const url = new URL(window.location.href);
    url.searchParams.set("name", normalized);
    url.searchParams.set("v", String(nextModel.variationId));
    window.history.replaceState({}, "", url);
  }

  function handleFlower(flower: BouquetFlower, event: MouseEvent<SVGGElement>) {
    setActiveFlower(flower.id);
    const rect = event.currentTarget.getBoundingClientRect();
    const stageRect = artRef.current?.getBoundingClientRect();
    if (stageRect) setBurst({ id: Date.now(), x: rect.left - stageRect.left + rect.width / 2, y: rect.top - stageRect.top + rect.height / 2 });
  }

  function getGardenUrl() {
    if (!model) return "";
    const url = new URL(window.location.href);
    url.searchParams.set("name", model.name);
    url.searchParams.set("v", String(model.variationId));
    url.searchParams.delete("view");
    url.searchParams.delete("qr");
    return url.toString();
  }

  function showShareState(message: string) {
    setShareState(message);
    window.setTimeout(() => setShareState(""), 2600);
  }

  async function shareGarden() {
    if (!model) return;
    const gardenUrl = getGardenUrl();
    const shareData = { title: `${model.name}'s little garden`, text: `A small digital bouquet grown just for ${model.name}.`, url: gardenUrl };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(gardenUrl);
        showShareState("Link copied");
      }
    } catch { showShareState("The garden is still yours to keep"); }
  }

  function shareOnWhatsApp() {
    if (!model) return;
    const gardenUrl = getGardenUrl();
    const message = `A small digital garden made for ${model.name}: ${gardenUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    showShareState("WhatsApp is ready to share");
  }

  async function shareOnInstagram() {
    if (!model) return;
    const gardenUrl = getGardenUrl();
    try {
      await navigator.clipboard.writeText(gardenUrl);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      showShareState("Link copied — paste it into Instagram");
    } catch {
      showShareState("Copy the link and paste it into Instagram");
    }
  }

  async function copyGardenLink() {
    const gardenUrl = getGardenUrl();
    if (!gardenUrl) return;
    try {
      await navigator.clipboard.writeText(gardenUrl);
      showShareState("Link copied");
    } catch {
      showShareState("Your garden link is ready to share");
    }
  }

  async function generateGardenQr() {
    const gardenUrl = getGardenUrl();
    if (!gardenUrl) return;
    setQrOpen(true);
    setQrError("");
    setQrDataUrl("");
    try {
      const dataUrl = await QRCode.toDataURL(gardenUrl, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 420,
        color: { dark: "#321321", light: "#fff7ef" },
      });
      setQrDataUrl(dataUrl);
    } catch {
      setQrError("I couldn’t make the QR code this time. Please use Copy link instead.");
    }
  }

  function downloadGardenQr() {
    if (!qrDataUrl || !model) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${model.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "garden"}-bouquet-qr.png`;
    link.click();
  }

  useEffect(() => {
    if (qrOpen && model && !qrDataUrl && !qrError) void generateGardenQr();
  }, [qrOpen, model, qrDataUrl, qrError]);

  function growAnother() {
    setStage("intro");
    setName("");
    setModel(null);
    setActiveFlower(null);
    setGrowthProgress(0);
    const url = new URL(window.location.href);
    url.searchParams.delete("name");
    url.searchParams.delete("v");
    window.history.replaceState({}, "", url);
  }

  const rootStyle = model ? { "--atmosphere": model.palette.atmosphere, "--palette-petal": model.palette.petal, "--palette-deep": model.palette.deep, "--palette-gold": model.palette.gold } as CSSProperties : undefined;

  return <div className={`experience stage-${stage}`} style={rootStyle}>
    <section className={`opening-scene ${stage !== "opening" ? "is-leaving" : ""}`} aria-hidden={stage !== "opening"}><div className="opening-glow opening-glow-one" /><div className="opening-glow opening-glow-two" /><div className="love-note-field">{Array.from({ length: 220 }, (_, index) => { const seed = index + 1; const x = (seed * 47.17) % 100; const y = (seed * 31.61 + (seed % 7) * 4) % 100; const rotation = ((seed * 29) % 34) - 17; const size = 9 + (seed % 5) * 1.8; return <span key={index} className="love-note" style={{ "--note-x": `${x}%`, "--note-y": `${y}%`, "--note-rotation": `${rotation}deg`, "--note-size": `${size}px`, "--note-opacity": .2 + (seed % 6) * .055, "--note-duration": `${6.5 + (seed % 8) * .65}s`, "--note-delay": `${-((seed * 1.37) % 8)}s` } as CSSProperties}>I love you <b>♥</b></span>; })}</div><div className="opening-caption"><span className="opening-caption-line" /><span>for the one who makes the world softer</span></div></section>

    {stage === "intro" && <main className="intro-screen"><div className="scene-topline"><div className="brand-lockup"><img src={STORAGE_LOGO} alt="" className="brand-mark" /><span className="brand-wordmark">the love bouquet</span></div><span className="scene-index">01 / 03</span></div><div className="intro-layout"><div className="intro-copy-block"><p className="eyebrow">a small digital gift, made by Jainam</p><h1>A little something,<br /><em>made just for you.</em></h1><p className="intro-subtitle">A small gift from Jainam to you.</p><p className="intro-instruction">Tell me your name and I’ll grow something special.</p><form className="name-form" onSubmit={startGrowth}><label htmlFor="gift-name">What should I call you? <span>✦</span></label><input id="gift-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="given-name" autoFocus /><button type="submit">Grow My Garden <span>✿</span></button>{error && <p className="form-error" role="alert">{error}</p>}</form><div className="intro-thread"><span /> made by Jainam, one line at a time <span /></div></div><div className="intro-botanical" aria-hidden="true"><div className="intro-orbit" /><div className="intro-stem stem-a" /><div className="intro-stem stem-b" /><div className="intro-bloom bloom-a">✿</div><div className="intro-bloom bloom-b">❀</div><div className="intro-bloom bloom-c">✦</div><div className="intro-spark">✦</div></div></div></main>}

    {(stage === "growing" || stage === "bouquet") && model && <main className="garden-screen"><div className="scene-topline"><div className="brand-lockup"><img src={STORAGE_LOGO} alt="" className="brand-mark" /><span className="brand-wordmark">the love bouquet</span></div><span className="scene-index">02 / 03</span></div><div className="garden-layout"><header className="garden-intro"><p className="eyebrow">{stage === "growing" ? "a garden is taking shape" : "a garden written for you"}</p><h1>{stage === "growing" ? <>Growing something<br /><em>for {model.name}…</em></> : <>This one is yours,<br /><em>{model.name}. ♥</em></>}</h1><p className="garden-lede">{stage === "growing" ? growthLabel : personalityLine(model)}</p><div className="code-signature"><span className="code-dot" /> {model.styleName.toLowerCase()} / {model.palette.name.toLowerCase()} / {model.flowers.length} blooms</div></header><div className={`bouquet-column ${stage === "growing" ? "is-growing" : "is-finished"}`}><div className="bouquet-figure" ref={artRef}><div className="bloom-dust dust-one" /><div className="bloom-dust dust-two" /><div className="bloom-dust dust-three" /><div className="petal-fall" aria-hidden="true"><span>✦</span><span>·</span><span>✦</span></div><BouquetArtwork model={model} activeFlower={activeFlower} onFlower={handleFlower} growthProgress={growthProgress} />{burst && <div className="heart-burst" key={burst.id} style={{ left: burst.x, top: burst.y }} aria-hidden="true"><span>♥</span><span>♥</span><span>♥</span><span>✦</span></div>}</div>{stage === "growing" ? <div className="growth-status"><span className="growth-status-line" /><span>{Math.round(growthProgress * 100)}% grown</span></div> : <p className="tap-hint"><span className="tap-line" /> tap a flower to hear what it holds</p>}</div><section className="garden-rail" aria-live="polite">{stage === "growing" ? <div className="growth-card"><span className="message-kicker">{growthLabel}</span><div className="growth-bar"><span style={{ width: `${growthProgress * 100}%` }} /></div><p>Every stem, leaf, and petal is finding its place.</p></div> : <>{selectedMessage && <div className="flower-message is-shown"><span className="message-kicker">a little response from the garden</span><p>{FLOWER_META[selectedMessage.type].interaction}</p></div>}<div className="garden-note"><span className="message-kicker">a note from Jainam</span><p>{generatePersonalNote(model)}</p></div></>} </section></div>{stage === "bouquet" && <section className="garden-card"><div><span className="message-kicker">a little garden for</span><h2>{model.name}</h2><p>Made by Jainam, with a few lines of code and a bit too much time spent choosing the flowers.</p></div><div className="chosen-flowers"><span className="message-kicker">flowers chosen for you</span><div>{gardenTypes.map((flower) => <span key={flower.label}><b>{flower.symbol}</b>{flower.label}</span>)}</div></div></section>}<div className="garden-actions">{stage === "bouquet" && <button className="final-invite" type="button" onClick={() => setStage("final")}><span>One more thing</span><span className="invite-heart">♥</span></button>}</div><footer className="scene-footer"><span>hand-grown in code</span><span className="footer-thread" /><span>with a little bit of heart</span></footer></main>}

    {stage === "final" && model && <main className="final-screen"><div className="final-letter-backdrop" /><svg className="final-memory-bouquet" viewBox="0 0 420 520" aria-hidden="true"><path d="M210 510C207 420 206 335 210 118M210 510C175 421 122 352 74 260M211 510C244 416 295 334 350 227M210 510C194 422 166 351 152 191M212 510C240 430 278 385 304 290" fill="none" stroke="var(--palette-leaf, #52745c)" strokeWidth="4" strokeLinecap="round" /><path d="M141 380C103 372 78 346 80 323C110 326 134 343 141 380ZM280 391C320 383 345 359 344 336C313 339 290 355 280 391ZM171 307C139 294 124 270 132 251C157 258 174 276 171 307ZM253 280C288 267 302 244 294 226C268 233 253 250 253 280Z" fill="var(--palette-leaf, #52745c)" opacity=".65" /><g fill="var(--palette-petal, #d56a82)" opacity=".72"><path d="M210 134C184 121 181 93 198 80C207 73 215 86 216 101C221 84 235 76 245 88C258 105 240 127 210 134Z" /><path d="M92 270C69 258 69 237 84 228C93 223 98 233 99 245C104 232 115 228 122 238C132 253 115 267 92 270Z" /><path d="M345 237C322 225 322 204 337 195C346 190 351 200 352 212C357 199 368 195 375 205C385 220 368 234 345 237Z" /></g><path d="M166 466C191 481 231 484 255 467" fill="none" stroke="var(--palette-gold, #d6a46d)" strokeWidth="2" opacity=".75" /></svg><div className="final-letter-inner"><span className="eyebrow">03 / 03 · one more thing</span><div className="final-rule" /><p className="final-copy">It’s only a small digital bouquet, but I wanted to make something that couldn’t simply be bought from a shop.</p><p className="final-copy">So I grew this one in code — just for you.</p><p className="final-copy final-copy-soft">From Jainam,<br />with a little bit of code. <span className="tiny-heart">♥</span></p><div className="final-heart">✿</div><div className="final-actions"><button className="share-button primary-share" type="button" onClick={shareGarden}>Share this garden <span>♥</span></button><button className="social-button whatsapp-share" type="button" onClick={shareOnWhatsApp} aria-label="Share this bouquet on WhatsApp"><span>↗</span> WhatsApp</button><button className="social-button instagram-share" type="button" onClick={shareOnInstagram} aria-label="Share this bouquet on Instagram"><span>◎</span> Instagram</button><button className="social-button copy-link" type="button" onClick={copyGardenLink}>Copy link</button><button className="social-button qr-button" type="button" onClick={generateGardenQr}><span>▦</span> QR code</button><button className="return-button" type="button" onClick={growAnother}>Grow another bouquet <span>✦</span></button></div>{shareState && <p className="share-state" role="status">{shareState}</p>}</div>{qrOpen && <div className="qr-overlay" role="dialog" aria-modal="true" aria-labelledby="qr-title"><div className="qr-card"><button className="qr-close" type="button" aria-label="Close QR code" onClick={() => setQrOpen(false)}>×</button><span className="message-kicker">scan this garden</span><h2 id="qr-title">{model.name}’s bouquet</h2>{qrDataUrl ? <img className="qr-image" src={qrDataUrl} alt={`QR code for ${model.name}'s bouquet`} /> : qrError ? <p className="qr-error">{qrError}</p> : <p className="qr-loading">Making your QR code…</p>}<p className="qr-caption">This code opens the exact bouquet, including its unique variation.</p><div className="qr-card-actions">{qrDataUrl && <button className="qr-action" type="button" onClick={downloadGardenQr}>Download QR</button>}<button className="qr-action qr-action-muted" type="button" onClick={() => setQrOpen(false)}>Close</button></div></div></div>}</main>}
  </div>;
}

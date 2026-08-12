# Digital Love Bouquet — Design Direction

## Three Possible Approaches

### Theme Name: Midnight Conservatory
**Very Brief Intro:** A cinematic, low-key digital greenhouse where a coded bouquet blooms from a field of whispered love notes. The mood is intimate, grown-up, and quietly magical.

**Probability:** 0.07

### Theme Name: Rose-Paper Keepsake
**Very Brief Intro:** A tactile editorial gift inspired by handwritten stationery, pressed petals, vellum overlays, and a ribbon-bound letter. The experience feels like opening a treasured box of memories.

**Probability:** 0.04

### Theme Name: Starlit Love Letter
**Very Brief Intro:** A soft celestial night scene where the bouquet grows among constellations, handwritten annotations, and warm candlelit glints. The emotional tone is dreamy and expansive without becoming childish.

**Probability:** 0.09

## Chosen Direction: Midnight Conservatory

### Design Movement
Contemporary romanticism with references to nocturnal botanical illustration, cinematic title sequences, and luxury editorial packaging. The page should feel like a private art installation rather than a conventional landing page.

### Core Principles
1. **Intimacy over spectacle:** Every effect should feel close, soft, and deliberate; nothing should shout for attention.
2. **Botanical craft over stock imagery:** The bouquet is rendered as layered code-built SVG forms, with visible depth, imperfect asymmetry, and individual timing.
3. **Darkness as a frame:** Burgundy-black space gives the flowers and warm typography room to glow without turning the experience into a generic neon interface.
4. **Progressive reveal:** The story moves from thousands of tiny declarations to stems, leaves, flowers, words, and finally one private message.

### Color Philosophy
The palette begins in almost-black wine (`#160b12`) and deepens through plum and burgundy so the opening feels like a velvet-lined box. Rose pink and blush coral are reserved for living elements—the petals, hearts, and interactive responses—while warm ivory carries the message text. A restrained antique-gold accent marks moments of completion, like a thread catching candlelight. The ownable signature color is **Velvet Rose `#d56a82`**: tender, mature, and luminous against the dark field.

### Layout Paradigm
The experience uses a vertical cinematic stage rather than a navbar or a collection of cards. The opening is full-bleed and centered only as an atmosphere; the bouquet scene is composed with a gentle off-center editorial balance between the code-made flowers and the message rail; the final reveal narrows into a letter-like reading measure. Content enters in layers, so the user feels they are moving through scenes rather than scrolling through sections.

### Signature Elements
1. A dense but calm **“I love you 💗” universe** that slowly converges into particles.
2. A **code-bloom bouquet** made from layered SVG petals, stems, leaves, highlights, and a ribbon, with each flower reacting differently to touch.
3. A recurring **gold thread line** that starts as a tiny loading mark, becomes the bouquet’s ribbon, and later underlines the final message.

### Interaction Philosophy
Touch is treated as a gentle brush across a living arrangement. Flowers respond with a small lift, a breath of glow, a few particles, and a short line of affection. The primary action is never a loud button; it is an invitation that appears only when the scene has finished speaking. Every interaction has a clear purpose and remains optional.

### Animation
Animations use opacity, transform, and filter only where possible, with cubic-bezier easing that feels like silk settling. The opening declarations drift at three depth speeds and fade on offset schedules. The bouquet builds in a deliberate sequence: dust, stems, leaves, buds, petals, ribbon. Flowers sway by a few degrees in a slow shared breeze, with per-flower phase offsets to avoid mechanical repetition. Click responses last under 900ms and combine a lift, a soft bloom, and a small heart ascent. The final scene dims the bouquet rather than hiding it, preserving the physical memory of what was made. All non-essential motion respects `prefers-reduced-motion`.

### Typography System
Use **Cormorant Garamond** for the emotional display voice—high-contrast, romantic, and literary—and **DM Sans** for small labels, controls, and supporting copy. Headlines use generous line height and occasional italic emphasis. Body copy stays at a readable 17–19px on mobile with an 1.7 line height. Uppercase metadata is small, tracked, and quiet; it should feel like a museum caption, never a dashboard label.

### Brand Essence
**A private digital bouquet for someone you love, written into existence one line at a time—more personal than a template and more lasting than a single day.**

Personality adjectives: **tender, cinematic, handcrafted**.

### Brand Voice
Headlines are intimate and poetic without becoming ornate. CTAs sound like a private invitation, not a conversion prompt. Microcopy is specific, warm, and concise; it avoids generic phrases such as “Welcome to our website” or “Get started today.”

Example lines:

> “Some flowers are grown. These were written.”

> “There is one more thing I made for you.”

### Wordmark & Logo
The mark is a small abstract **rose-bracket glyph**: two opposing curved stems enclosing a four-petal heart, suggesting both a flower and a pair of code braces. It appears as a bold, text-free symbol in the opening corner and as the favicon. The wordmark is set in Cormorant Garamond italic with a custom rose-bracket symbol replacing the first letter’s flourish; it is never presented as a default sans-serif brand name.

### Signature Brand Color
**Velvet Rose — `#d56a82`**. It is used sparingly for the mark, active flower highlights, the final heart, and the most important invitation so the color remains recognizably ownable.

## Style Decisions

- The bouquet itself must remain code-generated, not a stock or AI-rendered bouquet image.
- Generated visual assets, if used, are limited to a subtle atmospheric texture and the transparent rose-bracket mark; they must support the code-made bouquet rather than replace it.
- No normal website navbar, no testimonial-style content, no excessive rounded cards, and no generic gradient hero treatment.
- The primary viewport and interaction model are mobile portrait first, with desktop treated as a wider stage.
- The bouquet avoids emoji-like heart-flower simplicity by using layered procedural petals, varied silhouettes, asymmetrical leaves, and curved stems; the heart language is reserved for tiny accents and interaction feedback.
- The final scene is a true culmination: the bouquet dims into a remembered object while a centered private letter takes over, connected by a ceremonial gold thread.
- The brand lockup uses the rose-bracket glyph with a Cormorant Garamond italic wordmark treatment; uppercase sans text remains metadata only.

/*
 * Generates on-brand PLACEHOLDER images for every slot the site references.
 * These are labelled fillers at correct dimensions/aspect ratios, styled to the
 * site tokens (ink #0A0A0A, accent #FF4925), so the layout reads correctly until
 * real assets are dropped in. Run from the project root: node gen-placeholders.js
 * Uses only relative paths to avoid Windows path-escaping issues.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "public", "images");
const PAPER = "#FFFFFF";
const ACCENT = "#FF4925";
const MUTED = "#6b6b6b";
const LINE = "#262626";
const INK = "#0A0A0A";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// A framed dark card: label + dimensions, accent corner ticks, faint watermark.
function card({ w, h, label, kind }) {
  const min = Math.min(w, h);
  const pad = Math.round(min * 0.05) + 8;
  const labelSize = Math.max(13, Math.round(min * (w > 900 ? 0.045 : 0.07)));
  const dimSize = Math.max(11, Math.round(labelSize * 0.5));
  const markSize = Math.round(min * 0.9);
  const cx = w / 2;
  const cy = h / 2;

  const bg =
    kind === "bg"
      ? `<radialGradient id="g" cx="50%" cy="42%" r="70%">
           <stop offset="0%" stop-color="#1a0f0d"/>
           <stop offset="55%" stop-color="${INK}"/>
           <stop offset="100%" stop-color="#050505"/>
         </radialGradient>`
      : `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stop-color="#141414"/>
           <stop offset="100%" stop-color="${INK}"/>
         </linearGradient>`;

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>${bg}</defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
      <text x="${cx}" y="${cy + markSize * 0.16}" font-family="Arial, sans-serif" font-weight="700"
            font-size="${markSize}" fill="#ffffff" fill-opacity="0.03" text-anchor="middle">ECHO</text>
      <rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}"
            fill="none" stroke="${LINE}" stroke-width="1"/>
      <rect x="${pad}" y="${pad}" width="${Math.round(min * 0.12)}" height="2" fill="${ACCENT}"/>
      <rect x="${pad}" y="${pad}" width="2" height="${Math.round(min * 0.12)}" fill="${ACCENT}"/>
      <text x="${cx}" y="${cy - dimSize}" font-family="Arial, sans-serif" font-weight="700"
            font-size="${labelSize}" fill="${PAPER}" text-anchor="middle" letter-spacing="1">${esc(label)}</text>
      <text x="${cx}" y="${cy + labelSize * 0.9}" font-family="Arial, sans-serif" font-weight="400"
            font-size="${dimSize}" fill="${ACCENT}" text-anchor="middle" letter-spacing="2">${w} × ${h}</text>
      <text x="${cx}" y="${h - pad - 4}" font-family="Arial, sans-serif" font-weight="400"
            font-size="${Math.max(9, Math.round(dimSize * 0.8))}" fill="${MUTED}" text-anchor="middle"
            letter-spacing="3">PLACEHOLDER</text>
    </svg>`,
  );
}

// Transparent logo pill for the client-logo strip.
function logo({ w, h, label }) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${h / 2}"
            fill="none" stroke="${MUTED}" stroke-opacity="0.6" stroke-width="1"/>
      <circle cx="${h / 2 + 6}" cy="${h / 2}" r="${h * 0.22}" fill="${MUTED}"/>
      <text x="${(w + h) / 2}" y="${h / 2 + h * 0.16}" font-family="Arial, sans-serif"
            font-weight="700" font-size="${Math.round(h * 0.42)}" fill="#cfcfcf"
            text-anchor="middle" letter-spacing="1">${esc(label)}</text>
    </svg>`,
  );
}

const jobs = [
  { file: "hero-poster.jpg", w: 1920, h: 1080, label: "HERO BACKDROP", kind: "bg" },
  { file: "why-us.jpg", w: 1920, h: 1080, label: "WHY-US BACKGROUND", kind: "bg" },
  { file: "faq-bg.jpg", w: 1920, h: 1080, label: "FAQ BACKGROUND", kind: "bg" },
  { file: "cta-bg.jpg", w: 1920, h: 1080, label: "CTA BACKGROUND", kind: "bg" },
  { file: "work-1.jpg", w: 1604, h: 1340, label: "WORK 01", kind: "content" },
  { file: "work-2.jpg", w: 1604, h: 1340, label: "WORK 02", kind: "content" },
  { file: "work-3.jpg", w: 1604, h: 1340, label: "WORK 03", kind: "content" },
  { file: "service-1.jpg", w: 1200, h: 900, label: "SERVICE 01", kind: "content" },
  { file: "service-2.jpg", w: 1200, h: 900, label: "SERVICE 02", kind: "content" },
  { file: "service-3.jpg", w: 1200, h: 900, label: "SERVICE 03", kind: "content" },
  { file: "service-4.jpg", w: 1200, h: 900, label: "SERVICE 04", kind: "content" },
  { file: "post-1.jpg", w: 1200, h: 900, label: "BLOG POST 01", kind: "content" },
  { file: "post-2.jpg", w: 1200, h: 900, label: "BLOG POST 02", kind: "content" },
  { file: "post-3.jpg", w: 1200, h: 900, label: "BLOG POST 03", kind: "content" },
  { file: "testimonial-highlight.jpg", w: 1000, h: 1200, label: "TESTIMONIAL", kind: "content" },
  { file: "avatar-featured.jpg", w: 400, h: 400, label: "AVATAR", kind: "content" },
  { file: "avatar-1.jpg", w: 400, h: 400, label: "AVATAR 1", kind: "content" },
  { file: "avatar-2.jpg", w: 400, h: 400, label: "AVATAR 2", kind: "content" },
  { file: "avatar-3.jpg", w: 400, h: 400, label: "AVATAR 3", kind: "content" },
  { file: "avatar-4.jpg", w: 400, h: 400, label: "AVATAR 4", kind: "content" },
];

const logos = [
  { file: "logo-1.png", w: 232, h: 64, label: "LOGO 1" },
  { file: "logo-2.png", w: 284, h: 64, label: "LOGO 2" },
  { file: "logo-3.png", w: 284, h: 64, label: "LOGO 3" },
  { file: "logo-4.png", w: 296, h: 64, label: "LOGO 4" },
  { file: "logo-5.png", w: 220, h: 64, label: "LOGO 5" },
];

(async () => {
  fs.mkdirSync(path.join(OUT, "logos"), { recursive: true });
  let n = 0;
  for (const j of jobs) {
    await sharp(card(j))
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT, j.file));
    n++;
  }
  for (const l of logos) {
    await sharp(logo(l)).png().toFile(path.join(OUT, "logos", l.file));
    n++;
  }
  console.log("generated", n, "images into", OUT);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { JetBrains_Mono } from "next/font/google";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bug as BugIcon,
  Crosshair,
  Flame,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useSound } from "@/components/layout/SoundProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn, pad } from "@/lib/utils";

// The game sits at the very bottom of the home page, so its font is not preloaded.
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", preload: false });

type Status = "idle" | "running" | "paused" | "over";
type Kind = "bug" | "heisen" | "legacy";
type Control = "up" | "down" | "left" | "right" | "fire";
type Pressed = Record<Control, boolean>;
type Hud = { score: number; mult: number; wave: number; lives: number };

type Bug = { kind: Kind; x: number; y: number; speed: number; hp: number; label: string; phase: number; flash: number; dead?: boolean };
type Shot = { x: number; px: number; y: number; dead?: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: string };
type Ring = { x: number; y: number; r: number; life: number; color: string };
type Popup = { x: number; y: number; text: string; life: number; color: string; big?: boolean };
type Sprite = { img: HTMLCanvasElement; w: number; h: number; bw: number; bh: number };

const STAGES = ["build", "review", "test", "prod"];
const COLS = [3, 3, 3, 1.8];
const UNITS = COLS.reduce((a, b) => a + b, 0);
const PROD_FRACTION = COLS[3] / UNITS;
const HI_KEY = "bughunt-best";
const LIVES = 3;
const FIRE_INTERVAL = 0.11;
const SHOT_SPEED = 860;
const WAVE_SECONDS = 18;
const COMBO_WINDOW = 1.6;
const LABEL_BAND = 34; // px at the top of the field reserved for the stage labels
const RESTART_LOCK = 700; // ms after a game over before space can restart (it may still be held)

const ACCENT = "#34d399";
const ACCENT_RGB = "52 211 153";
const DANGER_RGB = "244 63 94";

// Classic two-frame invaders. 1 = body.
const INVADER = [
  ["00100000100", "00010001000", "00111111100", "01101110110", "11111111111", "10111111101", "10100000101", "00011011000"],
  ["00100000100", "10010001001", "10111111101", "11101110111", "11111111111", "01111111110", "00100000100", "01000000010"],
];
const SQUID = [
  ["00011000", "00111100", "01111110", "11011011", "11111111", "00100100", "01011010", "10100101"],
  ["00011000", "00111100", "01111110", "11011011", "11111111", "01011010", "10000001", "01000010"],
];
const OCTOPUS = [
  ["000011110000", "011111111110", "111111111111", "111001100111", "111111111111", "000110011000", "001101101100", "110000000011"],
  ["000011110000", "011111111110", "111111111111", "111001100111", "111111111111", "001110011100", "011001100110", "001100001100"],
];
// Faces left. 1 = hull, 2 = wing lights, 3 = cockpit.
const SHIP = [
  "0000000002220",
  "0000000111100",
  "0000011111000",
  "0011111331110",
  "1111111331111",
  "0011111331110",
  "0000011111000",
  "0000000111100",
  "0000000002220",
];
const SHIP_COLORS: Record<string, string> = { "1": "#e5e7eb", "2": ACCENT, "3": "#059669" };

const KINDS: Record<Kind, { frames: string[][]; rgb: string; hp: number; speed: number; points: number; labels: string[] }> = {
  bug: {
    frames: INVADER,
    rgb: "251 113 133",
    hp: 1,
    speed: 1,
    points: 10,
    labels: ["TypeError", "N+1 query", "stale cache", "off-by-one", "CORS", "null ref"],
  },
  heisen: { frames: SQUID, rgb: "251 191 36", hp: 1, speed: 1.75, points: 25, labels: ["race condition", "flaky test", "heisenbug"] },
  legacy: { frames: OCTOPUS, rgb: "167 139 250", hp: 3, speed: 0.6, points: 40, labels: ["memory leak", "tech debt", "legacy monolith"] },
};

const KEYMAP: Record<string, Control> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  Space: "fire",
};
const NO_KEYS: Pressed = { up: false, down: false, left: false, right: false, fire: false };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/** Pre-renders a pixel bitmap (with its glow) once, so each frame is a cheap drawImage. */
function makeSprite(map: string[], colors: Record<string, string>, px: number, dpr: number, glow: string, blur: number): Sprite {
  const bw = map[0].length * px;
  const bh = map.length * px;
  const padding = blur * 1.5;
  const w = bw + padding * 2;
  const h = bh + padding * 2;
  const img = document.createElement("canvas");
  img.width = Math.ceil(w * dpr);
  img.height = Math.ceil(h * dpr);
  const g = img.getContext("2d")!;
  g.scale(dpr, dpr);
  const paint = () => {
    for (let r = 0; r < map.length; r++)
      for (let c = 0; c < map[r].length; c++) {
        const ch = map[r][c];
        if (ch === "0") continue;
        g.fillStyle = colors[ch];
        g.fillRect(padding + c * px, padding + r * px, px, px);
      }
  };
  g.shadowColor = glow;
  g.shadowBlur = blur;
  paint();
  g.shadowBlur = 0;
  paint();
  return { img, w, h, bw, bh };
}

const hiListeners = new Set<() => void>();
function subscribeHi(cb: () => void) {
  hiListeners.add(cb);
  return () => hiListeners.delete(cb);
}
function readHi() {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0;
  } catch {
    return 0;
  }
}

type Actions = { start: () => void; pause: () => void };

/** "Off the clock": a small shooter — stop bugs before they reach prod. */
export function BugHunt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const actions = useRef<Actions | null>(null);
  const statusRef = useRef<Status>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [hud, setHud] = useState<Hud>({ score: 0, mult: 1, wave: 1, lives: LIVES });
  const [pressed, setPressed] = useState<Pressed>(NO_KEYS);
  const [newBest, setNewBest] = useState(false);
  const best = useSyncExternalStore(subscribeHi, readHi, () => 0);
  const { enabled: soundOn } = useSound();
  const soundRef = useRef(soundOn);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const field = fieldRef.current!;
    const panel = panelRef.current!;
    const ctx = canvas.getContext("2d")!;
    const font = mono.style.fontFamily;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Input is tracked per key (keydown sets, keyup clears) instead of relying on the
    // OS key-repeat, so holding space keeps firing while the arrows are pressed and released.
    const input = { ...NO_KEYS, pointer: false, tx: 0, ty: 0 };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let px = 4;
    let raf = 0;
    let last = 0;
    let clock = 0;
    let visible = true;
    let elapsed = 0;
    let spawnIn = 0;
    let cooldown = 0;
    let score = 0;
    let lives = LIVES;
    let wave = 1;
    let chain = 0;
    let chainTimer = 0;
    let mult = 1;
    let shake = 0;
    let breach = 0;
    let muzzle = 0;
    let banner = 0;
    let overAt = -Infinity;
    const ship = { x: 0, y: 0, vx: 0, vy: 0 };
    let bugs: Bug[] = [];
    let shots: Shot[] = [];
    let particles: Particle[] = [];
    let rings: Ring[] = [];
    let popups: Popup[] = [];
    let dust: { x: number; y: number; v: number; a: number }[] = [];
    let sprites: { ship: Sprite; bugs: Record<Kind, Sprite[]> } | null = null;
    let paint: { base: CanvasGradient; vignette: CanvasGradient; prod: CanvasGradient } | null = null;
    let audio: AudioContext | null = null;
    const labelWidths = new Map<string, number>();

    const setStat = (s: Status) => {
      statusRef.current = s;
      setStatus(s);
    };
    const syncHud = () =>
      setHud((h) => (h.score === score && h.mult === mult && h.wave === wave && h.lives === lives ? h : { score, mult, wave, lives }));

    // ---------------------------------------------------------------- sound
    function sfx(kind: "start" | "hit" | "breach" | "wave" | "over") {
      if (!soundRef.current) return;
      try {
        audio ??= new AudioContext();
        if (audio.state === "suspended") void audio.resume();
        const presets = {
          start: ["sine", 440, 880, 0.14, 0.035],
          hit: ["triangle", 900, 180, 0.09, 0.03],
          breach: ["sawtooth", 170, 48, 0.34, 0.045],
          wave: ["sine", 660, 1320, 0.2, 0.03],
          over: ["square", 220, 55, 0.7, 0.03],
        } as const;
        const [type, from, to, length, volume] = presets[kind];
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        const now = audio.currentTime;
        osc.type = type;
        osc.frequency.setValueAtTime(from, now);
        osc.frequency.exponentialRampToValueAtTime(to, now + length);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
        osc.connect(gain).connect(audio.destination);
        osc.start(now);
        osc.stop(now + length + 0.02);
      } catch {
        /* audio unavailable */
      }
    }

    // ---------------------------------------------------------------- layout
    const prodX = () => W * (1 - PROD_FRACTION);
    const laneCount = () => (H < 300 ? 3 : H < 400 ? 4 : 5);
    const laneY = (i: number) => {
      const top = LABEL_BAND + 6;
      return top + ((i + 0.5) * (H - top - 14)) / laneCount();
    };

    function clampShip() {
      const s = sprites!.ship;
      const minX = prodX() + s.bw / 2 + 8;
      const maxX = W - s.bw / 2 - 10;
      const minY = LABEL_BAND + s.bh / 2;
      const maxY = H - s.bh / 2 - 10;
      const x = minX > maxX ? (prodX() + W) / 2 : clamp(ship.x, minX, maxX);
      const y = clamp(ship.y, minY, maxY);
      if (x !== ship.x) ship.vx = 0;
      if (y !== ship.y) ship.vy = 0;
      ship.x = x;
      ship.y = y;
    }

    function placeShip() {
      ship.x = (prodX() + W) / 2;
      ship.y = laneY(Math.floor(laneCount() / 2));
      ship.vx = ship.vy = 0;
    }

    function buildSprites() {
      const bugSet = (kind: Kind) => {
        const { frames, rgb } = KINDS[kind];
        const color = { "1": `rgb(${rgb})` };
        const glow = `rgb(${rgb} / 0.75)`;
        return [
          makeSprite(frames[0], color, px, dpr, glow, 10),
          makeSprite(frames[1], color, px, dpr, glow, 10),
          makeSprite(frames[0], { "1": "#ffffff" }, px, dpr, "rgb(255 255 255 / 0.9)", 14),
        ];
      };
      sprites = {
        ship: makeSprite(SHIP, SHIP_COLORS, px, dpr, `rgb(${ACCENT_RGB} / 0.55)`, 12),
        bugs: { bug: bugSet("bug"), heisen: bugSet("heisen"), legacy: bugSet("legacy") },
      };
    }

    function buildPaint() {
      const base = ctx.createLinearGradient(0, 0, 0, H);
      base.addColorStop(0, "#0b0f12");
      base.addColorStop(1, "#06080a");
      const vignette = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      vignette.addColorStop(0, "rgb(0 0 0 / 0)");
      vignette.addColorStop(1, "rgb(0 0 0 / 0.55)");
      const prod = ctx.createLinearGradient(prodX(), 0, W, 0);
      prod.addColorStop(0, `rgb(${ACCENT_RGB} / 0.11)`);
      prod.addColorStop(1, `rgb(${ACCENT_RGB} / 0.02)`);
      paint = { base, vignette, prod };
    }

    function resize() {
      const r = field.getBoundingClientRect();
      const oldW = W;
      const oldH = H;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      px = W < 520 ? 3 : 4;
      buildSprites();
      buildPaint();
      dust = Array.from({ length: Math.round(W / 22) }, () => ({
        x: Math.random() * W,
        y: LABEL_BAND + Math.random() * (H - LABEL_BAND),
        v: 6 + Math.random() * 16,
        a: 0.08 + Math.random() * 0.22,
      }));
      if (oldW && oldH) {
        const sx = W / oldW;
        const sy = H / oldH;
        for (const b of bugs) {
          b.x *= sx;
          b.y *= sy;
        }
        for (const s of shots) {
          s.x *= sx;
          s.px *= sx;
          s.y *= sy;
        }
        ship.x *= sx;
        ship.y *= sy;
      } else placeShip();
      if (statusRef.current === "idle") idleScene();
      clampShip();
      draw();
    }

    // ---------------------------------------------------------------- world
    const newBug = (kind: Kind, x: number, y: number, speed: number, label: string, phase: number): Bug => ({
      kind,
      x,
      y,
      speed,
      hp: KINDS[kind].hp,
      label,
      phase,
      flash: 0,
    });

    function idleScene() {
      const n = laneCount();
      bugs = [
        newBug("bug", W * 0.4, laneY(0), 0, "N+1 query", 0),
        newBug("heisen", W * 0.16, laneY(Math.floor(n / 2)), 0, "race condition", 2),
        newBug("legacy", W * 0.66, laneY(n - 1), 0, "memory leak", 4),
      ];
      placeShip();
    }

    function reset() {
      bugs = [];
      shots = [];
      particles = [];
      rings = [];
      popups = [];
      score = 0;
      lives = LIVES;
      wave = 1;
      chain = 0;
      chainTimer = 0;
      mult = 1;
      elapsed = 0;
      spawnIn = 0.6;
      cooldown = 0;
      banner = 1.8;
      placeShip();
      syncHud();
    }

    function burst(x: number, y: number, rgb: string, count: number, speed: number) {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = speed * (0.25 + Math.random() * 0.75);
        particles.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          decay: 1.4 + Math.random() * 1.4,
          size: Math.random() < 0.35 ? px : px * 0.55,
          color: Math.random() < 0.25 ? "rgb(255 255 255)" : `rgb(${rgb})`,
        });
      }
      if (particles.length > 500) particles.splice(0, particles.length - 500);
    }

    function spawn() {
      const roll = Math.random();
      const kind: Kind = wave >= 3 && roll < 0.16 ? "legacy" : wave >= 2 && roll < 0.38 ? "heisen" : "bug";
      const lanes = Array.from({ length: laneCount() }, (_, i) => i).filter(
        (i) => !bugs.some((b) => b.x < 80 && Math.abs(b.y - laneY(i)) < 4),
      );
      if (!lanes.length) {
        spawnIn = 0.2;
        return;
      }
      const k = KINDS[kind];
      const pace = clamp(W / 900, 0.55, 1.15);
      const speed = (46 + (wave - 1) * 10 + Math.random() * 22) * k.speed * pace;
      bugs.push(newBug(kind, -30, laneY(pick(lanes)), speed, pick(k.labels), Math.random() * 6));
      spawnIn = Math.max(0.36, 1.3 - (wave - 1) * 0.11) * (0.7 + Math.random() * 0.6);
    }

    function kill(b: Bug) {
      const { rgb, points } = KINDS[b.kind];
      b.dead = true;
      chain += 1;
      chainTimer = COMBO_WINDOW;
      const nextMult = Math.min(5, 1 + Math.floor(chain / 4));
      if (nextMult > mult) popups.push({ x: b.x, y: b.y - 34, text: `x${nextMult} combo`, life: 1.3, color: ACCENT_RGB, big: true });
      mult = nextMult;
      const pts = points * mult;
      score += pts;
      burst(b.x, b.y, rgb, b.kind === "legacy" ? 30 : 18, b.kind === "legacy" ? 260 : 200);
      rings.push({ x: b.x, y: b.y, r: 6, life: 1, color: rgb });
      popups.push({ x: b.x, y: b.y - 18, text: `+${pts}`, life: 1, color: rgb });
      sfx("hit");
      syncHud();
    }

    function gameOver() {
      overAt = performance.now();
      setStat("over");
      const prev = readHi();
      setNewBest(score > prev);
      if (score > prev) {
        try {
          localStorage.setItem(HI_KEY, String(score));
        } catch {
          /* storage blocked */
        }
        hiListeners.forEach((l) => l());
      }
      sfx("over");
    }

    function step(dt: number) {
      elapsed += dt;

      const nextWave = 1 + Math.floor(elapsed / WAVE_SECONDS);
      if (nextWave !== wave) {
        wave = nextWave;
        banner = 1.8;
        sfx("wave");
        syncHud();
      }

      // Ship: keyboard sets a target velocity; a held pointer steers straight to it.
      const maxV = Math.max(H * 1.55, 260);
      if (input.pointer) {
        ship.vx = clamp((input.tx - ship.x) * 14, -maxV * 1.4, maxV * 1.4);
        ship.vy = clamp((input.ty - ship.y) * 14, -maxV * 1.4, maxV * 1.4);
      } else {
        let ax = Number(input.right) - Number(input.left);
        let ay = Number(input.down) - Number(input.up);
        if (ax && ay) {
          ax *= Math.SQRT1_2;
          ay *= Math.SQRT1_2;
        }
        const k = Math.min(1, dt * 16);
        ship.vx += (ax * maxV - ship.vx) * k;
        ship.vy += (ay * maxV - ship.vy) * k;
      }
      ship.x += ship.vx * dt;
      ship.y += ship.vy * dt;
      clampShip();

      // Fire continuously for as long as space (or the pointer) is held.
      cooldown = Math.max(0, cooldown - dt);
      if ((input.fire || input.pointer) && cooldown === 0) {
        const nose = ship.x - sprites!.ship.bw / 2;
        shots.push({ x: nose, px: nose, y: ship.y });
        cooldown = FIRE_INTERVAL;
        muzzle = 1;
      }

      spawnIn -= dt;
      if (spawnIn <= 0) spawn();

      for (const b of bugs) {
        b.x += b.speed * dt;
        b.flash = Math.max(0, b.flash - dt * 6);
      }
      for (const s of shots) {
        s.px = s.x;
        s.x -= SHOT_SPEED * dt;
      }

      // Swept hit test, so fast shots never tunnel through a bug between frames.
      for (const s of shots) {
        for (const b of bugs) {
          if (b.dead) continue;
          const sp = sprites!.bugs[b.kind][0];
          const hw = sp.bw / 2 + 2;
          if (s.x <= b.x + hw && s.px >= b.x - hw && Math.abs(s.y - b.y) < sp.bh / 2 + 3) {
            s.dead = true;
            b.hp -= 1;
            b.flash = 1;
            burst(s.x, s.y, KINDS[b.kind].rgb, 5, 140);
            if (b.hp <= 0) kill(b);
            break;
          }
        }
      }

      if (chainTimer > 0) {
        chainTimer -= dt;
        if (chainTimer <= 0 && chain) {
          chain = 0;
          mult = 1;
          syncHud();
        }
      }

      const line = prodX();
      for (const b of bugs) {
        if (b.dead || b.x + sprites!.bugs[b.kind][0].bw / 2 < line) continue;
        b.dead = true;
        lives -= 1;
        chain = 0;
        mult = 1;
        shake = 1;
        breach = 1;
        burst(line, b.y, DANGER_RGB, 26, 240);
        rings.push({ x: line, y: b.y, r: 8, life: 1, color: DANGER_RGB });
        popups.push({ x: line - 34, y: b.y - 20, text: `${b.label} shipped`, life: 1.4, color: DANGER_RGB });
        sfx("breach");
        syncHud();
        if (lives <= 0) {
          gameOver();
          break;
        }
      }

      bugs = bugs.filter((b) => !b.dead);
      shots = shots.filter((s) => !s.dead && s.x > -40);
    }

    function stepFx(dt: number) {
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 1 - dt * 2.5;
        p.vy *= 1 - dt * 2.5;
        p.life -= p.decay * dt;
      }
      for (const r of rings) {
        r.r += 150 * dt;
        r.life -= dt * 2.4;
      }
      for (const p of popups) {
        p.y -= 26 * dt;
        p.life -= dt * 1.1;
      }
      for (const d of dust) {
        d.x += d.v * dt;
        if (d.x > W) d.x -= W;
      }
      particles = particles.filter((p) => p.life > 0);
      rings = rings.filter((r) => r.life > 0);
      popups = popups.filter((p) => p.life > 0);
      shake = Math.max(0, shake - dt * 2.8);
      breach = Math.max(0, breach - dt * 2);
      muzzle = Math.max(0, muzzle - dt * 14);
      banner = Math.max(0, banner - dt);
    }

    // ---------------------------------------------------------------- render
    function drawBackdrop() {
      ctx.fillStyle = paint!.base;
      ctx.fillRect(0, 0, W, H);

      // Grid drifts toward prod with the bugs.
      const g = 32;
      const off = (clock * 10) % g;
      ctx.strokeStyle = "rgb(148 163 184 / 0.055)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = off - g; x < W; x += g) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, H);
      }
      for (let y = (H / 2) % g; y < H; y += g) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(W, Math.round(y) + 0.5);
      }
      ctx.stroke();

      for (const d of dust) {
        ctx.fillStyle = `rgb(203 213 225 / ${d.a})`;
        ctx.fillRect(d.x, d.y, 1.5, 1.5);
      }

      // Stage separators.
      const unit = W / UNITS;
      ctx.setLineDash([2, 6]);
      ctx.strokeStyle = "rgb(255 255 255 / 0.09)";
      ctx.beginPath();
      for (const c of [3, 6]) {
        ctx.moveTo(Math.round(c * unit) + 0.5, LABEL_BAND);
        ctx.lineTo(Math.round(c * unit) + 0.5, H);
      }
      ctx.stroke();

      // Lanes: conveyor dashes flowing right.
      ctx.setLineDash([6, 10]);
      ctx.lineDashOffset = -clock * 28;
      ctx.strokeStyle = "rgb(255 255 255 / 0.07)";
      ctx.beginPath();
      for (let i = 0; i < laneCount(); i++) {
        const y = Math.round(laneY(i)) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(prodX() - 6, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      // Prod zone and its shield line.
      const line = Math.round(prodX());
      ctx.fillStyle = paint!.prod;
      ctx.fillRect(line, 0, W - line, H);
      const rgb = breach > 0 ? DANGER_RGB : ACCENT_RGB;
      const pulse = 0.65 + 0.35 * Math.sin(clock * 3);
      ctx.fillStyle = `rgb(${rgb} / ${0.07 + breach * 0.2})`;
      ctx.fillRect(line - 6, 0, 12, H);
      ctx.fillStyle = `rgb(${rgb} / ${0.18 + breach * 0.3})`;
      ctx.fillRect(line - 1.5, 0, 3, H);
      ctx.fillStyle = `rgb(${rgb} / ${0.55 * pulse + breach * 0.45})`;
      ctx.fillRect(line - 0.5, 0, 1, H);
      for (let i = 0; i < laneCount(); i++) {
        const y = laneY(i);
        ctx.fillStyle = `rgb(${rgb} / ${0.35 + 0.4 * pulse})`;
        ctx.fillRect(line - 2, y - 2, 4, 4);
      }
    }

    function drawLabel(b: Bug, sp: Sprite, y: number, alpha: number) {
      const { rgb } = KINDS[b.kind];
      ctx.font = `500 ${W < 700 ? 9 : 10}px ${font}`;
      let tw = labelWidths.get(ctx.font + b.label);
      if (tw === undefined) {
        tw = ctx.measureText(b.label).width;
        labelWidths.set(ctx.font + b.label, tw);
      }
      const right = b.x - sp.bw / 2 - 8;
      const h = W < 700 ? 15 : 17;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(right - tw - 14, y - h / 2, tw + 14, h, h / 2);
      ctx.fillStyle = `rgb(${rgb} / 0.08)`;
      ctx.fill();
      ctx.strokeStyle = `rgb(${rgb} / 0.22)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgb(${rgb} / 0.8)`;
      ctx.fillText(b.label, right - 7, y + 0.5);
      ctx.globalAlpha = 1;
    }

    function drawBugs() {
      const dim = statusRef.current === "over" ? 0.3 : 1;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (const b of bugs) {
        const set = sprites!.bugs[b.kind];
        const frame = Math.floor(clock * (b.speed ? 3 + b.speed / 30 : 2) + b.phase) % 2;
        const sp = b.flash > 0.4 ? set[2] : set[frame];
        const y = b.y + Math.sin(clock * 5 + b.phase) * 1.5;
        if (W >= 480) drawLabel(b, sp, y, 0.9 * dim);
        ctx.globalAlpha = dim;
        ctx.drawImage(sp.img, Math.round(b.x - sp.w / 2), Math.round(y - sp.h / 2), sp.w, sp.h);
        if (KINDS[b.kind].hp > 1) {
          for (let i = 0; i < KINDS[b.kind].hp; i++) {
            ctx.fillStyle = i < b.hp ? `rgb(${KINDS[b.kind].rgb})` : "rgb(255 255 255 / 0.15)";
            ctx.fillRect(Math.round(b.x - 10 + i * 8), Math.round(y - sp.bh / 2 - 8), 5, 2);
          }
        }
        ctx.globalAlpha = 1;
      }
    }

    function drawShots() {
      ctx.globalCompositeOperation = "lighter";
      for (const s of shots) {
        const trail = 28;
        const grad = ctx.createLinearGradient(s.x, 0, s.x + trail, 0);
        grad.addColorStop(0, "rgb(167 243 208 / 1)");
        grad.addColorStop(1, `rgb(${ACCENT_RGB} / 0)`);
        ctx.fillStyle = `rgb(${ACCENT_RGB} / 0.18)`;
        ctx.fillRect(s.x - 3, s.y - 4, trail * 0.7, 8);
        ctx.fillStyle = grad;
        ctx.fillRect(s.x, s.y - 1.5, trail, 3);
        ctx.fillStyle = "#ecfdf5";
        ctx.fillRect(s.x - 2, s.y - 1.5, 6, 3);
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function drawShip() {
      const s = sprites!.ship;
      const st = statusRef.current;
      const maxV = Math.max(H * 1.55, 260);
      const tilt = clamp(ship.vy / maxV, -1, 1) * 0.12;
      const idleBob = st === "running" ? 0 : Math.sin(clock * 2.4) * 2;
      ctx.save();
      ctx.translate(Math.round(ship.x), Math.round(ship.y + idleBob));
      ctx.rotate(-tilt);
      ctx.globalAlpha = st === "over" ? 0.4 : 1;

      // Thruster flame behind (to the right of) the hull.
      ctx.globalCompositeOperation = "lighter";
      const len = px * (3 + Math.random() * 2.5 + Math.max(0, -ship.vx / maxV) * 3);
      const fx = s.bw / 2 - px;
      const flame = ctx.createLinearGradient(fx, 0, fx + len, 0);
      flame.addColorStop(0, "rgb(236 253 245 / 0.95)");
      flame.addColorStop(0.35, `rgb(${ACCENT_RGB} / 0.8)`);
      flame.addColorStop(1, `rgb(${ACCENT_RGB} / 0)`);
      ctx.fillStyle = flame;
      ctx.fillRect(fx, -px * 0.9, len, px * 1.8);

      if (muzzle > 0) {
        const mx = -s.bw / 2 - 3;
        const glow = ctx.createRadialGradient(mx, 0, 0, mx, 0, 14 * muzzle + 4);
        glow.addColorStop(0, "rgb(236 253 245 / 0.9)");
        glow.addColorStop(1, `rgb(${ACCENT_RGB} / 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mx, 0, 14 * muzzle + 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(s.img, -s.w / 2, -s.h / 2, s.w, s.h);
      ctx.restore();
    }

    function drawFx() {
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      for (const r of rings) {
        ctx.globalAlpha = Math.max(0, r.life) * 0.8;
        ctx.strokeStyle = `rgb(${r.color})`;
        ctx.lineWidth = 2 * r.life + 0.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const p of popups) {
        ctx.globalAlpha = clamp(p.life, 0, 1);
        ctx.font = `${p.big ? 700 : 600} ${p.big ? 12 : 11}px ${font}`;
        ctx.fillStyle = p.big ? "#ecfdf5" : `rgb(${p.color})`;
        ctx.fillText(p.big ? p.text.toUpperCase() : p.text, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    }

    function drawBanner() {
      if (banner <= 0 || statusRef.current !== "running") return;
      const shown = 1.8 - banner;
      const alpha = Math.min(1, shown * 4, banner * 2);
      const cx = prodX() / 2;
      const cy = LABEL_BAND + (H - LABEL_BAND) / 2;
      const size = clamp(W * 0.034, 16, 28);
      const spaced = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = alpha;
      spaced.letterSpacing = `${Math.round(size * 0.3)}px`;
      ctx.font = `800 ${size}px ${font}`;
      ctx.fillStyle = "#ecfdf5";
      ctx.shadowColor = `rgb(${ACCENT_RGB} / 0.8)`;
      ctx.shadowBlur = 18;
      ctx.fillText(`WAVE ${pad(wave)}`, cx, cy - size * 0.4);
      ctx.shadowBlur = 0;
      spaced.letterSpacing = "3px";
      ctx.font = `500 ${Math.max(9, size * 0.38)}px ${font}`;
      ctx.fillStyle = `rgb(${ACCENT_RGB} / 0.85)`;
      ctx.fillText(wave === 1 ? "HOLD THE LINE" : "BUGS ARE GETTING FASTER", cx, cy + size * 0.65);
      spaced.letterSpacing = "0px";
      ctx.globalAlpha = 1;
    }

    function draw() {
      if (!sprites || !paint) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (shake > 0 && !reduceMotion.matches) {
        const m = shake * shake * 7;
        ctx.translate((Math.random() - 0.5) * m, (Math.random() - 0.5) * m);
      }
      drawBackdrop();
      drawBugs();
      drawShots();
      drawShip();
      drawFx();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = paint.vignette;
      ctx.fillRect(0, 0, W, H);
      if (breach > 0) {
        ctx.fillStyle = `rgb(${DANGER_RGB} / ${0.16 * breach})`;
        ctx.fillRect(0, 0, W, H);
      }
      drawBanner();
    }

    function loop(t: number) {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const st = statusRef.current;
      if (visible && st !== "paused") {
        clock += dt;
        if (st === "running") step(dt);
        stepFx(dt);
      }
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    // ---------------------------------------------------------------- input
    const controlOf = (e: KeyboardEvent): Control | undefined =>
      KEYMAP[e.code] ?? (e.key === " " ? "fire" : KEYMAP[e.key as keyof typeof KEYMAP]);

    function hold(c: Control, down: boolean) {
      if (input[c] === down) return;
      input[c] = down;
      setPressed((p) => ({ ...p, [c]: down }));
    }
    function releaseAll() {
      for (const c of Object.keys(NO_KEYS) as Control[]) input[c] = false;
      input.pointer = false;
      setPressed(NO_KEYS);
    }

    const start = () => {
      const st = statusRef.current;
      if (st === "running") return;
      if (st === "over" && performance.now() - overAt < RESTART_LOCK) return;
      if (st !== "paused") reset();
      setNewBest(false);
      setStat("running");
      sfx("start");
      panel.focus({ preventScroll: true });
    };
    const pause = () => {
      if (statusRef.current === "running") setStat("paused");
    };
    actions.current = { start, pause };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const st = statusRef.current;
      const c = controlOf(e);
      if (c) {
        e.preventDefault();
        hold(c, true);
        if (c === "fire" && !e.repeat && st !== "running") start();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (!e.repeat && st !== "running") start();
      } else if (e.key === "Escape" || e.code === "KeyP") {
        if (st === "running") {
          e.preventDefault();
          pause();
        } else if (st === "paused" && e.code === "KeyP") start();
      }
    };
    // Releases are heard on the window, so a key let go anywhere is never left "stuck".
    const onKeyUp = (e: KeyboardEvent) => {
      const c = controlOf(e);
      if (c) hold(c, false);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (panel.contains(e.relatedTarget as Node | null)) return;
      releaseAll();
      pause();
    };
    const onHidden = () => {
      if (document.visibilityState !== "hidden") return;
      releaseAll();
      pause();
    };

    const aim = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      input.tx = e.clientX - r.left;
      input.ty = e.clientY - r.top;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (statusRef.current !== "running" || (e.pointerType === "mouse" && e.button !== 0)) return;
      panel.focus({ preventScroll: true });
      field.setPointerCapture(e.pointerId);
      input.pointer = true;
      aim(e);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (input.pointer) aim(e);
    };
    const onPointerUp = () => {
      input.pointer = false;
    };

    panel.addEventListener("keydown", onKeyDown);
    panel.addEventListener("focusout", onFocusOut);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", releaseAll);
    document.addEventListener("visibilitychange", onHidden);
    field.addEventListener("pointerdown", onPointerDown);
    field.addEventListener("pointermove", onPointerMove);
    field.addEventListener("pointerup", onPointerUp);
    field.addEventListener("pointercancel", onPointerUp);
    field.addEventListener("lostpointercapture", onPointerUp);

    resize();
    raf = requestAnimationFrame((t) => {
      last = t;
      loop(t);
    });
    void document.fonts?.ready.then(() => labelWidths.clear());

    const ro = new ResizeObserver(resize);
    ro.observe(field);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) pause();
    });
    io.observe(field);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      panel.removeEventListener("keydown", onKeyDown);
      panel.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", releaseAll);
      document.removeEventListener("visibilitychange", onHidden);
      field.removeEventListener("pointerdown", onPointerDown);
      field.removeEventListener("pointermove", onPointerMove);
      field.removeEventListener("pointerup", onPointerUp);
      field.removeEventListener("pointercancel", onPointerUp);
      field.removeEventListener("lostpointercapture", onPointerUp);
      void audio?.close();
    };
  }, []);

  const card = status === "running" ? null : CARDS[status];

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-t border-ink/10 bg-surface py-12 md:py-16"
      aria-labelledby="bughunt-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-2/3 max-w-5xl -translate-y-1/2 rounded-full bg-accent-fill/10 blur-[120px]"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:px-8">
        <header className="shrink-0 text-center">
          <SectionLabel className="text-mini tracking-label">off the clock</SectionLabel>
          <h2
            id="bughunt-title"
            className="mt-4 font-syne text-[clamp(1.75rem,4.6vw,3rem)] leading-[1.05] font-extrabold text-balance text-ink"
          >
            Nothing gets to prod on my watch.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-balance text-ink/55">
            Bugs crawl down the pipeline toward production. Hold fire, steer into their lane and keep uptime green.
          </p>
        </header>

        <div
          ref={panelRef}
          role="application"
          tabIndex={0}
          aria-label="Bug hunt game. Arrow keys to move, hold space to fire, escape to pause. On touch, tap to start, then hold and drag to steer while firing."
          className="mt-8 shrink-0 rounded-[28px] border border-ink/10 bg-linear-to-b from-surface-3 to-surface-2 p-1.5 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-accent-fill/50 sm:p-2"
        >
          <div className={cn(mono.className, "overflow-hidden rounded-[22px] bg-[#080b0d] text-white ring-1 ring-white/6")}>
            {/* Title bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span aria-hidden className="hidden gap-1.5 sm:flex">
                  <span className="size-2.5 rounded-full bg-rose-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-300/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </span>
                <span className="flex items-center gap-2 truncate text-[11px] tracking-[0.2em] text-white/50 uppercase">
                  <BugIcon aria-hidden className="size-3.5 shrink-0 text-emerald-300" strokeWidth={2.25} />
                  bug-hunt
                  <span className="rounded border border-white/10 px-1.5 py-px text-[9px] tracking-[0.12em] text-white/35">v2</span>
                </span>
              </div>
              <StatusPill status={status} />
            </div>

            {/* HUD */}
            <dl className="grid grid-cols-4 divide-x divide-white/6 border-b border-white/6">
              <Stat label="Score" icon={Crosshair}>
                <span className="text-white">{pad(hud.score, 5)}</span>
              </Stat>
              <Stat label="Combo" icon={Zap}>
                <span className={cn("transition-colors", hud.mult > 1 ? "text-emerald-300" : "text-white/40")}>x{hud.mult}</span>
              </Stat>
              <Stat label="Wave" icon={Flame}>
                <span className="text-white">{pad(hud.wave)}</span>
              </Stat>
              <Stat label="Uptime" icon={ShieldCheck}>
                <span className="flex h-[1em] items-center gap-1">
                  <span className="sr-only">
                    {hud.lives} of {LIVES}
                  </span>
                  {Array.from({ length: LIVES }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-2.5 w-3 rounded-[3px] transition-all duration-300 sm:w-5",
                        i < hud.lives ? "bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153/0.6)]" : "bg-rose-500/25",
                      )}
                    />
                  ))}
                </span>
              </Stat>
            </dl>

            {/* Playfield */}
            <div
              ref={fieldRef}
              className={cn(
                "relative h-[clamp(280px,46vh,460px)] overflow-hidden select-none",
                status === "running" && "cursor-crosshair touch-none",
              )}
            >
              <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(255_255_255/0.025)_0_1px,transparent_1px_3px)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 grid h-[34px] grid-cols-[3fr_3fr_3fr_1.8fr] items-center border-b border-white/5 bg-linear-to-b from-black/40 to-transparent text-[9px] tracking-[0.28em] uppercase sm:text-[10px]"
              >
                {STAGES.map((s, i) =>
                  s === "prod" ? (
                    <span key={s} className="flex items-center justify-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="hidden size-3 sm:block" strokeWidth={2.25} />
                      {s}
                    </span>
                  ) : (
                    <span key={s} className="text-center text-white/30">
                      <span className="mr-1.5 hidden text-white/15 sm:inline">{pad(i + 1)}</span>
                      {s}
                    </span>
                  ),
                )}
              </div>

              {card && (
                <div
                  className="absolute inset-0 z-10 grid cursor-pointer place-items-center bg-[#06080a]/55 p-4 backdrop-blur-[3px]"
                  onClick={() => actions.current?.start()}
                >
                  <div
                    key={status}
                    className="bh-pop w-full max-w-[19rem] rounded-2xl border border-white/10 bg-[#0d1114]/90 px-5 py-5 text-center shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)] sm:px-6"
                  >
                    <span className={cn("mx-auto grid size-10 place-items-center rounded-full ring-1 sm:size-11", card.tone)}>
                      <card.icon className="size-[18px] sm:size-5" strokeWidth={2} />
                    </span>
                    <p className="mt-3 font-syne text-xl leading-tight font-extrabold text-white sm:text-2xl">{card.title}</p>
                    {status === "over" ? (
                      <div className="mt-2">
                        <p className="text-3xl leading-none font-bold text-white tabular-nums">{hud.score}</p>
                        <p className="mt-1.5 text-[10px] tracking-[0.24em] text-white/40 uppercase">points · wave {pad(hud.wave)}</p>
                        {newBest && (
                          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[10px] tracking-[0.2em] text-amber-200 uppercase">
                            <Trophy className="size-3" strokeWidth={2.25} />
                            New best
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="mt-1.5 text-xs leading-relaxed text-white/55">{card.body}</p>
                    )}
                    <button
                      type="button"
                      tabIndex={-1}
                      onMouseDown={(e) => e.preventDefault()}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 py-1.5 pr-1.5 pl-4 text-[11px] font-semibold tracking-[0.16em] text-black uppercase shadow-[0_0_28px_rgb(52_211_153/0.35)] transition-colors hover:bg-emerald-300"
                    >
                      <card.cta.icon className="size-3.5" strokeWidth={2.5} />
                      {card.cta.label}
                      <kbd className="rounded-full bg-black/15 px-2 py-0.5 text-[9px] tracking-[0.12em] [@media(pointer:coarse)]:hidden">
                        space
                      </kbd>
                      <span className="w-1 [@media(pointer:fine)]:hidden" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/6 px-4 py-3 sm:px-5">
              <div className="hidden flex-wrap items-center gap-x-6 gap-y-3 text-[10px] tracking-[0.2em] text-white/40 uppercase [@media(pointer:fine)]:flex">
                <span className="flex items-center gap-3">
                  <span className="grid grid-cols-3 gap-1" aria-hidden>
                    <span />
                    <Key active={pressed.up}>
                      <ArrowUp className="size-3" strokeWidth={2.5} />
                    </Key>
                    <span />
                    <Key active={pressed.left}>
                      <ArrowLeft className="size-3" strokeWidth={2.5} />
                    </Key>
                    <Key active={pressed.down}>
                      <ArrowDown className="size-3" strokeWidth={2.5} />
                    </Key>
                    <Key active={pressed.right}>
                      <ArrowRight className="size-3" strokeWidth={2.5} />
                    </Key>
                  </span>
                  Move
                </span>
                <span className="flex items-center gap-3">
                  <Key active={pressed.fire} className="w-28 sm:w-32">
                    space
                  </Key>
                  Hold to fire
                </span>
                <span className="flex items-center gap-3">
                  <Key active={status === "paused"}>esc</Key>
                  Pause
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase [@media(pointer:fine)]:hidden">
                Hold &amp; drag to steer · fires while held
              </p>
              <p className="ml-auto flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <Trophy aria-hidden className="size-3.5 text-amber-300" strokeWidth={2.25} />
                Best
                <span className="text-xs tracking-normal text-white tabular-nums">{pad(best, 5)}</span>
              </p>
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {status === "over"
            ? `Prod is down. ${hud.score} points.`
            : status === "paused"
              ? "Paused."
              : status === "running"
                ? "Game on."
                : ""}
        </p>
      </div>
    </section>
  );
}

const CARDS: Record<
  Exclude<Status, "running">,
  { icon: LucideIcon; tone: string; title: string; body: string; cta: { label: string; icon: LucideIcon } }
> = {
  idle: {
    icon: Crosshair,
    tone: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
    title: "Bug Hunt",
    body: "Every bug that reaches prod costs uptime. Lose all three and it's an incident.",
    cta: { label: "Start", icon: Play },
  },
  paused: {
    icon: Pause,
    tone: "bg-amber-300/10 text-amber-200 ring-amber-300/30",
    title: "Paused",
    body: "The pipeline is frozen. The bugs are waiting.",
    cta: { label: "Resume", icon: Play },
  },
  over: {
    icon: ShieldAlert,
    tone: "bg-rose-500/10 text-rose-300 ring-rose-400/30",
    title: "Prod is down",
    body: "",
    cta: { label: "Redeploy", icon: RotateCcw },
  },
};

const STATUS_UI: Record<Status, { label: string; className: string; dot: string }> = {
  idle: { label: "Standby", className: "border-white/10 bg-white/4 text-white/55", dot: "bg-white/40" },
  running: { label: "Live", className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300", dot: "bg-emerald-400" },
  paused: { label: "Paused", className: "border-amber-300/25 bg-amber-300/10 text-amber-200", dot: "bg-amber-300" },
  over: { label: "Incident", className: "border-rose-400/30 bg-rose-500/10 text-rose-300", dot: "bg-rose-500" },
};

function StatusPill({ status }: { status: Status }) {
  const ui = STATUS_UI[status];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] tracking-[0.22em] uppercase",
        ui.className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5">
        {status === "running" && (
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-70 motion-reduce:animate-none", ui.dot)} />
        )}
        <span className={cn("relative size-1.5 rounded-full", ui.dot)} />
      </span>
      {ui.label}
    </span>
  );
}

function Stat({ label, icon: Icon, children }: { label: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 px-3 py-3 sm:px-5 sm:py-4">
      <dt className="flex items-center gap-1.5 text-[9px] tracking-[0.24em] text-white/35 uppercase sm:text-[10px]">
        <Icon aria-hidden className="hidden size-3 text-white/30 sm:block" strokeWidth={2.25} />
        {label}
      </dt>
      <dd className="text-base leading-none font-semibold tabular-nums sm:text-2xl">{children}</dd>
    </div>
  );
}

function Key({ active, className, children }: { active?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 text-[10px] tracking-[0.12em] lowercase transition-all duration-100",
        active
          ? "translate-y-px border-emerald-300/60 bg-emerald-400/20 text-emerald-200 shadow-[0_0_14px_rgb(52_211_153/0.35)]"
          : "border-white/12 bg-linear-to-b from-white/9 to-white/3 text-white/70 shadow-[inset_0_-2px_0_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.06)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

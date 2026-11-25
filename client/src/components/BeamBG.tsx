import { useEffect, useRef } from "react";

/**
 * BeamBG
 * Light beams + glow + twinkling particles + grain.
 * Absolute inset-0 by default: put it inside any `relative` parent.
 * Everything is sized in rem, so it scales with your root font-size
 * (font-size: max(1rem, 0.8333vw)) and looks the same on 1080p and 4K.
 *
 * <section className="relative overflow-hidden bg-[#0a0a0a]">
 *   <BeamBG beamPosition="top-left" />
 *   <div className="relative z-10">...your content...</div>
 * </section>
 */

export type BeamPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface BeamBGProps {
  /** Where the light source sits. Default: "top-center" */
  beamPosition?: BeamPosition;
  /** Beam strength multiplier, 0 – 1.5. Default: 1 */
  beamOpacity?: number;
  /** "r,g,b" string, e.g. "120,160,255". Default: "255,255,255" */
  beamColor?: string;
  /** How far the beams reach. 1 = default, 0.6 = shorter, 1.3 = longer. Default: 1 */
  beamReach?: number;
  /** Show or hide the particles. Default: true */
  particles?: boolean;
  /** Particle density multiplier. Default: 1 */
  particleCount?: number;
  /** Particle size multiplier (0.7 = smaller). Default: 1 */
  particleSize?: number;
  /** Show or hide the grain layer. Default: true */
  grain?: boolean;
  /** Extra classes for the wrapper */
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  v: number;
  big: boolean;
}

// x / y = where the light source sits, in % of the container
// (outside the edge = beams fan in, 50/50 = beams fan out from the middle)
const POSITIONS: Record<BeamPosition, { x: number; y: number }> = {
  "top-left": { x: 15, y: -12 },
  "top-center": { x: 50, y: -12 },
  "top-right": { x: 85, y: -12 },
  "center-left": { x: -12, y: 50 },
  "center-center": { x: 50, y: 50 },
  "center-right": { x: 112, y: 50 },
  "bottom-left": { x: 15, y: 112 },
  "bottom-center": { x: 50, y: 112 },
  "bottom-right": { x: 85, y: 112 },
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export function BeamBG({
  beamPosition = "top-center",
  beamOpacity = 1,
  beamColor = "255,255,255",
  beamReach = 1,
  particles = true,
  particleCount = 1,
  particleSize = 1,
  grain = true,
  className = "",
}: BeamBGProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pos = POSITIONS[beamPosition] ?? POSITIONS["top-center"];
  const mx = clamp(pos.x, 0, 100); // mask / glow center stays inside the container
  const my = clamp(pos.y, 0, 100);

  // beam reach: % of the container (same as the original version), scaled by beamReach
  const beamMask = `radial-gradient(ellipse ${75 * beamReach}% ${70 * beamReach}% at ${mx}% ${my}%, #000 0%, transparent 72%)`;
  const rgba = (a: number) => `rgba(${beamColor},${a})`;

  const beamsA = `repeating-conic-gradient(from 180deg at ${pos.x}% ${pos.y}%,
    transparent 0deg, ${rgba(0.16)} 1.2deg, transparent 3.4deg,
    transparent 5deg, ${rgba(0.08)} 6.4deg, transparent 8.6deg,
    transparent 11deg, ${rgba(0.12)} 12.2deg, transparent 15deg)`;

  const beamsB = `repeating-conic-gradient(from 188deg at ${pos.x}% ${pos.y}%,
    transparent 0deg, ${rgba(0.1)} 2deg, transparent 5deg,
    transparent 9deg, ${rgba(0.08)} 10.5deg, transparent 13deg)`;

  useEffect(() => {
    if (!particles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let u = 16; // 1rem in canvas units, read from the root font-size
    let dots: Dot[] = [];
    let raf = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      u = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density is per rem², so a 4K screen gets the same number of dots as 1080p
      const n = Math.round((((W / u) * (H / u)) / 35) * particleCount);
      dots = Array.from({ length: n }, () => {
        const big = Math.random() < 0.1;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          // radius in rem: big 0.044–0.081, small 0.016–0.047 (times particleSize)
          r:
            (big
              ? Math.random() * 0.0375 + 0.044
              : Math.random() * 0.031 + 0.016) *
            u *
            particleSize,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.012 + 0.004,
          // speed in rem per frame
          v: (Math.random() * 0.005 + 0.0006) * u,
          big,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const ox = (pos.x / 100) * W;
      const oy = (pos.y / 100) * H;
      const maxD = Math.hypot(W, H);

      for (const p of dots) {
        if (!still) {
          p.a += p.s;
          p.y -= p.v;
          if (p.y < -0.25 * u) {
            p.y = H + 0.25 * u;
            p.x = Math.random() * W;
          }
        }
        // brighter near the light source, fainter far away
        const fade =
          1 - Math.min(Math.hypot(p.x - ox, p.y - oy) / maxD, 1) * 0.6;
        const alpha = (0.25 + 0.75 * Math.abs(Math.sin(p.a))) * fade;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${beamColor},${alpha.toFixed(3)})`;
        ctx.shadowColor = p.big ? `rgba(${beamColor},0.7)` : "transparent";
        ctx.shadowBlur = p.big ? 0.3125 * u : 0;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    build();
    draw();
    const ro = new ResizeObserver(() => {
      build();
      if (still) draw();
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [particles, particleCount, particleSize, beamColor, pos.x, pos.y]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <style>{`
        @keyframes beam-pulse { from { opacity: .3 } to { opacity: .6 } }
        @media (prefers-reduced-motion: reduce) { .beam-layer { animation: none !important } }
      `}</style>

      {/* glow at the light source */}
      <div
        className="absolute h-[30rem] w-[56.25rem] -translate-x-1/2 -translate-y-1/2 blur-[2.5rem]"
        style={{
          left: `${mx}%`,
          top: `${my}%`,
          opacity: clamp(beamOpacity, 0, 1.5),
          background: `radial-gradient(closest-side, ${rgba(0.28)}, ${rgba(0.06)} 55%, transparent 80%)`,
        }}
      />

      {/* beams */}
      <div
        className="beam-layer absolute inset-0 blur-[0.375rem]"
        style={{
          background: beamsA,
          WebkitMaskImage: beamMask,
          maskImage: beamMask,
          opacity: 0.55 * beamOpacity,
          animation: "beam-pulse 9s ease-in-out infinite alternate",
        }}
      />
      <div
        className="beam-layer absolute inset-0 blur-[1.125rem]"
        style={{
          background: beamsB,
          WebkitMaskImage: beamMask,
          maskImage: beamMask,
          opacity: 0.4 * beamOpacity,
          animation: "beam-pulse 13s ease-in-out infinite alternate",
        }}
      />

      {/* particles */}
      {particles && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}

      {/* grain */}
      {grain && (
        <div
          className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
          style={{
            backgroundSize: "13.75rem",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      )}
    </div>
  );
}

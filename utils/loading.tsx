import type { CSSProperties } from "react";

type LoadingVariant = "inline" | "overlay";

export interface LoadingProps {
  label?: string;
  size?: number;
  variant?: LoadingVariant;
  className?: string;
}

/**
 * Loading indicator reusable untuk halaman, tombol, dan panel async.
 * Tidak membutuhkan dependency tambahan dan tetap memberi konteks ke screen reader.
 */
export function Loading({
  label = "Memuat...",
  size = 56,
  variant = "inline",
  className = "",
}: LoadingProps) {
  const style = { "--loading-size": `${size}px` } as CSSProperties;

  return (
    <div
      className={`loading ${variant === "overlay" ? "loading-overlay" : ""} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
      style={style}
    >
      <span className="loading-orbit" aria-hidden="true">
        <span className="loading-dot loading-dot-one" />
        <span className="loading-dot loading-dot-two" />
        <span className="loading-dot loading-dot-three" />
        <span className="loading-core" />
      </span>
      <span className="loading-label">{label}</span>
      <style>{`
        .loading {
          --loading-blue: #0866f5;
          --loading-orange: #ff7600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #53627b;
          font: 700 13px/1.4 var(--font-body, "Segoe UI", sans-serif);
        }
        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          flex-direction: column;
          background: rgba(2, 6, 23, .52);
          backdrop-filter: blur(7px);
          color: #f8fafc;
        }
        .loading-orbit {
          position: relative;
          display: block;
          width: var(--loading-size);
          height: var(--loading-size);
          animation: loading-spin 1.9s cubic-bezier(.65,0,.35,1) infinite;
        }
        .loading-core {
          position: absolute;
          inset: 25%;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--loading-blue), var(--loading-orange));
          box-shadow: 0 0 24px rgba(8, 102, 245, .38);
          animation: loading-breathe 1.2s ease-in-out infinite alternate;
        }
        .loading-dot {
          position: absolute;
          width: 18%;
          height: 18%;
          border-radius: 50%;
          box-shadow: 0 0 12px currentColor;
        }
        .loading-dot-one { top: 2%; left: 41%; color: var(--loading-blue); background: currentColor; }
        .loading-dot-two { right: 5%; bottom: 18%; color: var(--loading-orange); background: currentColor; }
        .loading-dot-three { left: 5%; bottom: 18%; color: #4ade80; background: currentColor; }
        .loading-label { min-width: 0; }
        @keyframes loading-spin { to { transform: rotate(360deg); } }
        @keyframes loading-breathe { from { transform: scale(.82); } to { transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) {
          .loading-orbit, .loading-core { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default Loading;

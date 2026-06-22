"use client";

import React from "react";

/**
 * BODY SHAPES VISUALIZER
 */
const PATTERN = [
  [1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 0, 1],
  [1, 1, 0, 1, 1]
];

export function DotVisualizer({ type }: { type: string }) {
  const size = 6;
  const gap = 1.5;
  const total = size + gap;

  const renderDot = (x: number, y: number) => {
    const cx = x * total + size / 2;
    const cy = y * total + size / 2;
    
    switch (type) {
      case "square":
        return <rect x={x * total} y={y * total} width={size} height={size} fill="currentColor" />;
      case "rounded":
        return <rect x={x * total} y={y * total} width={size} height={size} rx={2} fill="currentColor" />;
      case "extra-rounded":
        return <rect x={x * total} y={y * total} width={size} height={size} rx={3} fill="currentColor" />;
      case "dots":
        return <circle cx={cx} cy={cy} r={size / 2} fill="currentColor" />;
      case "classy":
        return <polygon points={`${cx},${cy - size/2} ${cx + size/2},${cy} ${cx},${cy + size/2} ${cx - size/2},${cy}`} fill="currentColor" />;
      case "classy-rounded":
        return <circle cx={cx} cy={cy} r={size / 1.5} fill="currentColor" />;
      default:
        return <rect x={x * total} y={y * total} width={size} height={size} fill="currentColor" />;
    }
  };

  return (
    <svg viewBox="0 0 40 40" className="w-[60%] h-[60%] text-gray-800 dark:text-gray-200 pointer-events-none">
      {PATTERN.map((row, y) => 
        row.map((cell, x) => 
          cell === 1 ? <React.Fragment key={`${x}-${y}`}>{renderDot(x, y)}</React.Fragment> : null
        )
      )}
    </svg>
  );
}

/**
 * EXTERNAL EYE VISUALIZER
 */
export function ExtEyeVisualizer({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 40 40" className="w-[50%] h-[50%] text-gray-800 dark:text-gray-200 pointer-events-none">
      {type === "square" && (
        <path d="M5,5 L35,5 L35,35 L5,35 Z M10,10 L10,30 L30,30 L30,10 Z" fill="currentColor" fillRule="evenodd" />
      )}
      {type === "dot" && (
        <path d="M5,5 C5,5 35,5 35,5 C35,5 35,35 35,35 C35,35 5,35 5,35 C5,35 5,5 5,5 Z M10,10 C10,10 10,30 10,30 C10,30 30,30 30,30 C30,30 30,10 30,10 C30,10 10,10 10,10 Z" rx="10" ry="10" fill="currentColor" fillRule="evenodd" />
      )}
      {type === "extra-rounded" && (
        <path d="M5,20 A15,15 0 1,1 35,20 A15,15 0 1,1 5,20 Z M10,20 A10,10 0 1,0 30,20 A10,10 0 1,0 10,20 Z" fill="currentColor" fillRule="evenodd" />
      )}
      {!type && (
        <path d="M5,5 L35,5 L35,35 L5,35 Z M10,10 L10,30 L30,30 L30,10 Z" fill="currentColor" fillRule="evenodd" strokeDasharray="2,2" stroke="currentColor" strokeWidth="1" fillOpacity="0.5" />
      )}
    </svg>
  );
}

/**
 * INTERNAL EYE VISUALIZER
 */
export function IntEyeVisualizer({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 40 40" className="w-[50%] h-[50%] text-gray-800 dark:text-gray-200 pointer-events-none">
      {/* Outer frame just for context (thin and light) */}
      <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      
      {type === "square" && (
        <rect x="13" y="13" width="14" height="14" fill="currentColor" />
      )}
      {type === "dot" && (
        <circle cx="20" cy="20" r="8" fill="currentColor" />
      )}
      {!type && (
        <rect x="13" y="13" width="14" height="14" fill="currentColor" opacity="0.5" />
      )}
    </svg>
  );
}

/**
 * FRAME VISUALIZER
 */
export function FrameVisualizer({ type, color = "#000" }: { type: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" className="w-[50%] h-[50%] pointer-events-none">
      {type === "none" && (
        <rect x="15" y="15" width="30" height="30" fill="none" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
      )}
      {type === "standard" && (
        <g>
          <rect x="5" y="5" width="50" height="50" fill="none" stroke={color} strokeWidth="4" rx="4" />
          <rect x="10" y="44" width="40" height="8" fill={color} rx="2" />
        </g>
      )}
      {type === "business" && (
        <g>
          <rect x="5" y="5" width="50" height="50" fill="none" stroke={color} strokeWidth="2" />
          <rect x="5" y="40" width="50" height="15" fill={color} />
        </g>
      )}
      {type === "badge" && (
        <g>
          <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="4" />
          <path d="M 10 40 Q 30 55 50 40" fill="none" stroke={color} strokeWidth="8" />
        </g>
      )}
      {type === "minimal" && (
        <g>
          <rect x="10" y="10" width="40" height="40" fill="none" stroke="#e5e7eb" strokeWidth="2" />
          <rect x="10" y="5" width="40" height="8" fill={color} />
        </g>
      )}
    </svg>
  );
}

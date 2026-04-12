"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./SacredArchitecture.module.css";

/* ═══════════════════════════════════════════════════════════════════
   SacredArchitecture — The Hidden Framework

   Canvas animation: copper pipes screensaver, sacred geometry.
   Fibonacci-biased turns with smooth 90° elbow bends.
   Right-angle Fibonacci spiral with curved corners.

   Round linecaps, bezier elbows, coupling fittings at joints.
   Raw copper ink on parchment — like plumbing behind drywall.
   ═══════════════════════════════════════════════════════════════════ */

const PHI = 1.618033988749895;
const FIB_RATIOS = [1 / PHI, 1 / (PHI * PHI), 1 / (PHI * PHI * PHI)];

// Directions: 0=right, 1=down, 2=left, 3=up
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

interface Pipe {
  x: number;
  y: number;
  dir: number;
  length: number;
  segmentLength: number;
  maxSegment: number;
  steps: number;
  color: string;
  opacity: number;
  pendingTurn: number | null; // queued direction change
}

interface FibSpiral {
  x: number;
  y: number;
  dir: number;
  fibIndex: number;
  segmentDrawn: number;
  segmentTotal: number;
  done: boolean;
  color: string;
  opacity: number;
}

interface PipeConfig {
  gridSize: number;
  pipeWidth: number;
  maxPipes: number;
  drawSpeed: number;
  bendRadius: number;
  couplingRadius: number;
  colors: {
    pipe: string;
    background: string;
    coupling: string;
  };
}

function getConfig(): PipeConfig {
  return {
    gridSize: 20,
    pipeWidth: 3,
    maxPipes: 4,
    drawSpeed: 1,
    bendRadius: 10,       // radius of the curved 90° elbow
    couplingRadius: 5,    // radius of the fitting at joints
    colors: {
      pipe: "#B87333",
      background: "#F4F1EA",
      coupling: "#A0652E",  // slightly darker copper for fittings
    },
  };
}

function fib(n: number): number {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
}

function fibonacciDirection(currentDir: number, step: number): number {
  const fibIndex = step % FIB_RATIOS.length;
  const turnProb = FIB_RATIOS[fibIndex];
  const rand = Math.random();
  if (rand < turnProb * 0.4) return (currentDir + 3) % 4;
  if (rand < turnProb * 0.8) return (currentDir + 1) % 4;
  return currentDir;
}

function createPipe(
  canvasW: number, canvasH: number,
  gridSize: number, color: string
): Pipe {
  const edge = Math.floor(Math.random() * 4);
  let x: number, y: number, dir: number;

  switch (edge) {
    case 0:
      x = Math.floor(Math.random() * (canvasW / gridSize)) * gridSize;
      y = 0; dir = 1; break;
    case 1:
      x = canvasW;
      y = Math.floor(Math.random() * (canvasH / gridSize)) * gridSize;
      dir = 2; break;
    case 2:
      x = Math.floor(Math.random() * (canvasW / gridSize)) * gridSize;
      y = canvasH; dir = 3; break;
    default:
      x = 0;
      y = Math.floor(Math.random() * (canvasH / gridSize)) * gridSize;
      dir = 0;
  }

  return {
    x, y, dir,
    length: 0, segmentLength: 0,
    maxSegment: Math.floor(Math.random() * 8 + 3) * gridSize *
      (Math.random() < 0.5 ? 1 : PHI - 0.5),
    steps: 0, color,
    opacity: 0.12 + Math.random() * 0.18,
    pendingTurn: null,
  };
}

function createFibSpiral(
  canvasW: number, canvasH: number,
  gridSize: number, color: string
): FibSpiral {
  const cx = canvasW * (0.35 + Math.random() * 0.3);
  const cy = canvasH * (0.35 + Math.random() * 0.3);
  return {
    x: Math.round(cx / gridSize) * gridSize,
    y: Math.round(cy / gridSize) * gridSize,
    dir: Math.floor(Math.random() * 4),
    fibIndex: 0, segmentDrawn: 0,
    segmentTotal: fib(0) * gridSize,
    done: false, color, opacity: 0.22,
  };
}

/**
 * Draw a smooth 90° elbow bend between two perpendicular directions.
 * Uses arcTo for a perfectly round plumbing elbow.
 */
function drawElbow(
  ctx: CanvasRenderingContext2D,
  cornerX: number, cornerY: number,
  oldDir: number, newDir: number,
  radius: number, width: number,
  color: string, opacity: number
) {
  // The corner point is where the two straight segments would meet.
  // We back up from the corner along the old direction and advance
  // along the new direction, using arcTo to create the rounded bend.
  const fromX = cornerX - DX[oldDir] * radius;
  const fromY = cornerY - DY[oldDir] * radius;
  const toX = cornerX + DX[newDir] * radius;
  const toY = cornerY + DY[newDir] * radius;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.arcTo(cornerX, cornerY, toX, toY, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.globalAlpha = opacity;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

/**
 * Draw a round coupling fitting (like a pipe union joint).
 */
function drawCoupling(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  pipeWidth: number, couplingRadius: number,
  color: string, opacity: number
) {
  // Outer ring — the coupling body
  ctx.beginPath();
  ctx.arc(x, y, couplingRadius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = pipeWidth * 0.6;
  ctx.globalAlpha = opacity * 0.5;
  ctx.stroke();

  // Inner dot — the fitting center
  ctx.beginPath();
  ctx.arc(x, y, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity * 0.4;
  ctx.fill();
}

export function SacredArchitecture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const pipesRef = useRef<Pipe[]>([]);
  const spiralRef = useRef<FibSpiral | null>(null);
  const spiralTimerRef = useRef<number>(0);
  const configRef = useRef<PipeConfig>(getConfig());
  const frameRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = configRef.current;
    const { gridSize, pipeWidth, drawSpeed, bendRadius, couplingRadius, colors } = config;
    const pipes = pipesRef.current;

    frameRef.current++;

    // Throttle: draw every 2nd frame
    if (frameRef.current % 2 !== 0) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    // Initialize pipes
    while (pipes.length < config.maxPipes) {
      pipes.push(createPipe(canvas.width, canvas.height, gridSize, colors.pipe));
    }

    // ── REGULAR PIPES ───────────────────────────────────────────
    for (let s = 0; s < drawSpeed; s++) {
      for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        const prevX = pipe.x;
        const prevY = pipe.y;

        pipe.x += DX[pipe.dir] * gridSize;
        pipe.y += DY[pipe.dir] * gridSize;
        pipe.segmentLength += gridSize;
        pipe.length += gridSize;
        pipe.steps++;

        // Draw straight segment
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(pipe.x, pipe.y);
        ctx.strokeStyle = pipe.color;
        ctx.lineWidth = pipeWidth;
        ctx.globalAlpha = pipe.opacity;
        ctx.lineCap = "round";
        ctx.stroke();

        const shouldTurn = pipe.segmentLength >= pipe.maxSegment;
        const atEdge =
          pipe.x <= 0 || pipe.x >= canvas.width ||
          pipe.y <= 0 || pipe.y >= canvas.height;

        if (shouldTurn || atEdge) {
          const oldDir = pipe.dir;
          let newDir: number;

          if (atEdge) {
            if (pipe.x <= 0) newDir = 0;
            else if (pipe.x >= canvas.width) newDir = 2;
            else if (pipe.y <= 0) newDir = 1;
            else newDir = 3;
          } else {
            newDir = fibonacciDirection(pipe.dir, pipe.steps);
          }

          // If direction actually changed, draw a curved elbow
          if (newDir !== oldDir) {
            drawElbow(
              ctx, pipe.x, pipe.y,
              oldDir, newDir,
              bendRadius, pipeWidth,
              pipe.color, pipe.opacity
            );

            // Draw coupling fitting at the bend
            drawCoupling(
              ctx, pipe.x, pipe.y,
              pipeWidth, couplingRadius,
              colors.coupling, pipe.opacity
            );
          }

          pipe.dir = newDir;
          pipe.segmentLength = 0;
          pipe.maxSegment = Math.floor(Math.random() * 5 + 2) * gridSize *
            (Math.random() < 0.382 ? PHI : 1);
        }

        // Retire long pipes
        if (pipe.length > canvas.width * 2 + canvas.height * 2) {
          pipes[i] = createPipe(canvas.width, canvas.height, gridSize, colors.pipe);
        }
      }
    }

    // ── FIBONACCI SPIRAL ────────────────────────────────────────
    spiralTimerRef.current++;
    if (!spiralRef.current && spiralTimerRef.current > 180) {
      spiralRef.current = createFibSpiral(
        canvas.width, canvas.height, gridSize, colors.pipe
      );
      spiralTimerRef.current = 0;
    }

    const spiral = spiralRef.current;
    if (spiral && !spiral.done) {
      const prevX = spiral.x;
      const prevY = spiral.y;

      spiral.x += DX[spiral.dir] * gridSize;
      spiral.y += DY[spiral.dir] * gridSize;
      spiral.segmentDrawn += gridSize;

      // Draw spiral segment — round caps
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(spiral.x, spiral.y);
      ctx.strokeStyle = spiral.color;
      ctx.lineWidth = pipeWidth * 1.3;
      ctx.globalAlpha = spiral.opacity;
      ctx.lineCap = "round";
      ctx.stroke();

      // Segment complete — turn 90° with curved elbow
      if (spiral.segmentDrawn >= spiral.segmentTotal) {
        const oldDir = spiral.dir;
        const newDir = (spiral.dir + 1) % 4;

        // Draw elbow bend
        drawElbow(
          ctx, spiral.x, spiral.y,
          oldDir, newDir,
          bendRadius * 1.2, pipeWidth * 1.3,
          spiral.color, spiral.opacity
        );

        // Draw coupling at corner
        drawCoupling(
          ctx, spiral.x, spiral.y,
          pipeWidth * 1.3, couplingRadius * 1.2,
          colors.coupling, spiral.opacity
        );

        spiral.dir = newDir;
        spiral.fibIndex++;
        spiral.segmentDrawn = 0;
        spiral.segmentTotal = fib(spiral.fibIndex) * gridSize;

        if (spiral.fibIndex > 12 ||
            spiral.x < -100 || spiral.x > canvas.width + 100 ||
            spiral.y < -100 || spiral.y > canvas.height + 100) {
          spiral.done = true;
        }
      }
    }

    if (spiral && spiral.done) {
      spiralRef.current = null;
    }

    // Slow fade — parchment reclaims old lines
    ctx.globalAlpha = 0.002;
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    configRef.current = getConfig();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.fillStyle = configRef.current.colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      pipesRef.current = [];
      spiralRef.current = null;
    };

    resize();
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}

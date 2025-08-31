"use client";

import { useEffect, useRef } from "react";

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x, y + radius); // Start at top-left (with radius)
  ctx.arcTo(x, y, x + w, y, 0); // top-left corner (sharp for top-right)
  ctx.lineTo(x + w, y); // straight top-right
  ctx.lineTo(x + w, y + h); // straight bottom-right
  ctx.arcTo(x, y + h, x, y, 0); // bottom-left sharp
  ctx.lineTo(x, y + h - radius); // go up to bottom-left radius
  ctx.arcTo(x, y + h, x, y + h - radius, radius); // curve bottom-left
  ctx.lineTo(x, y + radius); // back to start
  ctx.arcTo(x, y, x + radius, y, radius); // curve top-left
  ctx.closePath();
}

class StaticAsciiOverlay {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageUrl: string;
  image: HTMLImageElement;
  options: any;
  dpr: number;

  constructor(canvas: HTMLCanvasElement, imageUrl: string, options?: any) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    this.imageUrl = imageUrl;
    this.options = {
      gridSize: 12,
      fontSize: 10,
      characters: "✦❍INFINITY*+",
      contrast: 1.25,
      textOpacity: 0.55,
      imageBrightness: 0.8,
      imageContrast: 1.0,
      borderRadius: 22,
      ...options,
    };
    this.dpr = Math.max(1, window.devicePixelRatio || 1);

    // Load the image
    this.image = new Image();
    this.image.crossOrigin = "anonymous";
    this.image.onload = () => this.draw();
    this.image.src = this.imageUrl;
  }

  sizeTo(container: HTMLElement) {
    const rect = container.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(rect.width));
    const cssH = Math.max(1, Math.floor(rect.height));

    // Set the canvas pixel size for crisp rendering
    this.canvas.width = Math.floor(cssW * this.dpr);
    this.canvas.height = Math.floor(cssH * this.dpr);
    // Ensure the drawing operations are in CSS pixels
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Also ensure the CSS size matches the container
    this.canvas.style.width = cssW + "px";
    this.canvas.style.height = cssH + "px";

    this.draw();
  }

  draw() {
    const { width: cssWidth, height: cssHeight } =
      this.canvas.getBoundingClientRect();
    if (!cssWidth || !cssHeight) return;

    const w = Math.floor(cssWidth);
    const h = Math.floor(cssHeight);
    const ctx = this.ctx;

    // Clear
    ctx.save();
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Clip to a rounded rectangle so everything (image, ASCII, overlays) feels embedded
    roundedRectPath(ctx, 0, 0, w, h, this.options.borderRadius);
    ctx.clip();

    // Draw base image with slight tonemapping
    ctx.save();
    ctx.filter = `brightness(${this.options.imageBrightness}) contrast(${this.options.imageContrast})`;
    ctx.drawImage(this.image, 0, 0, w, h);
    ctx.restore();

    // Grab pixels for ASCII sampling
    const imgData = ctx.getImageData(0, 0, w, h).data;

    // ASCII styling (slight glow for etched look)
    ctx.save();
    ctx.font = `${this.options.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255,255,255,0.35)";
    ctx.shadowBlur = 6;

    // Draw characters in a grid pattern across the entire image
    for (let y = this.options.gridSize / 2; y < h; y += this.options.gridSize) {
      for (
        let x = this.options.gridSize / 2;
        x < w;
        x += this.options.gridSize
      ) {
        const px = Math.min(w - 1, Math.floor(x));
        const py = Math.min(h - 1, Math.floor(y));
        const i = (py * w + px) * 4;
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];

        // Calculate brightness (0-1)
        const brightness = (r + g + b) / 3 / 255;

        // Apply contrast adjustment
        const adjusted = Math.max(
          0,
          Math.min(1, (brightness - 0.5) * this.options.contrast + 0.5)
        );

        // Map brightness to character density/opacity
        // Darker areas get dimmer/smaller characters, brighter areas get more prominent ones
        const charOpacity = adjusted * this.options.textOpacity + 0.3; // Always at least 10% visible

        // Calculate sequential character index based on grid position
        const gridX = Math.floor(x / this.options.gridSize);
        const gridY = Math.floor(y / this.options.gridSize);
        const charIndex = (gridX + gridY) % this.options.characters.length;

        const char = this.options.characters[charIndex];

        // Set opacity based on brightness
        ctx.fillStyle = `rgba(255,255,255,${charOpacity})`;

        // Optional: slightly vary the size based on brightness
        const sizeMultiplier = 1.0 + adjusted * 0.5; // Size varies from 80% to 120%
        ctx.save();
        ctx.font = `${
          this.options.fontSize * sizeMultiplier
        }px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.fillText(char, x, y);
        ctx.restore();
      }
    }
    ctx.restore();

    // --- Glassy embedded overlays ---

    // Subtle inner vignette (embedded/inset look)
    ctx.save();
    roundedRectPath(ctx, 0, 0, w, h, this.options.borderRadius);
    ctx.clip();
    const vignette = ctx.createRadialGradient(
      w * 0.5,
      h * 0.5,
      Math.min(w, h) * 0.2,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.7
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.28)");
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Soft top gloss highlight
    ctx.save();
    roundedRectPath(ctx, 0, 0, w, h, this.options.borderRadius);
    ctx.clip();
    const gloss = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    gloss.addColorStop(0, "rgba(255,255,255,0.25)");
    gloss.addColorStop(0.5, "rgba(255,255,255,0.10)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, w, h * 0.65);
    ctx.restore();

    // Diagonal specular streak
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.translate(-w * 0.15, -h * 0.25);
    ctx.rotate((-18 * Math.PI) / 180);
    const streakGrad = ctx.createLinearGradient(0, 0, w * 1.2, 0);
    streakGrad.addColorStop(0, "rgba(255,255,255,0)");
    streakGrad.addColorStop(0.5, "rgba(255,255,255,0.18)");
    streakGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = streakGrad;
    ctx.fillRect(0, 0, w * 1.4, h * 0.18);
    ctx.restore();

    // Border glow / polished edge
    ctx.save();
    roundedRectPath(
      ctx,
      0.5,
      0.5,
      w - 1,
      h - 1,
      this.options.borderRadius - 0.5
    );
    const edge = ctx.createLinearGradient(0, 0, w, h);
    edge.addColorStop(0, "rgba(255,255,255,0.55)");
    edge.addColorStop(0.5, "rgba(255,255,255,0.22)");
    edge.addColorStop(1, "rgba(255,255,255,0.10)");
    ctx.strokeStyle = edge;
    ctx.lineWidth = 1;
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;
    ctx.stroke();
    ctx.restore();
  }

  destroy() {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
  }
}

export default function AsciiEye() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const asciiArtRef = useRef<StaticAsciiOverlay | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ascii = new StaticAsciiOverlay(canvas, "/eye.jpeg", {
      gridSize: 14, // Slightly tighter grid for better coverage
      fontSize: 9, // Slightly smaller to fit more characters
      textOpacity: 0.85, // Slightly higher base opacity
      borderRadius: 22,
    });
    asciiArtRef.current = ascii;

    // Initial size
    ascii.sizeTo(container);

    // Resize observer for responsiveness & crisp DPR rendering
    const ro = new ResizeObserver(() => ascii.sizeTo(container));
    ro.observe(container);
    resizeObsRef.current = ro;

    return () => {
      ro.disconnect();
      ascii.destroy();
      asciiArtRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative w-full h-full
      "
    >
      {/* Glassy embedded panel wrapper */}
      <div
        className="
          relative w-full h-full rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl lg:rounded-tr-none rounded-br-3xl lg:rounded-br-none
          bg-white/10 backdrop-blur-xl
          ring-1 ring-white/20
          overflow-hidden
          before:content-[''] before:absolute before:inset-0 before:pointer-events-none
          before:shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]
          after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:pointer-events-none
        "
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
        />

        {/* Extra CSS gloss streak for depth */}
        <div
          className="
            pointer-events-none absolute -top-10 -left-10
            w-[160%] h-1/3 rotate-[-18deg]
            bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl
          "
        />

        {/* Footer label */}
        <div className="absolute bottom-0 left-0 z-10 p-4 sm:p-6 text-white/90 font-mono text-base italic select-none">
          infinity.
        </div>
      </div>
    </div>
  );
}

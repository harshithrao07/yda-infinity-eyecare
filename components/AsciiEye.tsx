"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// This class will create a static ASCII art effect over an image.
class StaticAsciiOverlay {
  constructor(canvas, imageUrl, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.imageUrl = imageUrl;
    this.options = {
      gridSize: 12,
      fontSize: 10,
      characters: "✦❍QWERTYUIOPASDFGHJKLZXCVBNM*+",
      contrast: 1.25,
      minBrightness: 0.15,
      textOpacity: 0.55,
      imageBrightness: 1,
      imageContrast: 1.0,
      ...options,
    };

    // Load the image to start the process
    this.image = new Image();
    this.image.crossOrigin = "Anonymous"; // Required for reading pixel data
    this.image.onload = () => this.draw();
    this.image.src = this.imageUrl;
  }

  // The main drawing function, called once after the image loads.
  draw() {
    const { width, height } = this.canvas;

    // 1. Clear canvas and draw the base image with desired filters
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.save();
    this.ctx.filter = `brightness(${this.options.imageBrightness}) contrast(${this.options.imageContrast})`;
    this.ctx.drawImage(this.image, 0, 0, width, height);
    this.ctx.restore();

    // 2. Get the raw pixel data from the drawn image
    const pixelData = this.ctx.getImageData(0, 0, width, height).data;

    // 3. Set up the text style for the character overlay
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.options.textOpacity})`;
    this.ctx.font = `${this.options.fontSize}px monospace`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // 4. Iterate over the canvas in a grid
    for (let y = 0; y < height; y += this.options.gridSize) {
      for (let x = 0; x < width; x += this.options.gridSize) {
        // Get the pixel color at the grid point (x, y)
        const pixelIndex = (y * width + x) * 4;
        const r = pixelData[pixelIndex];
        const g = pixelData[pixelIndex + 1];
        const b = pixelData[pixelIndex + 2];

        // Calculate the brightness (0 to 1) and apply contrast
        const brightness = (r + g + b) / 3 / 255;
        const adjustedBrightness =
          (brightness - 0.5) * this.options.contrast + 0.5;

        // 5. If the spot is bright enough, draw a random character
        if (adjustedBrightness > this.options.minBrightness) {
          const char =
            this.options.characters[
              Math.floor(Math.random() * this.options.characters.length)
            ];
          this.ctx.fillText(char, x, y);
        }
      }
    }
  }

  // Cleanup function for React's useEffect
  destroy() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }
}

export default function AsciiEye() {
  const asciiArtRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // --- GSAP Animation for the title text ---
    const creativityText = document.getElementById("creativity-text");
    const split = new SplitText(creativityText, {
      type: "lines",
      linesClass: "line-wrapper", // Use a wrapper to avoid interfering with layout
    });

    const lines = new SplitText(creativityText, {
      type: "lines",
      linesClass: "line-child",
    });

    gsap.set(lines.lines, { y: "100%" });
    gsap.to(lines.lines, {
      y: "0%",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2,
    });

    // --- Initialize the Static ASCII Art Effect ---
    // Note: The animation-related properties (diffusion, decay, etc.) are removed.
    const asciiArt = new StaticAsciiOverlay(
      document.getElementById("canvas"),
      "https://cdn.cosmos.so/a8bf7aec-4414-4a8f-991b-d7d2f970a626?format=jpeg",
      {
        gridSize: 12,
        fontSize: 10,
        characters: "✦❍INFINITY*+",
        contrast: 1.25, // Higher contrast makes brightness differences more stark
        minBrightness: 0.15, // Lower this to include darker areas
        textOpacity: 0.55,
        imageBrightness: 0.8,
        imageContrast: 1.0,
      }
    );
    asciiArtRef.current = asciiArt;

    // --- Cleanup function ---
    return () => {
      if (asciiArtRef.current) {
        asciiArtRef.current.destroy();
      }
      split.revert();
      lines.revert();
    };
  }, []);

  return (
    <div id="canvas-container" className="relative w-full h-full bg-black">
      <style jsx global>{`
        .line-wrapper {
          overflow: hidden;
        }
      `}</style>
      <canvas
        id="canvas"
        width={800}
        height={600}
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 z-10 p-8 text-white font-mono text-lg italic">
          infinity.
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import "./algorithmCanvas.css";

interface CanvasProps {
  width: number;
  height: number;
  numbers: number[]; // Array of numbers to visualize
  swapIndices?: [number, number]; // Indices of the boxes to swap
  timeTaken: number;
  swapColor: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  numbers,
  swapIndices,
  timeTaken,
  swapColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const swapOffsets = useRef([0, 0]); // Using refs for the x-offsets of the boxes to swap
  const swapDirections = useRef([1, -1]); // Using refs for the current directions of the movement (1 for right, -1 for left)
  const stopMotionX = useRef(false); // Using refs for the current directions of the movement (1 for up, -1 for down)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationFrameId: number;

    // Animation loop
    const render = () => {
      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the width and height of each square (assuming all squares have equal dimensions)
      const squareSize = (width - numbers.length * 50) / numbers.length;

      // Draw each square and the number it contains
      numbers.forEach((number, i) => {
        const padding = 5;
        const borderWidth = 2;
        const borderRadius = 10;

        // Colors for the fill and border
        const fillColor =
          swapIndices && swapIndices.includes(i)
            ? i == swapIndices[0]
              ? swapColor
                ? "#BF00FF"
                : "#ffcc00"
              : swapColor
              ? "#BF00FF"
              : "#39FF14"
            : "#66b3ff";

        const borderColor = "#333"; // Dark border color

        const x =
          i * (squareSize + padding) +
          (swapIndices && swapIndices.includes(i)
            ? swapOffsets.current[swapIndices.indexOf(i)]
            : 0); // x-coordinate of the square (for the animation)

        const y = squareSize - (swapIndices && swapIndices.includes(i) ? 0 : 0); // y-coordinate of the square (vertically centered)

        // Draw the square with a border
        ctx.beginPath();
        ctx.moveTo(x + borderRadius + borderWidth, y + borderWidth);
        ctx.arcTo(
          x + squareSize + borderWidth,
          y + borderWidth,
          x + squareSize + borderWidth,
          y + squareSize + borderWidth,
          borderRadius
        );
        ctx.arcTo(
          x + squareSize + borderWidth,
          y + squareSize + borderWidth,
          x + borderWidth,
          y + squareSize + borderWidth,
          borderRadius
        );
        ctx.arcTo(
          x + borderWidth,
          y + squareSize + borderWidth,
          x + borderWidth,
          y + borderWidth,
          borderRadius
        );
        ctx.arcTo(
          x + borderWidth,
          y + borderWidth,
          x + squareSize + borderWidth,
          y + borderWidth,
          borderRadius
        );
        ctx.closePath();
        ctx.fillStyle = borderColor;
        ctx.fill();

        // Draw the square with a fill color
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.arcTo(
          x + squareSize,
          y,
          x + squareSize,
          y + squareSize,
          borderRadius
        );
        ctx.arcTo(
          x + squareSize,
          y + squareSize,
          x,
          y + squareSize,
          borderRadius
        );
        ctx.arcTo(x, y + squareSize, x, y, borderRadius);
        ctx.arcTo(x, y, x + squareSize, y, borderRadius);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();

        // Draw the number
        ctx.fillStyle = "#000"; // Color of the text
        ctx.textBaseline = "middle"; // Align the text vertically in the middle of the square
        ctx.textAlign = "center"; // Align the text horizontally in the center of the square
        ctx.font = `bold ${squareSize / 2}px Arial`; // Set the font size relative to the square size
        ctx.fillText(String(number), x + squareSize / 2, y + squareSize / 2); // Draw the text
      });

      // // Update the offsets in the X axis for the next frame.
      // if (swapIndices) {
      //   swapOffsets.current = swapOffsets.current.map((offset, i) => {
      //     return offset + swapDirections.current[i] * 9;
      //   });

      //   if (Math.abs(swapOffsets.current[0]) >= squareSize * swapIndices[1]) {
      //     // If the boxes have reached their targets
      //     swapOffsets.current = [squareSize + 5, -squareSize - 5]; // Reset the offsets
      //     swapDirections.current = [0, 0]; // Reset the directions
      //   }
      // }

      // Request the next frame
      animationFrameId = requestAnimationFrame(render);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(render);

    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [numbers, width, height, swapIndices]); // Recalculate whenever numbers, width, height, or swapIndices changes

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
      {
        <div
          className={`text-center my-auto ps-4 ${
            timeTaken > 0 ? "showTimer" : "hideTimer"
          }`}
        >
          <div className="badge bg-primary">
            <p className=" fs-3">Time taken:</p>
            <span className=" fs-3">{timeTaken} ms</span>
          </div>
        </div>
      }
    </>
  );
};

export default Canvas;

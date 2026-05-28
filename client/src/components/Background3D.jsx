import React from "react";

// Simple 3D effect using gradients and SVG shapes
function Background3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#FF551D" stopOpacity="1" />
            <stop offset="100%" stopColor="#040815" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg1)" />
        <ellipse
          cx="30%"
          cy="80%"
          rx="400"
          ry="120"
          fill="#040815"
          opacity="0.25"
        />
        <ellipse
          cx="70%"
          cy="90%"
          rx="300"
          ry="100"
          fill="#040815"
          opacity="0.18"
        />
        <ellipse
          cx="50%"
          cy="30%"
          rx="250"
          ry="80"
          fill="#040815"
          opacity="0.12"
        />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-shecan_orange/80 via-shecan_orange/60 to-shecan_blue/80 opacity-60" />
    </div>
  );
}

export default Background3D;

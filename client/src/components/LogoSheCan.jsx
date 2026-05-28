import React from "react";

function LogoSheCan({ className = "w-16 h-16 mx-auto mb-4" }) {
  // SVG silhouette logo (simplified)
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="100" fill="#FF551D" />
      <path
        d="M60 120 Q80 80 100 100 Q120 120 140 80 Q160 120 120 160 Q80 160 60 120 Z"
        fill="#040815"
      />
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial"
      >
        She
      </text>
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial"
      >
        Can!
      </text>
    </svg>
  );
}

export default LogoSheCan;

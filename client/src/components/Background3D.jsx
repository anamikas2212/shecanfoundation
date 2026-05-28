import React, { useEffect, useRef } from "react";

function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse coordinates (centered by default)
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D floating glowing spheres (orbs)
    const orbs = [];
    const orbColors = [
      { start: "rgba(255, 85, 29, 0.35)", end: "rgba(255, 85, 29, 0)" },  // She Can Orange
      { start: "rgba(4, 8, 21, 0.6)", end: "rgba(4, 8, 21, 0)" },        // She Can Blue/Dark
      { start: "rgba(255, 120, 70, 0.25)", end: "rgba(255, 120, 70, 0)" }, // Light Orange/Coral
      { start: "rgba(20, 35, 75, 0.45)", end: "rgba(20, 35, 75, 0)" }      // Deep Indigo
    ];

    const numOrbs = 8;
    for (let i = 0; i < numOrbs; i++) {
      const radius = Math.random() * 200 + 180; // Large, soft glowing orbs
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: radius,
        color: orbColors[i % orbColors.length],
        depth: Math.random() * 0.6 + 0.2, // 3D depth factor: 0.2 (farther/slower) to 0.8 (closer/faster)
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.002
      });
    }

    // Twinkling background stars/particles
    const particles = [];
    const numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random(),
        alphaSpeed: Math.random() * 0.01 + 0.005,
        depth: Math.random() * 0.8 + 0.2
      });
    }

    // Animation Loop
    const draw = () => {
      // Smooth mouse interpolation (easing)
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      // Draw background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, "#02040b"); // Extremely premium deep obsidian
      bgGrad.addColorStop(0.5, "#060a17");
      bgGrad.addColorStop(1, "#120603");  // Subtle deep glowing orange hint at bottom right
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars/dust particles
      particles.forEach((p) => {
        // Dynamic drift + 3D parallax offset
        const parallaxX = (mouse.x - canvas.width / 2) * p.depth * 0.08;
        const parallaxY = (mouse.y - canvas.height / 2) * p.depth * 0.08;
        
        let drawX = p.x + parallaxX;
        let drawY = p.y + parallaxY;

        // Wrap around screen boundaries elegantly
        if (drawX < 0) p.x = canvas.width;
        if (drawX > canvas.width) p.x = 0;
        if (drawY < 0) p.y = canvas.height;
        if (drawY > canvas.height) p.y = 0;

        p.x += p.vx;
        p.y += p.vy;

        // Twinkle effect
        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0) p.alphaSpeed = -p.alphaSpeed;
        p.alpha = Math.max(0, Math.min(1, p.alpha));

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
        ctx.fill();
      });

      // Draw floating glowing 3D spheres
      orbs.forEach((orb) => {
        // Drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft boundaries wrapping
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // 3D Parallax offset based on mouse position and depth
        const parallaxX = (mouse.x - canvas.width / 2) * orb.depth * 0.12;
        const parallaxY = (mouse.y - canvas.height / 2) * orb.depth * 0.12;

        // Subtle organic orbit movement
        orb.angle += orb.angularSpeed;
        const orbitX = Math.cos(orb.angle) * 20;
        const orbitY = Math.sin(orb.angle) * 20;

        const finalX = orb.x + parallaxX + orbitX;
        const finalY = orb.y + parallaxY + orbitY;

        // Create 3D radial gradient for soft-glowing spherical volume
        const grad = ctx.createRadialGradient(
          finalX - orb.radius * 0.15, // offset highlight for 3D sphere volume
          finalY - orb.radius * 0.15,
          orb.radius * 0.05,
          finalX,
          finalY,
          orb.radius
        );
        grad.addColorStop(0, orb.color.start);
        grad.addColorStop(1, orb.color.end);

        ctx.beginPath();
        ctx.arc(finalX, finalY, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 block pointer-events-none"
    />
  );
}

export default Background3D;

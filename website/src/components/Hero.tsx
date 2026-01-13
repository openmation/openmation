"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Chrome, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AutomationDemo } from "./AutomationDemo";

const rotatingWords = [
  "Signups",
  "Form Filling",
  "Data Entry",
  "Testing",
  "Reporting",
];

// Premium gradient mesh background - Linear/Apple quality
function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Gradient orbs configuration
    const orbs = [
      { x: 0.3, y: 0.2, radius: 0.4, color: 'rgba(6, 182, 212, 0.15)', speed: 0.0003 },  // cyan
      { x: 0.7, y: 0.3, radius: 0.5, color: 'rgba(59, 130, 246, 0.12)', speed: 0.0004 }, // blue
      { x: 0.5, y: 0.7, radius: 0.45, color: 'rgba(37, 99, 235, 0.1)', speed: 0.00035 }, // deep blue
      { x: 0.2, y: 0.8, radius: 0.35, color: 'rgba(6, 182, 212, 0.08)', speed: 0.00045 }, // cyan light
    ];
    
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      orbs.forEach((orb, i) => {
        // Subtle movement
        const offsetX = Math.sin(time * orb.speed + i) * 0.1;
        const offsetY = Math.cos(time * orb.speed + i * 1.5) * 0.08;
        
        const x = (orb.x + offsetX) * canvas.width;
        const y = (orb.y + offsetY) * canvas.height;
        const radius = orb.radius * Math.min(canvas.width, canvas.height);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

// Floating particles - using deterministic seeded values to avoid hydration mismatch
function FloatingParticles() {
  // Pre-computed deterministic particle positions to avoid SSR/client mismatch
  const particles = [
    { id: 0, x: 12.5, y: 8.3, size: 1.8, duration: 28, delay: 3, opacity: 0.25 },
    { id: 1, x: 45.2, y: 15.7, size: 2.1, duration: 35, delay: 8, opacity: 0.32 },
    { id: 2, x: 78.9, y: 22.4, size: 1.5, duration: 42, delay: 12, opacity: 0.28 },
    { id: 3, x: 23.6, y: 38.9, size: 2.4, duration: 31, delay: 5, opacity: 0.35 },
    { id: 4, x: 56.1, y: 45.2, size: 1.9, duration: 38, delay: 15, opacity: 0.22 },
    { id: 5, x: 89.4, y: 52.8, size: 2.2, duration: 25, delay: 1, opacity: 0.38 },
    { id: 6, x: 34.7, y: 61.3, size: 1.6, duration: 44, delay: 18, opacity: 0.3 },
    { id: 7, x: 67.3, y: 68.9, size: 2.7, duration: 29, delay: 7, opacity: 0.26 },
    { id: 8, x: 8.9, y: 75.4, size: 1.4, duration: 36, delay: 11, opacity: 0.4 },
    { id: 9, x: 91.2, y: 82.1, size: 2.0, duration: 33, delay: 4, opacity: 0.33 },
    { id: 10, x: 42.8, y: 88.6, size: 1.7, duration: 40, delay: 16, opacity: 0.27 },
    { id: 11, x: 75.5, y: 5.2, size: 2.3, duration: 27, delay: 9, opacity: 0.36 },
    { id: 12, x: 18.3, y: 28.7, size: 1.3, duration: 45, delay: 2, opacity: 0.24 },
    { id: 13, x: 51.9, y: 35.1, size: 2.6, duration: 32, delay: 14, opacity: 0.31 },
    { id: 14, x: 84.6, y: 42.6, size: 1.8, duration: 39, delay: 6, opacity: 0.29 },
    { id: 15, x: 27.4, y: 55.9, size: 2.1, duration: 26, delay: 19, opacity: 0.37 },
    { id: 16, x: 60.1, y: 63.4, size: 1.5, duration: 43, delay: 10, opacity: 0.23 },
    { id: 17, x: 93.8, y: 71.8, size: 2.4, duration: 30, delay: 0, opacity: 0.34 },
    { id: 18, x: 36.5, y: 78.3, size: 1.9, duration: 37, delay: 13, opacity: 0.28 },
    { id: 19, x: 69.2, y: 85.7, size: 2.2, duration: 34, delay: 17, opacity: 0.39 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity + 0.15, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Grid pattern overlay
function GridPattern() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)',
      }}
    />
  );
}

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Premium gradient mesh background */}
      <GradientMesh />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Grid pattern */}
      <GridPattern />

      <div className="container-custom relative z-10 pt-32 md:pt-40 pb-20">
        {/* Open Source Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Link 
            href="https://github.com/openmation"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 text-sm font-medium text-foreground/80 hover:text-foreground transition-all group"
          >
            <Github className="w-4 h-4" />
            <span>100% Open Source</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Logo centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/openmation.png"
            alt="Openmation"
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
          />
        </motion.div>

        {/* Main headline - Clean like Antigravity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-[1.1]">
            Automate your{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="logo-gradient-text"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Turn repetitive browser tasks into one-click automations.
            <br className="hidden sm:block" />
            Record once, replay forever, share with anyone.
          </p>

          {/* CTA Buttons - Antigravity style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="#get-started" className="btn-primary text-base px-8 py-4">
              <Chrome className="w-5 h-5" />
              <span>Download for Chrome</span>
            </Link>
            <Link 
              href="https://github.com/openmation" 
              target="_blank"
              className="btn-secondary text-base px-8 py-4"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </Link>
          </div>

          {/* Word indicators */}
          <div className="flex items-center justify-center gap-2 mb-16">
            {rotatingWords.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWordIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentWordIndex
                    ? "w-8 bg-foreground"
                    : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Automation Demo - in dark card like Antigravity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <AutomationDemo />
        </motion.div>
      </div>
    </section>
  );
}

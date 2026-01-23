"use client";

import { useEffect, useRef } from "react";

export function ShinySandBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Particle configuration
        const particleCount = 200; // Adjust density
        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

        // Mouse interaction
        const mouse = { x: 0, y: 0 };
        let isMouseMoving = false;
        let timeoutId: NodeJS.Timeout;

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2,
                    alpha: Math.random() * 0.5 + 0.1,
                });
            }
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            isMouseMoving = true;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
        };

        initParticles();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                // Basic movement
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction (Shiny effect)
                let opacity = p.alpha;
                let scale = 1;

                if (isMouseMoving) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        // Particles near cursor shine brighter and might move slightly away
                        opacity = Math.min(1, p.alpha + (1 - distance / 200));
                        scale = 1 + (1 - distance / 200);

                        // Gentle push
                        p.x += dx * 0.01;
                        p.y += dy * 0.01;
                    }
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}

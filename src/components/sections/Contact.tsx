"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function Contact() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setSize();
        window.addEventListener("resize", setSize);

        // --- Physics & Entities ---

        class Ripple {
            x: number;
            y: number;
            radius: number;
            maxRadius: number;
            alpha: number;
            speed: number;

            constructor(x: number, y: number, isBig: boolean = false) {
                this.x = x;
                this.y = y;
                this.radius = 0;
                this.maxRadius = isBig ? 100 : 30;
                this.alpha = isBig ? 0.8 : 0.3;
                this.speed = isBig ? 1.5 : 0.8;
            }

            update() {
                this.radius += this.speed;
                this.alpha -= 0.01;
            }

            draw(ctx: CanvasRenderingContext2D) {
                if (this.alpha <= 0) return;
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            }
        }

        class Food {
            x: number;
            y: number;
            size: number;
            vy: number;
            alpha: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = 0;
                this.vy = 0;
                this.alpha = 1;
            }

            update() {
                // Grow effect on spawn
                if (this.size < 3) this.size += 0.2;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = `rgba(189, 142, 108, ${this.alpha})`; // Brownish pellet
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Fish {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            speed: number;
            angle: number;
            targetAngle: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.angle = Math.random() * Math.PI * 2;
                this.targetAngle = this.angle;
                this.speed = 1 + Math.random() * 1;
                this.vx = 0;
                this.vy = 0;
                this.size = 5 + Math.random() * 5;
                const colors = ["#ff5733", "#f2f2f2", "#d32f2f", "#ffca28"];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(foods: Food[]) {
                // Seek food logic
                let targetX = this.x + Math.cos(this.angle) * 100;
                let targetY = this.y + Math.sin(this.angle) * 100;
                let chasing = false;

                if (foods.length > 0) {
                    let closestFood: Food | null = null;
                    let minDist = 300; // Awareness radius

                    for (const food of foods) {
                        const dx = food.x - this.x;
                        const dy = food.y - this.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < minDist) {
                            minDist = dist;
                            closestFood = food;
                        }
                    }

                    if (closestFood) {
                        targetX = closestFood.x;
                        targetY = closestFood.y;
                        chasing = true;

                        // Interaction: Eat food
                        if (minDist < 10) {
                            const index = foods.indexOf(closestFood);
                            if (index > -1) foods.splice(index, 1);
                            // Ripple on eat
                            ripples.push(new Ripple(this.x, this.y, false));
                        }
                    }
                }

                // Smooth rotation
                const angleToTarget = Math.atan2(targetY - this.y, targetX - this.x);
                let diff = angleToTarget - this.angle;
                while (diff <= -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;

                // Turn speed
                const turnSpeed = chasing ? 0.08 : 0.03;
                this.angle += diff * turnSpeed;

                // Speed adjustment
                const targetSpeed = chasing ? 3.5 : 1.5;
                this.speed += (targetSpeed - this.speed) * 0.05;

                // Move
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.x += this.vx;
                this.y += this.vy;

                // Screen Wrap
                const margin = 50;
                if (this.x < -margin) this.x = width + margin;
                if (this.x > width + margin) this.x = -margin;
                if (this.y < -margin) this.y = height + margin;
                if (this.y > height + margin) this.y = -margin;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Body
                ctx.fillStyle = this.color;
                ctx.beginPath();
                // Simpler, elegant fish shape
                ctx.ellipse(0, 0, this.size * 2, this.size * 0.8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Tail (animated slightly)
                const tailWag = Math.sin(Date.now() * 0.01) * 0.5;
                ctx.beginPath();
                ctx.moveTo(-this.size * 1.5, 0);
                ctx.lineTo(-this.size * 3, -this.size + tailWag);
                ctx.lineTo(-this.size * 3, this.size + tailWag);
                ctx.fill();

                ctx.restore();
            }
        }

        const fishes = Array.from({ length: 12 }, () => new Fish());
        let foods: Food[] = [];
        let ripples: Ripple[] = [];

        // Animation Loop
        const render = () => {
            // Trail effect for water
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, width, height);

            // Ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.update();
                r.draw(ctx);
                if (r.alpha <= 0) ripples.splice(i, 1);
            }

            // Foods
            for (const food of foods) {
                food.update();
                food.draw(ctx);
            }

            // Fishes
            for (const fish of fishes) {
                fish.update(foods);
                fish.draw(ctx);
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        // Mouse Interactions
        const handleMouseMove = (e: MouseEvent) => {
            // Rate limit ripples
            if (Math.random() > 0.8) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ripples.push(new Ripple(x, y, false));
            }
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Big ripple
            ripples.push(new Ripple(x, y, true));

            // Smooth food burst
            const foodCount = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < foodCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 20;
                foods.push(new Food(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist));
            }
        };

        canvas.addEventListener("mousemove", handleMouseMove as any);
        canvas.addEventListener("mousedown", handleClick as any);

        return () => {
            window.removeEventListener("resize", setSize);
            canvas.removeEventListener("mousemove", handleMouseMove as any);
            canvas.removeEventListener("mousedown", handleClick as any);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="contact" className="relative h-screen min-h-[600px] bg-black overflow-hidden flex items-center justify-center">
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 cursor-crosshair"
            />

            {/* Content Overlay */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter mix-blend-difference">
                    Say Hello.
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto mix-blend-difference">
                    I'm currently available for freelance work and open collaborations.
                    Drop a line, or just feed the fish.
                </p>

                <a
                    href="mailto:rkhdinar00@gmail.com"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform hover:bg-zinc-200"
                >
                    <Mail className="w-5 h-5" />
                    rkhdinar00@gmail.com
                    <ArrowRight className="w-5 h-5" />
                </a>
            </motion.div>
        </section>
    );
}

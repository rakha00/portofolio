"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function About() {
    const [experience, setExperience] = useState("3 Months");

    useEffect(() => {
        const startDate = new Date(2026, 1, 1); // February 2026 (0-indexed month 1)
        const currentDate = new Date();
        
        let years = currentDate.getFullYear() - startDate.getFullYear();
        let months = currentDate.getMonth() - startDate.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }

        let durationStr = "";
        if (years >= 1) {
            if (months > 0) {
                durationStr = `${years} Yr ${months} Mo`;
            } else {
                durationStr = `${years} Year${years > 1 ? 's' : ''}`;
            }
        } else {
            durationStr = `${months} Month${months > 1 ? 's' : ''}`;
        }

        // Defer state update to avoid cascading synchronous renders lint error
        const handle = setTimeout(() => {
            setExperience(durationStr);
        }, 0);

        return () => clearTimeout(handle);
    }, []);

    return (
        <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-6 uppercase tracking-widest">
                            <span className="w-12 h-[1px] bg-indigo-500"></span>
                            About Me
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                            Transforming Ideas <br />
                            <span className="text-zinc-500 italic">Into Digital Reality.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                            <p>
                                I graduated from <strong className="text-white font-medium">Gunadarma University (2025)</strong>, majoring in <strong className="text-white font-medium">Informatics</strong>, and I am now working as a <strong className="text-white font-medium">Software Engineer</strong>.
                                My academic and practical background has equipped me with a strong foundation in software engineering and problem-solving strategies.
                            </p>
                            <p>
                                With a robust command of <strong className="text-white font-medium">Laravel</strong> and modern frontend frameworks like <strong className="text-white font-medium">Next.js</strong>,
                                I focus on developing scalable, efficient, and user-centric web applications. I am committed to writing clean, maintainable code that delivers real value.
                            </p>
                            <p>
                                I am constantly refining my skills to stay at the forefront of web technology, ensuring high-quality results in every project I undertake.
                            </p>
                        </div>


                    </motion.div>

                    {/* Image Area - Transparent Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Glow effect behind the cutout image */}
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full -z-10 scale-75" />

                        <div className="relative w-full max-w-md aspect-square lg:aspect-[3/4]">
                            <Image
                                src="/images/profile.webp"
                                alt="Rakhadinar Jaladara"
                                fill
                                className="object-contain drop-shadow-2xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            {/* Decorative Bottom Overlay to hide cut-off */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] lg:w-[120%] lg:bottom-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 z-20">
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Experience</span>
                                    <span className="text-white font-bold font-serif text-lg">{experience}</span>
                                </div>
                                <div className="h-8 w-[1px] bg-zinc-700"></div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Focus</span>
                                    <span className="text-indigo-400 font-bold text-sm">Web Development</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

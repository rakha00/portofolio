"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal } from "lucide-react";
import Link from "next/link";
import { ShinySandBackground } from "../ui/ShinySandBackground";

export function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
            {/* Interactive Background */}
            <div className="absolute inset-0 bg-zinc-950" />
            <ShinySandBackground />

            {/* Tech Grid Overlay (subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center text-center">



                    {/* Name - Aesthetic Serif */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative mb-4 text-6xl sm:text-7xl md:text-9xl font-serif font-bold tracking-tight text-zinc-100 drop-shadow-2xl z-20"
                    >
                        Rakhadinar <span className="text-zinc-500 font-italic">Jaladara</span>
                    </motion.h1>

                    {/* Title - Tech/Mono with Glow */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-8 relative group"
                    >
                        <div className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h2 className="relative flex items-center justify-center gap-3 text-lg sm:text-2xl font-mono text-indigo-400 tracking-widest uppercase">
                            <Code className="w-5 h-5 md:w-6 md:h-6" />
                            Web Developer
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-2 h-5 bg-indigo-500 block"
                            />
                        </h2>
                    </motion.div>

                    {/* Bio - Satirical & Relaxed */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl leading-relaxed font-light"
                    >
                        &quot;A fresh graduate pretending to know what I&apos;m doing. I center divs for a living, copy-paste from <span className="line-through decoration-red-500 decoration-2 text-zinc-500">Documentation</span>  ChatGPT with style, and occasionally break production just to feel something.&quot;
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 z-20"
                    >
                        <Link
                            href="#projects"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-zinc-50 px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-zinc-200 hover:ring-offset-2 hover:ring-offset-zinc-950"
                        >
                            <span className="mr-2">See My Mess</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#contact"
                            className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-800 bg-black px-8 font-medium text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white"
                        >
                            <Terminal className="mr-2 h-4 w-4" />
                            Send Help
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative blurred glow at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                        Available for Work
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500"
                    >
                        Web Developer & <br />
                        UI/UX Enthusiast
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8 max-w-2xl text-lg text-zinc-400 sm:text-xl"
                    >
                        I build accessible, pixel-perfect, peerless user experiences for the web.
                        Focused on creating clean and modern interfaces with Next.js.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                        >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-900"
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 bg-indigo-500 blur-[100px] rounded-full pointing-events-none" />
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-24 bg-zinc-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white">
                            About Me
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                            Hello! I'm a fresh graduate from <span className="text-indigo-400 font-semibold">Gunadarma University</span> (Class of 2025), majesty in Informatics.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                            My journey into web development began with a curiosity for building practical solutions to everyday problems. I love the process of turning an idea into a functional application that can help others.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            While I have a strong foundation in <span className="text-indigo-400 font-semibold">Laravel</span> and PHP, I am currently expanding my horizons with modern frontend technologies like <strong>Next.js</strong> and <strong>React</strong> to build even more dynamic and responsive user experiences.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative Box / Placeholder for Image */}
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm p-8 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-all duration-500" />
                            <span className="text-zinc-500 font-mono text-xl z-10">[ Profile Photo Placeholder ]</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

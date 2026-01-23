"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        title: "Project Alpha",
        description: "A placeholder for your first project. Describe the problem you solved and the technologies used.",
        tags: ["Next.js", "Tailwind", "PostgreSQL"],
        image: "/images/project-1.jpg", // We will need to handle this image later
        demoUrl: "#",
        repoUrl: "#",
    },
    {
        title: "Project Beta",
        description: "A placeholder for your second project. Focus on the features and your role in development.",
        tags: ["Laravel", "MySQL", "Bootstrap"],
        image: "/images/project-2.jpg",
        demoUrl: "#",
        repoUrl: "#",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-zinc-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Here are some of the projects I've worked on.
                    </motion.p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-colors"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-video bg-zinc-800 w-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/0 transition-colors" />
                                <div className="flex items-center justify-center h-full text-zinc-600">
                                    <span>Image Placeholder</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-zinc-400 mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        href={project.demoUrl}
                                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </Link>
                                    <Link
                                        href={project.repoUrl}
                                        className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        Source Code
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

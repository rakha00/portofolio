"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, ChevronLeft, ChevronRight, Database, Brain, BookOpen } from "lucide-react";

interface Project {
    title: string;
    role: string;
    description: string;
    tech: string[];
    images?: string[];
    category?: string;
    liveUrl?: string;
    repoUrl?: string;
    features?: string[];
}

const featuredProjects: Project[] = [
    {
        title: "Global Servis Int.",
        role: "Freelance Fullstack Developer",
        description: "A comprehensive production system for inventory, attendance, invoicing, and e-commerce management. Built to streamline operations for a service-based business.",
        tech: ["Laravel", "MySQL", "Livewire", "Filament", "Tailwind"],
        images: [
            "/projects/globalservis/globalservis-1.webp",
            "/projects/globalservis/globalservis-2.webp",
            "/projects/globalservis/globalservis-3.webp",
            "/projects/globalservis/globalservis-4.webp",
        ],
        liveUrl: "https://globalservis-int.com",
        repoUrl: "https://github.com/rakha00/ac-management-e-commerce",
        features: [
            "QR-based attendance system with geo-fencing & photo verification",
            "Role-based Access Control (Super Admin, Staff, Technician, Sales)",
            "Automated PDF Invoicing & Delivery Notes generation",
            "Real-time Inventory Management & Excel Reporting"
        ]
    },
    {
        title: "Mie Newmind",
        role: "Frontend Developer",
        description: "A modern, premium restaurant franchise promotion website built with Next.js 16 and Tailwind CSS v4.",
        tech: ["NextJs", "TypeScript", "Tailwind", "FramerMotion", "MDX"],
        images: [
            "/projects/mienewmind/mienewmind-1.webp",
            "/projects/mienewmind/mienewmind-2.webp",
            "/projects/mienewmind/mienewmind-3.webp",
            "/projects/mienewmind/mienewmind-4.webp",
        ],
        liveUrl: "https://mie-newmind.vercel.app/",
        repoUrl: "https://github.com/rakha00/mie-newmind",
        features: [
            "Responsive Design: Fully responsive layout for all devices.",
            "Modern UI/UX: clean, aesthetic, and dynamic interface using Framer Motion.",
            "Franchise Information: Detailed investment and partnership opportunities.",
        ]
    }
];

const otherProjects: Project[] = [
    {
        title: "Depublic",
        role: "Backend Developer (Capstone)",
        category: "Event Platform",
        description: "Event ticket booking platform integrated with Midtrans payment gateway. Handled end-to-end transaction flow, email ticket delivery, and backend API services.",
        tech: ["Laravel 10", "MySQL", "REST API", "Midtrans"],
        repoUrl: "https://github.com/rakha00/depublic"
    },
    {
        title: "Skoolio",
        role: "Fullstack Developer",
        category: "LMS Simulation",
        description: "Learning Management System simulation with role-based access for instructors and students. Features course creation, lesson management, and enrollment tracking.",
        tech: ["Laravel", "Blade", "MySQL"],
        repoUrl: "https://github.com/rakha00/skoolio-learning-management-system"
    },
    {
        title: "Plant Disease Recognition",
        role: "Machine Learning Engineer",
        category: "AI / Computer Vision",
        description: "CNN model trained to classify plant diseases from leaf images. Deployed with a Streamlit interface for easy image upload and real-time prediction.",
        tech: ["Python", "Keras", "Streamlit", "CNN"],
        repoUrl: "https://github.com/rakha00/Plant-Disease-Recognition"
    }
];

function FeaturedProject({ project }: { project: Project }) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = project.images || [];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative grid lg:grid-cols-12 gap-8 items-start mb-24"
        >
            {/* Project Image Carousel */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900/50 aspect-video group-hover:border-indigo-500/50 transition-colors duration-500">
                {/* Image Slider Container */}
                <div className="relative w-full h-full group/slider">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt={`${project.title} screenshot ${currentImage + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/800x450/18181b/indigo?text=Project+Screenshot";
                            }}
                        />
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Navigation (Visible only if multiple images) */}
                    {images.length > 1 && (
                        <>
                            <button onClick={(e) => { e.preventDefault(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-indigo-600 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 z-20"><ChevronLeft className="w-5 h-5" /></button>
                            <button onClick={(e) => { e.preventDefault(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-indigo-600 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 z-20"><ChevronRight className="w-5 h-5" /></button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {images.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrentImage(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-indigo-500 w-6' : 'bg-white/50 w-1.5 hover:bg-white'}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <div>
                    <span className="text-indigo-400 font-mono text-xs tracking-wider uppercase mb-2 block">{project.role}</span>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <div className="p-6 bg-[#111112] border border-zinc-800 rounded-xl shadow-xl hover:shadow-2xl hover:border-zinc-700 transition-all z-10 relative">
                        <p className="text-zinc-400 leading-relaxed text-sm">{project.description}</p>
                        {project.features && (
                            <ul className="mt-4 space-y-2">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-zinc-500 text-xs md:text-sm">
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 shrink-0"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8 mt-6">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs font-mono rounded-full border border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-300 transition-colors cursor-default">{tech}</span>
                    ))}
                </div>
                <div className="flex items-center gap-6">
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"><Github className="w-5 h-5" /> Source Code</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"><ArrowUpRight className="w-4 h-4" /> Visit Site</a>}
                </div>
            </div>
        </motion.div>
    );
}

function CompactProjectCard({ project, index }: { project: Project; index: number }) {
    // Choose icon based on category or content
    const Icon = project.title.includes("Plant") ? Brain : project.title.includes("Skoolio") ? BookOpen : Database;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex flex-col bg-zinc-900/30 border border-zinc-800/50 hover:border-indigo-500/50 rounded-xl overflow-hidden hover:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Header / Placeholder for Image */}
            <div className="h-48 bg-gradient-to-br from-zinc-900 to-zinc-950 border-b border-zinc-800 group-hover:from-indigo-950/20 group-hover:to-zinc-950 transition-colors flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="w-12 h-12 text-zinc-700 group-hover:text-indigo-500/80 transition-colors duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500">
                        {project.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}
                        {project.tech.length > 3 && <span>+{(project.tech.length - 3)}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-[#09090b] relative border-t border-zinc-900">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-6 uppercase tracking-widest">
                        <span className="w-12 h-[1px] bg-indigo-500"></span>
                        Selected Works
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                        Stuff I&apos;ve Built <span className="text-indigo-500">.</span>
                    </h2>
                </div>

                {/* Featured Projects */}
                <div>
                    {featuredProjects.map((project) => (
                        <FeaturedProject key={project.title} project={project} />
                    ))}
                </div>

                {/* Other Projects Grid */}
                <div className="mt-24">
                    <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Other Noteworthy Projects</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <CompactProjectCard key={project.title} project={project} index={index} />
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <a
                        href="https://github.com/rakha00"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full border border-zinc-700 hover:border-indigo-500 transition-all duration-300 group"
                    >
                        View Full Project Archive
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                </div>
            </div>
        </section>
    );
}

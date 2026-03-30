"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface JobExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  logoSrc: string;
  description: string;
  projects: {
    id: string;
    title: string;
    roleName: string;
    url?: string;
    description: string;
    imageSrc?: string;
  }[];
}

const experiences: JobExperience[] = [
  {
    id: "dtn",
    company: "PT. Dunia Teknologi Nusantara",
    role: "Software Engineer",
    period: "February 2026 - Present",
    logoSrc: "/images/company-logo/dtn.png",
    description:
      "Focusing on delivering high-quality user experiences and scalable backend services.",
    projects: [
      {
        id: "cebanmatters",
        title: "CebanMatters",
        roleName: "Quality Control / Tester",
        url: "https://cebanmatters.com/",
        description:
          "Responsible for comprehensive testing and quality assurance of the main landing page and platform flow.",
        imageSrc: "/projects/cebanmatters/cebanmatters-1.png",
      },
      {
        id: "gold-management-system",
        title: "Gold Management System",
        roleName: "Backend Engineer",
        description:
          "Currently in development mode. Designed and developed the backend architecture and API endpoints for managing internal trading data.",
      },
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-[#09090b] relative border-t border-zinc-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-6 uppercase tracking-widest">
            <span className="w-12 h-[1px] bg-indigo-500"></span>
            Career Path
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
            Professional Experience <span className="text-indigo-500">.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: expIndex * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line (Mobile mostly, or left-sided desktop) */}
              <div className="hidden md:block absolute left-[39.5px] top-10 bottom-0 w-px bg-zinc-800" />

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
                {/* Left Side Timeline Markers (Desktop) */}
                <div className="hidden md:flex flex-col items-center mt-2 w-[80px] shrink-0">
                  <div className="w-20 h-20 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-xl p-2 relative z-10 overflow-hidden">
                    {/* Company Logo */}
                    <div className="relative w-full h-full">
                      <img
                        src={exp.logoSrc}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                        onError={(e) => {
                          // This will just show a gray block with text if image cannot be loaded initially
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML =
                            '<span class="text-xs font-bold text-zinc-500 uppercase">' +
                            exp.company.substring(0, 3) +
                            "</span>";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Details */}
                <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 hover:border-indigo-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        {exp.role}
                      </h3>
                      <div className="text-lg text-indigo-400 font-medium mt-1 mb-1">
                        {exp.company}
                      </div>
                      <div className="text-zinc-500 text-sm font-mono flex items-center gap-2">
                        {exp.period}
                      </div>
                    </div>

                    {/* Mobile Logo Fallback */}
                    <div className="md:hidden w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-xl relative overflow-hidden flex items-center justify-center p-2 mb-4">
                      <img
                        src={exp.logoSrc}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML =
                            '<span class="text-[10px] font-bold text-zinc-500">' +
                            exp.company.substring(0, 3) +
                            "</span>";
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-white font-semibold text-lg border-b border-zinc-800 pb-2">
                      Key Projects & Responsibilities
                    </h4>

                    {exp.projects.map((project, idx) => (
                      <div
                        key={project.id}
                        className="bg-[#111112] border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-300"
                      >
                        <div className="flex flex-col lg:flex-row gap-6">
                          {project.imageSrc && (
                            <div className="lg:w-1/3 shrink-0 rounded-lg overflow-hidden border border-zinc-800 aspect-video relative bg-zinc-900">
                              <img
                                src={project.imageSrc}
                                alt={`${project.title} screenshot`}
                                className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.parentElement!.innerHTML =
                                    '<div class="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm font-mono p-4 text-center">Insert ' +
                                    project.title +
                                    " Screenshot Here (" +
                                    project.imageSrc +
                                    ")</div>";
                                }}
                              />
                            </div>
                          )}

                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                <h5 className="text-white font-bold text-lg">
                                  {project.title}
                                </h5>
                              </div>
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                  Visit <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <span className="text-xs font-mono text-zinc-500 mb-3 px-2 py-1 bg-zinc-900 rounded-md inline-block w-max">
                              Role: {project.roleName}
                            </span>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

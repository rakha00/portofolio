"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-black py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <span className="text-xl font-bold tracking-tight text-white">Portfolio.</span>
                        <p className="text-sm text-zinc-400">
                            © {new Date().getFullYear()} Built with Next.js & Tailwind CSS.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="https://github.com" className="text-zinc-400 transition-colors hover:text-white">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://linkedin.com" className="text-zinc-400 transition-colors hover:text-white">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="mailto:example@example.com" className="text-zinc-400 transition-colors hover:text-white">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

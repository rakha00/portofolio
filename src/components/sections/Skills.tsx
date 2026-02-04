"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Globe, Layout, Server, Terminal, Layers, LayoutDashboard, FileJson } from "lucide-react";
import { Highlight, themes, Prism } from "prism-react-renderer";
import Image from "next/image";

(typeof global !== "undefined" ? global : window).Prism = Prism;
/* eslint-disable @typescript-eslint/no-require-imports */
require("prismjs/components/prism-markup-templating"); // Required for PHP
require("prismjs/components/prism-php");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-tsx");
/* eslint-enable @typescript-eslint/no-require-imports */

interface Skill {
    id: string;
    name: string;
    category: string;
    icon: React.ElementType;
    iconUrl?: string;
    description: string;
    code: string;
    language: string;
}

const skills: Skill[] = [
    {
        id: "laravel",
        name: "Laravel",
        category: "Backend",
        icon: Server,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        description: "The PHP Framework for Web Artisans. Perfect for building robust, scalable full-stack applications and APIs.",
        language: "php",
        code: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/projects', [ProjectController::class, 'store']);
});`
    },
    {
        id: "filament",
        name: "Filament",
        category: "Admin",
        icon: LayoutDashboard,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/filamentphp/filamentphp-original.svg",
        description: "A collection of tools for rapidly building beautiful TALL stack administration panels.",
        language: "php",
        code: `<?php

public static function form(Form $form): Form
{
    return $form
        ->schema([
            TextInput::make('name')
                ->required()
                ->maxLength(255),
            Select::make('status')
                ->options([
                    'draft' => 'Draft',
                    'published' => 'Published',
                ])
                ->required(),
        ]);
}`
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "Frontend",
        icon: Globe,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        description: "The React Framework for the Web. Used for building performant full-stack web applications.",
        language: "tsx",
        code: `export default async function Products() {
  const data = await getData();

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id} title={item.name} />
      ))}
    </div>
  );
}`
    },
    {
        id: "react",
        name: "React",
        category: "Frontend",
        icon: Code,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        description: "A JavaScript library for building user interfaces. Essential for creating interactive component-based UIs.",
        language: "tsx",
        code: `import { useState, useEffect } from 'react';

function UserProfile({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  if (!user) return <Loading />;
  return <h1>{user.name}</h1>;
}`
    },
    {
        id: "tailwind",
        name: "Tailwind",
        category: "CSS",
        icon: Layout,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
        language: "tsx",
        code: `<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img.jpg" alt="Preview" />
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Project</div>
      <p className="mt-2 text-slate-500">Built with rapid utility classes.</p>
    </div>
  </div>
</div>`
    },
    {
        id: "javascript",
        name: "JavaScript",
        category: "Lang",
        icon: Terminal,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        description: "The programming language of the Web. Used to create dynamic content and handle client-side logic.",
        language: "javascript",
        code: `const processData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.filter(item => item.isActive);
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};`
    },
    {
        id: "mysql",
        name: "MySQL",
        category: "DB",
        icon: Database,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        description: "A relational database management system developed by Oracle. Robust and widely used.",
        language: "sql",
        code: `SELECT 
    u.name, 
    COUNT(o.id) as total_orders
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id
ORDER BY total_orders DESC
LIMIT 5;`
    },
    {
        id: "postgresql",
        name: "PostgreSQL",
        category: "DB",
        icon: Database,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        description: "A powerful, open source object-relational database system with advanced features.",
        language: "sql",
        code: `CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);`
    },
    {
        id: "mongodb",
        name: "MongoDB",
        category: "DB",
        icon: FileJson,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        description: "A general purpose, document-based, distributed database built for modern application developers.",
        language: "javascript",
        code: `db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $group: { 
      _id: "$region", 
      totalRevenue: { $sum: "$amount" } 
  }},
  { $sort: { totalRevenue: -1 } }
]);`
    },
    {
        id: "git",
        name: "Git",
        category: "Tools",
        icon: Layers,
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        description: "A distributed version control system for tracking changes in source code during software development.",
        language: "bash",
        code: `git init
git add .
git commit -m "feat: implement user authentication"
git branch -M main
git remote add origin https://github.com/user/project.git
git push -u origin main`
    }
];

function SkillTile({ skill, selected, onClick }: { skill: Skill, selected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
        relative w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-3
        transition-all duration-300 group
        ${selected
                    ? "bg-indigo-600/10 border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.2)]"
                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-500"
                }
        border backdrop-blur-sm
      `}
        >
            {/* Icon */}
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                {skill.iconUrl ? (
                    <Image
                        src={skill.iconUrl}
                        alt={skill.name}
                        fill
                        className={`object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110 ${skill.id === 'filament' || skill.id === 'nextjs' ? 'invert' : ''}`}
                    />
                ) : (
                    <skill.icon className={`w-full h-full ${selected ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                )}
            </div>

            {/* Name */}
            <span className={`text-[10px] md:text-xs font-medium tracking-wide transition-colors ${selected ? "text-indigo-300" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                {skill.name}
            </span>
        </button>
    );
}

export function Skills() {
    const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);

    return (
        <section id="skills" className="py-24 bg-[#050505] relative">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Tech Stack <span className="text-indigo-500">.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg lg:mx-0 mx-auto">
                        My preferred stack for building fast, scalable, and modern applications.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* Left Column: Grid Tiles */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3 md:gap-4 order-2 lg:order-1">
                        {skills.map((skill) => (
                            <SkillTile
                                key={skill.id}
                                skill={skill}
                                selected={selectedSkill.id === skill.id}
                                onClick={() => setSelectedSkill(skill)}
                            />
                        ))}
                    </div>

                    {/* Right Column: Code Preview & Description */}
                    <div className="lg:sticky lg:top-24 order-1 lg:order-2 mb-8 lg:mb-0 min-w-0">
                        <div className="relative h-[500px] w-full"> {/* Fixed Height Container */}
                            <AnimatePresence mode="popLayout"> {/* popLayout for absolute positioning */}
                                <motion.div
                                    key={selectedSkill.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex flex-col" // Fill container
                                >
                                    {/* Description Wrapper */}
                                    <div className="space-y-6 h-full flex flex-col">
                                        {/* Title & Desc */}
                                        <div className="shrink-0">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg lg:hidden">
                                                    {selectedSkill.iconUrl ? (
                                                        <Image
                                                            src={selectedSkill.iconUrl}
                                                            alt={selectedSkill.name}
                                                            width={24}
                                                            height={24}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : null}
                                                </div>

                                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                                    {selectedSkill.name}
                                                </h3>
                                                <div className="h-px flex-1 bg-zinc-800"></div>
                                                <span className="text-xs font-mono px-2 py-1 bg-zinc-800/80 text-zinc-400 rounded border border-zinc-700">
                                                    {selectedSkill.category}
                                                </span>
                                            </div>
                                            <p className="text-zinc-400 text-lg leading-relaxed line-clamp-3">
                                                {selectedSkill.description}
                                            </p>
                                        </div>

                                        {/* Code Window */}
                                        <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-zinc-800 shadow-2xl relative ring-1 ring-white/5 flex-1 flex flex-col min-h-0">
                                            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-zinc-800/50 shrink-0">
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                                </div>
                                                <span className="text-xs text-zinc-500 font-mono">
                                                    {/* Short filename */}
                                                    {selectedSkill.id}.{selectedSkill.language === 'javascript' ? 'js' : selectedSkill.language}
                                                </span>
                                            </div>

                                            <div className="relative flex-1 overflow-hidden">
                                                <Highlight
                                                    theme={themes.vsDark}
                                                    code={selectedSkill.code}
                                                    language={selectedSkill.language}
                                                >
                                                    {({ style, tokens, getLineProps, getTokenProps }) => (
                                                        <pre
                                                            className="p-6 overflow-auto h-full text-sm font-mono leading-relaxed bg-transparent scrollbar-custom"
                                                            style={{ ...style, backgroundColor: 'transparent' }}
                                                        >
                                                            {tokens.map((line, i) => (
                                                                <div key={i} {...getLineProps({ line })} className="table-row">
                                                                    <span className="table-cell select-none text-zinc-700 text-right pr-4 w-8">{i + 1}</span>
                                                                    <span className="table-cell">
                                                                        {line.map((token, key) => (
                                                                            <span key={key} {...getTokenProps({ token })} />
                                                                        ))}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </pre>
                                                    )}
                                                </Highlight>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div >
            </div >
        </section >
    );
}

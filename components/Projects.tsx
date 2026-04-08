'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Ethereal',
    category: 'E-Commerce',
    image: 'https://picsum.photos/seed/ethereal/800/600',
  },
  {
    id: 2,
    title: 'Nexus',
    category: 'Fintech Dashboard',
    image: 'https://picsum.photos/seed/nexus/800/600',
  },
  {
    id: 3,
    title: 'Aura',
    category: 'Brand Identity',
    image: 'https://picsum.photos/seed/aura/800/600',
  },
  {
    id: 4,
    title: 'Lumina',
    category: 'Web3 Platform',
    image: 'https://picsum.photos/seed/lumina/800/600',
  }
];

export function Projects() {
  return (
    <section id="work" className="pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-syne font-bold tracking-tighter"
          >
            Selected Works
          </motion.h2>
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hover-target hidden md:flex items-center gap-2 font-syne font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors"
          >
            See All <ArrowUpRight size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative block cursor-pointer hover-target"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                {/* Subtle hover gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                <div>
                  <p className="font-manrope text-sm text-gray-300 mb-2 uppercase tracking-widest">{project.category}</p>
                  <h3 className="font-syne text-3xl font-bold">{project.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <a 
            href="#"
            className="hover-target flex items-center gap-2 font-syne font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors"
          >
            See All <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

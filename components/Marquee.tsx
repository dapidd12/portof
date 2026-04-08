'use client';

import { motion } from 'motion/react';

export function Marquee() {
  const text = " CREATIVE DEVELOPER • NEXT.JS EXPERT • MOTION ENTHUSIAST • ";
  
  return (
    <section className="bg-white text-black py-8 overflow-hidden relative z-10 flex items-center">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1035] }} // Approximate width of one text block to loop seamlessly
        transition={{ ease: "linear", duration: 10, repeat: Infinity }}
      >
        <h2 className="text-6xl md:text-8xl font-syne font-bold uppercase tracking-tighter shrink-0">
          {text}
        </h2>
        <h2 className="text-6xl md:text-8xl font-syne font-bold uppercase tracking-tighter shrink-0">
          {text}
        </h2>
        <h2 className="text-6xl md:text-8xl font-syne font-bold uppercase tracking-tighter shrink-0">
          {text}
        </h2>
      </motion.div>
    </section>
  );
}

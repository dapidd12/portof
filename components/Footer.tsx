'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={containerRef} className="bg-black relative z-0 h-[60vh] md:h-[80vh] overflow-hidden flex flex-col justify-end">
      {/* Spacer to push footer below the z-10 sections */}
      <div className="absolute inset-0 pointer-events-none" />
      
      <motion.div 
        style={{ y, opacity }}
        className="w-full text-center pb-8"
      >
        <div className="flex justify-between px-6 md:px-12 mb-12 font-manrope text-sm text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} KaiDeveloper</p>
          <div className="flex gap-6">
            <a href="#" className="hover-target hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover-target hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover-target hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        
        <h1 className="text-[15vw] leading-none font-syne font-bold tracking-tighter text-white whitespace-nowrap">
          KAIDEVELOPER
        </h1>
      </motion.div>
    </footer>
  );
}

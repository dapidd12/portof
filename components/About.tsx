'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const text = "I am a creative developer bridging the gap between design and engineering. I build immersive digital experiences that leave a lasting impression.";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 40%']
  });

  const words = text.split(' ');

  return (
    <section id="about" ref={containerRef} className="bg-black py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-5xl mx-auto">
        <p className="font-manrope text-sm text-gray-400 uppercase tracking-widest mb-12">About Me</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-syne font-bold leading-tight flex flex-wrap gap-x-4 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            
            return (
              <motion.span key={i} style={{ opacity }} className="inline-block">
                {word}
              </motion.span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

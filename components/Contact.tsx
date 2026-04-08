'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const whatsappNumber = "6282138305820";

  return (
    <section id="contact" ref={containerRef} className="bg-black py-32 px-6 md:px-12 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <motion.div style={{ y }} className="absolute top-0 left-10 md:left-32 opacity-20 hidden md:block">
          <MessageCircle size={120} />
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }} className="absolute bottom-0 right-10 md:right-32 opacity-20 hidden md:block">
          <MessageCircle size={80} />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl lg:text-[10rem] font-syne font-bold tracking-tighter mb-8"
        >
          Let&apos;s Talk
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-3xl font-manrope text-gray-400 max-w-3xl mx-auto mb-16"
        >
          Have a project in mind? Let&apos;s create something extraordinary together. I&apos;m currently available for freelance work.
        </motion.p>

        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hover-target inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-syne font-bold text-2xl hover:scale-105 transition-transform duration-300"
        >
          <MessageCircle size={32} />
          Chat on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}

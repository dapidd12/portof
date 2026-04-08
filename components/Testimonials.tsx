'use client';

import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Kai is an exceptional developer who truly understands the intersection of design and code. The attention to detail is unmatched.",
    author: "Sarah Jenkins",
    role: "Design Director, Studio X"
  },
  {
    quote: "Working with Kai elevated our digital presence to a whole new level. The animations and performance are world-class.",
    author: "Michael Chen",
    role: "Founder, Lumina"
  }
];

export function Testimonials() {
  return (
    <section className="bg-black py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-syne font-bold tracking-tighter mb-24 text-center"
        >
          Client Words
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col gap-8"
            >
              <p className="font-syne text-2xl md:text-3xl leading-relaxed text-gray-300">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <p className="font-syne font-bold text-xl">{t.author}</p>
                <p className="font-manrope text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'motion/react';

const services = [
  {
    num: '01',
    title: 'Creative Development',
    desc: 'Bringing designs to life with smooth animations, WebGL, and high-performance code.'
  },
  {
    num: '02',
    title: 'Frontend Architecture',
    desc: 'Building scalable, maintainable, and modern web applications using React and Next.js.'
  },
  {
    num: '03',
    title: 'Interaction Design',
    desc: 'Crafting intuitive and engaging user interfaces that feel alive and responsive.'
  }
];

export function Services() {
  return (
    <section id="services" className="bg-black py-32 px-6 md:px-12 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-syne font-bold tracking-tighter sticky top-32"
            >
              Services
            </motion.h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group border-b border-white/20 pb-8 hover-target"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                  <span className="font-syne text-2xl text-gray-500 group-hover:text-white transition-colors">{service.num}</span>
                  <div>
                    <h3 className="font-syne text-3xl md:text-4xl font-bold mb-4 group-hover:translate-x-4 transition-transform duration-500">{service.title}</h3>
                    <p className="font-manrope text-gray-400 text-lg max-w-xl group-hover:text-gray-200 transition-colors">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

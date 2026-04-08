'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    open: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const linkVariants = {
    closed: { y: '100%', opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.4 + i * 0.1 }
    })
  };

  const links = ['Home', 'Work', 'About', 'Services', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <div className="font-syne font-bold text-xl tracking-tighter pointer-events-auto cursor-pointer hover-target">
          KaiDeveloper©
        </div>
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto hover-target p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#111] z-[200] flex flex-col justify-center p-6 md:p-24 text-white"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute top-6 right-6 md:top-12 md:right-12">
              <button 
                onClick={toggleMenu}
                className="hover-target p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end h-full mt-20 md:mt-0">
              <div className="flex flex-col gap-4 md:gap-8">
                {links.map((link, i) => (
                  <div key={link} className="overflow-hidden">
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      onClick={toggleMenu}
                      className="text-5xl md:text-8xl font-syne font-bold uppercase tracking-tighter hover:text-gray-400 transition-colors hover-target inline-block"
                      custom={i}
                      variants={linkVariants}
                    >
                      {link}
                    </motion.a>
                  </div>
                ))}
              </div>

              <motion.div 
                className="mt-12 md:mt-0 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="font-syne text-xl mb-4">Let&apos;s Talk</h3>
                <p className="font-manrope text-gray-400 mb-6">
                  Available for freelance opportunities. Let&apos;s build something amazing together.
                </p>
                <a 
                  href="mailto:hello@kaideveloper.com" 
                  className="font-manrope underline underline-offset-4 hover:text-gray-300 hover-target"
                >
                  hello@kaideveloper.com
                </a>
                <div className="mt-8 flex gap-4">
                  <a href="#" className="hover-target hover:text-gray-300">Twitter</a>
                  <a href="#" className="hover-target hover:text-gray-300">LinkedIn</a>
                  <a href="#" className="hover-target hover:text-gray-300">Instagram</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

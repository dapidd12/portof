'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1000); // Wait for exit animation
        }, 500);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white"
          initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          exit={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as const }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden">
              <motion.h1 
                className="text-4xl md:text-6xl font-syne font-bold tracking-tighter"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                KaiDeveloper
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.p 
                className="text-sm md:text-lg font-manrope text-gray-400 uppercase tracking-widest"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              >
                Web Developer
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
            <div className="text-6xl md:text-8xl font-syne font-bold">
              {progress}%
            </div>
            <div className="w-1/2 max-w-md h-[2px] bg-gray-800 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

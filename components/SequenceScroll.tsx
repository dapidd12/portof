'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const FRAME_COUNT = 100;

export function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Map scroll progress to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Generate and preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      
      // Generate a procedural SVG frame to simulate a high-end abstract sequence
      const progress = i / FRAME_COUNT;
      const cx1 = 960 + Math.sin(progress * Math.PI * 2) * 300;
      const cy1 = 540 + Math.cos(progress * Math.PI * 2) * 200;
      const cx2 = 960 + Math.sin(progress * Math.PI * 2 + Math.PI) * 300;
      const cy2 = 540 + Math.cos(progress * Math.PI * 2 + Math.PI) * 200;
      const r1 = 400 + Math.sin(progress * Math.PI * 4) * 100;
      const r2 = 500 + Math.cos(progress * Math.PI * 4) * 100;

      const svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#000000" />
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(50,50,50);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(200,200,200);stop-opacity:1" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(20,20,20);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(100,100,100);stop-opacity:1" />
            </linearGradient>
            <filter id="blur">
                <feGaussianBlur stdDeviation="80" />
            </filter>
        </defs>
        <g filter="url(#blur)">
            <circle cx="${cx1}" cy="${cy1}" r="${r1}" fill="url(#grad1)" opacity="0.8" />
            <circle cx="${cx2}" cy="${cy2}" r="${r2}" fill="url(#grad2)" opacity="0.6" />
            <ellipse cx="960" cy="540" rx="${800 * progress}" ry="${400 * progress}" fill="rgb(255,255,255)" opacity="${0.05 + progress * 0.1}" />
        </g>
      </svg>`;

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      img.src = url;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      loadedImages.forEach(img => URL.revokeObjectURL(img.src));
    };
  }, []);

  // Render frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || images.length === 0) return;

    const render = (index: number) => {
      const img = images[Math.round(index)];
      if (img && img.complete) {
        // Object-fit: cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Initial render
    render(0);

    // Subscribe to scroll changes
    const unsubscribe = frameIndex.on('change', (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(frameIndex.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, frameIndex]);

  // Text Overlay Opacities
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1, 1], [0, 1, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [50, 0, 0, -50]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [50, 0, 0, -50]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [50, 0, 0, -50]);
  const y4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6 md:p-24">
          
          {/* Section 1 */}
          <motion.div 
            className="absolute text-center"
            style={{ opacity: opacity1, y: y1 }}
          >
            <h1 className="text-5xl md:text-8xl font-syne font-bold tracking-tighter mb-4">
              My Name is KaiDeveloper.
            </h1>
            <p className="text-xl md:text-3xl font-manrope text-gray-300">
              Web Developer
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div 
            className="absolute left-6 md:left-24 max-w-2xl"
            style={{ opacity: opacity2, y: y2 }}
          >
            <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tighter mb-6">
              Crafting Digital Experiences.
            </h2>
            <p className="text-lg md:text-xl font-manrope text-gray-300 leading-relaxed">
              I specialize in building high-end, interactive websites that blend creative design with robust engineering. Every pixel is placed with purpose, every animation crafted with care.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div 
            className="absolute right-6 md:right-24 max-w-2xl text-right"
            style={{ opacity: opacity3, y: y3 }}
          >
            <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tighter mb-6">
              Motion is Emotion.
            </h2>
            <p className="text-lg md:text-xl font-manrope text-gray-300 leading-relaxed">
              Static pages are a thing of the past. I bring interfaces to life through fluid motion, creating memorable journeys that captivate and engage users from the first scroll.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div 
            className="absolute text-center"
            style={{ opacity: opacity4, y: y4 }}
          >
            <h2 className="text-5xl md:text-8xl font-syne font-bold tracking-tighter mb-8">
              Ready to stand out?
            </h2>
            <p className="text-xl md:text-2xl font-manrope text-gray-300 mb-12 max-w-2xl mx-auto">
              Let&apos;s collaborate to build a digital presence that truly represents your vision and elevates your brand.
            </p>
            <a 
              href="#contact"
              className="pointer-events-auto hover-target inline-flex items-center justify-center px-8 py-4 bg-white text-black font-syne font-bold rounded-full text-lg hover:scale-105 transition-transform duration-300"
            >
              Start a Project
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

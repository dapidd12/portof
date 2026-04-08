'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const FRAME_COUNT = 192;

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

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      
      // Load images from the public/sequence folder
      // Assuming images are named ezgif-frame-001.jpg, ezgif-frame-002.jpg, etc.
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };

      img.onerror = () => {
        console.warn(`Image /sequence/ezgif-frame-${paddedIndex}.jpg failed to load. Please ensure it exists.`);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      // Cleanup if needed
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

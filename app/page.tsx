'use client';

import { useState } from 'react';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { SequenceScroll } from '@/components/SequenceScroll';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Marquee } from '@/components/Marquee';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <Navbar />
      
      <SequenceScroll />
      
      <div className="relative z-10 bg-black -mt-[100vh]">
        <Projects />
        <About />
        <Services />
        <Marquee />
        <Testimonials />
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
}

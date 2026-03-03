import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-flaux-dark">
      {/* Background Image - Static */}
      <div className="absolute inset-0 z-0">
         <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1534237710431-e2fc698436d5?q=80&w=2574&auto=format&fit=crop")',
            backgroundPosition: 'center 30%'
          }}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-flaux-dark/90" />
      </div>

      {/* Main Content - Static */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-16 lg:pb-32">
        <div className="border-l-4 border-flaux-red pl-6 md:pl-10 mb-8">
           <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.2em] mb-2">
            Lagos • Abuja • Port Harcourt • International Design
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold text-white leading-[0.9] tracking-tighter">
            FLAUX
          </h1>
          <h2 className="text-4xl md:text-6xl font-serif italic text-flaux-red mt-2">
            Architectures
          </h2>
        </div>

        <p className="max-w-xl text-white/70 text-lg leading-relaxed md:ml-10">
          Designing and building the future of African living. We merge heritage with high-tech sustainability to create spaces that resonate with the Nigerian spirit.
        </p>
      </div>

      {/* Decorative Circle - Simple CSS Animation */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rounded-full z-10 pointer-events-none animate-spin-slow" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-10 z-20 text-white flex flex-col items-center gap-2">
          <ArrowDown size={32} className="text-flaux-red animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
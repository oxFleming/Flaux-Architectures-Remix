import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "They possess an uncanny ability to translate abstract cultural concepts into tangible, breathable structures. A masterpiece.",
    author: "Brendan",
    role: "Lekki Phase 1 Resident"
  },
  {
    id: 2,
    text: "Professionalism meeting artistry. The team navigated the complexities of Lagos regulations while maintaining pure design integrity.",
    author: "Laura Martinez",
    role: "Commercial Client"
  },
  {
    id: 3,
    text: "Flaux created more than a home; they created a sanctuary that responds to the sun and wind. Truly sustainable living.",
    author: "David Lee",
    role: "Private Client"
  },
  {
    id: 4,
    text: "An unequivocal recommendation. Their attention to material detail—from laterite to glass—is simply world-class.",
    author: "Daniel R.",
    role: "Real Estate Developer"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white border-t border-black/5 scroll-mt-28" id="testimonials">
      <div className="flex flex-col lg:flex-row lg:min-h-[500px]">
        {/* Left Column - Brand Identity */}
        <div className="w-full lg:w-[40%] bg-flaux-dark text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 text-white/5 pointer-events-none">
            <Quote size={200} />
          </div>

          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-flaux-red"></span>
                <span className="text-flaux-red font-bold uppercase tracking-widest text-[10px] md:text-xs">Client Voices</span>
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] mb-6">
              Architecture is <br/> <span className="text-white/50 italic">a dialogue.</span>
            </h2>
          </div>
          
          <div className="relative z-10 mt-8 lg:mt-0">
             <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm border-l-2 border-flaux-red pl-4">
                "We pride ourselves on delivering excellence in every blueprint and structure we create in Lagos."
             </p>
          </div>
        </div>

        {/* Right Column - Grid */}
        <div className="w-full lg:w-[60%] bg-white lg:border-l border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`
                    p-8 lg:p-10 flex flex-col justify-between 
                    border-b border-black/5 
                    ${index % 2 === 0 ? 'md:border-r' : ''} 
                    group hover:bg-gray-50 transition-colors duration-500
                `}
              >
                <div>
                   <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={10} className="fill-flaux-red text-flaux-red opacity-60" />
                    ))}
                  </div>
                  <p className="text-base lg:text-lg font-serif text-gray-800 leading-relaxed mb-6 italic">
                    "{item.text}"
                  </p>
                </div>
                
                <div className="pt-6 border-t border-black/5 group-hover:border-flaux-red/30 transition-colors">
                  <h4 className="font-bold text-black text-[10px] uppercase tracking-widest">{item.author}</h4>
                  {item.role && (
                    <span className="text-gray-400 text-[10px] mt-1 block font-serif italic">{item.role}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
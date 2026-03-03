import React from 'react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          {/* Image Column */}
          <div className="w-full md:w-1/2 relative">
             <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mr-auto overflow-hidden rounded-sm bg-gray-100">
                {/* 
                  IMPORTANT: To display your custom image, rename your file to 'sandra-aiwohieni.jpg' 
                  and place it in the public/ root folder of your project.
                */}
                <img
                  src="./sandra-aiwohieni.jpg"
                  onError={(e) => {
                    // Fallback to placeholder if local image is not found
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop";
                    e.currentTarget.onerror = null; // Prevent infinite loop
                  }}
                  alt="Arc. Sandra Aiwohieni Airunugba"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Decorative border frame */}
                <div className="absolute top-4 left-4 w-full h-full border border-black/10 -z-10 translate-x-4 translate-y-4" />
             </div>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
                 <h4 className="text-flaux-red font-bold uppercase tracking-widest mb-4 text-sm">Leadership</h4>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-black mb-2 tracking-tight">
                  Arc. Sandra <br/> Aiwohieni Airunugba
                </h2>
                <p className="text-xl md:text-2xl font-serif italic text-gray-500 mt-4">Founder & Chief Architect</p>
            </div>
            
            <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  With a distinct vision for the African built environment, Sandra combines rigorous architectural practice with a deep appreciation for local culture. She believes that every line drawn on paper must translate into a meaningful experience for the people who inhabit the space.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Her leadership at Flaux Architectures is defined by a commitment to sustainability, contextual innovation, and the relentless pursuit of aesthetic excellence in the Nigerian landscape.
                </p>
            </div>

            <div className="border-t border-black/10 pt-8 mt-10">
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="block text-4xl font-sans font-bold text-black">10+</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1 block">Years Experience</span>
                  </div>
                   <div>
                    <span className="block text-4xl font-sans font-bold text-black">ANIA</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1 block">Associate, Nigerian Institute of Architects</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
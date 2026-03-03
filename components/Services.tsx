import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Service } from '../types';
import { ArrowRight } from 'lucide-react';

const services: Service[] = [
  {
    id: '01',
    title: 'Architectural Design',
    description: 'From concept to blueprint, we create sustainable structures tailored to the tropical climate of West Africa. Our approach balances aesthetic daring with structural integrity, ensuring every design is a unique response to its context.',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2000&auto=format&fit=crop',
    features: [
      { 
        title: 'Strategic innovation', 
        description: 'Benefit from our forward-thinking approach to technologies and sustainable practices.' 
      },
      { 
        title: 'Contextual Analysis', 
        description: 'Deep site study for optimal orientation and climate response.' 
      }
    ]
  },
  {
    id: '02',
    title: 'Building Construction',
    description: 'We offer a seamless transition from blueprints to physical reality. Our construction team ensures that the architectural vision is executed with precision, using high-quality materials and innovative building techniques.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2000&auto=format&fit=crop',
    features: [
      { 
        title: 'Precision Execution', 
        description: 'Meticulous attention to detail from foundation to finishing.' 
      },
      { 
        title: 'Project Management', 
        description: 'Comprehensive oversight to ensure timelines and budgets are strictly adhered to.' 
      }
    ]
  },
  {
    id: '03',
    title: 'Interior Design',
    description: 'Curated interiors that blend modern luxury with indigenous art and materials. We source locally to create spaces that feel authentically Nigerian yet globally competitive, completing the holistic vision of our architectural projects.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    features: [
      { 
        title: 'Contemporary style', 
        description: 'Stay on trend with our curated collection of accessories, furniture, and decor pieces.' 
      },
      { 
        title: 'Spatial Harmony', 
        description: 'Flow-centric layouts designed for modern African living.' 
      }
    ]
  },
];

interface ServiceItemProps {
  service: Service;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 py-16 lg:py-24 border-b border-black/10 last:border-0">
      
      {/* Left Column: Title & Main Description */}
      <div className="lg:w-1/2">
        <span className="text-flaux-red font-mono text-sm tracking-widest mb-4 block">0{index + 1}</span>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-black">{service.title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
          {service.description}
        </p>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100 mt-8">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
        </div>
      </div>

      {/* Right Column: Feature Cards (The requested whitespace area) */}
      <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
        {service.features.map((feature, i) => (
          <div 
            key={i} 
            className="group bg-white border border-black/5 p-8 md:p-10 hover:shadow-xl hover:border-flaux-red/20 transition-all duration-300 rounded-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-0 bg-flaux-red group-hover:h-full transition-all duration-500 ease-out" />
            
            <span className="inline-block w-10 h-10 rounded-full border border-black/10 text-center leading-10 text-xs font-mono text-gray-400 mb-6 group-hover:text-flaux-red group-hover:border-flaux-red transition-colors">
               0{(index * 2) + i + 1}
            </span>
            
            <h4 className="text-2xl font-bold text-black mb-4 font-sans group-hover:translate-x-2 transition-transform duration-300">
              {feature.title}
            </h4>
            <p className="text-gray-500 leading-relaxed text-base group-hover:text-gray-700">
              {feature.description}
            </p>
            
            <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
               <ArrowRight className="text-flaux-red" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-surface text-foreground relative scroll-mt-28 py-24">
      <div className="container mx-auto px-6">
         <div className="mb-16 lg:mb-24 md:w-2/3">
            <h2 className="text-6xl md:text-8xl font-sans font-bold tracking-tighter mb-6 text-black">
              Our <br/> Services
            </h2>
            <div className="w-24 h-2 bg-flaux-red" />
            <p className="mt-8 text-gray-500 text-xl max-w-lg">
              Focused design solutions for the modern African built environment.
            </p>
         </div>
         
         <div>
           {services.map((service, index) => (
              <ServiceItem 
                key={service.id} 
                service={service} 
                index={index} 
              />
           ))}
         </div>
      </div>
    </section>
  );
};

export default Services;
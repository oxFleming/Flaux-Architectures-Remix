import React from 'react';
import { motion } from 'framer-motion';

const Studio: React.FC = () => {
  const text = "At Flaux Architectures, we believe in the rhythm of the city. Based in the heart of Lagos, our studio navigates the chaotic beauty of urbanization to create sanctuaries of calm and purpose. We don't just build; we craft identities for the modern African narrative.";
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section id="studio" className="py-24 md:py-32 bg-flaux-dark relative overflow-hidden scroll-mt-28">
       {/* Abstract shape */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flaux-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="md:w-4/5 lg:w-3/4 mx-auto">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-flaux-red mb-8 uppercase tracking-widest font-bold text-sm"
          >
            The Studio
          </motion.p>
          
          <motion.h3 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-wrap gap-x-[0.3em] gap-y-2 md:gap-y-4"
          >
            {words.map((word, i) => (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className="text-2xl md:text-5xl font-serif leading-tight text-white"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>
        </div>
      </div>
    </section>
  );
};

export default Studio;
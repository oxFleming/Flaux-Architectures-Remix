import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white overflow-y-auto rounded-sm shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-black text-white hover:bg-flaux-red transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="p-6 md:p-10 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  {project.galleryImages?.map((img, idx) => (
                    <div key={idx} className={`overflow-hidden ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                      <img 
                        src={img} 
                        alt={`${project.title} view ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-flaux-red text-xs font-bold uppercase tracking-[0.2em] mb-4">
                    <MapPin size={12} /> {project.location}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-4">{project.title}</h2>
                  <div className="flex flex-wrap gap-6 text-black/40 text-xs font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Tag size={14} className="text-black" /> {project.category}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-black" /> {project.year}</span>
                  </div>
                </div>

                <div className="space-y-6 text-black/70 leading-relaxed">
                  <p className="text-lg font-medium text-black">
                    {project.description}
                  </p>
                  <p className="text-sm">
                    {project.longDescription}
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5">
                  <button 
                    onClick={onClose}
                    className="w-full py-4 border border-black text-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all"
                  >
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

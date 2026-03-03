import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Tag, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';
import Navigation from './Navigation';
import Footer from './Footer';
import ProjectModal from './ProjectModal';

const Portfolio: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const requestedOrder = ['All', 'Interior Design', 'Residential', 'Commercial', 'Public', 'Hospitality'];
    const existingCats = new Set(projects.map(p => p.category));
    return requestedOrder.filter(cat => cat === 'All' || existingCats.has(cat));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <Link to="/#projects" className="inline-flex items-center text-flaux-red font-bold uppercase tracking-widest text-xs mb-6 hover:gap-2 transition-all">
                <ArrowLeft size={14} className="mr-2" /> Back to Home
              </Link>
              <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight">
                Our <span className="text-flaux-red italic font-serif">Portfolio.</span>
              </h1>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                    selectedCategory === cat 
                      ? 'bg-black border-black text-white' 
                      : 'border-black/10 text-black/60 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                    <motion.img 
                      initial={{ filter: "grayscale(100%)" }}
                      whileInView={{ filter: "grayscale(0%)" }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.8 }}
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-flaux-red/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <div className="border border-white/50 rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <ArrowUpRight className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-black/10 pb-4 mb-4 group-hover:border-flaux-red transition-colors">
                    <div className="flex items-center gap-2 text-flaux-red text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                      <MapPin size={10} /> {project.location}
                    </div>
                    <h3 className="text-2xl font-serif mb-1">{project.title}</h3>
                    <div className="flex items-center gap-4 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Tag size={10} /> {project.category}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {project.year}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-black/60 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <Footer />
    </div>
  );
};

export default Portfolio;

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const grayscale = useTransform(scrollYProgress, [0, 1], ["grayscale(100%)", "grayscale(0%)"]);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`group relative cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
    >
      <div className="relative overflow-hidden w-full h-[500px] mb-6 bg-gray-100">
        <motion.div style={{ y, height: "115%" }} className="w-full relative -top-[7%]">
            <motion.img
            style={{ filter: grayscale }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
        </motion.div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-flaux-red/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
            <div className="border border-white/50 rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <ArrowUpRight className="text-white w-8 h-8" />
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start border-b border-black/10 pb-6 group-hover:border-flaux-red transition-colors duration-300">
        <div>
           <span className="text-xs font-bold text-flaux-red uppercase tracking-widest mb-2 block">{project.location}</span>
          <h3 className="text-3xl font-serif text-black leading-none mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 text-base leading-relaxed max-w-md">
            {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectGallery: React.FC = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Only show first 4 projects on landing page
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="py-32 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
             <h4 className="text-flaux-red font-bold uppercase tracking-widest mb-2">Portfolio</h4>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-black tracking-tight">
                Selected Works
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-right mt-6 md:mt-0">
             Showcasing our contribution to the modern African skyline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-24">
            <Link to="/portfolio" className="px-10 py-4 bg-black text-white hover:bg-flaux-red transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                View All Projects
            </Link>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ProjectGallery;
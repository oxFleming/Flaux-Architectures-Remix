import { useState, useEffect } from 'react';
import { Project } from '../types';
import { projects as staticProjects } from '../data/projects';

const LOCAL_STORAGE_KEY = 'flaux_custom_projects';

export const useProjects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects) as Project[];
        // Merge static and custom projects
        // If a custom project has the same ID as a static one, it's an "edit"
        const merged = staticProjects.map(sp => {
          const customVersion = parsed.find(cp => cp.id === sp.id);
          return customVersion || sp;
        });
        
        // Add truly new projects (IDs not in staticProjects)
        parsed.forEach(custom => {
          if (!staticProjects.find(sp => sp.id === custom.id)) {
            merged.push(custom);
          }
        });
        
        setAllProjects(merged);
      } catch (e) {
        console.error('Failed to parse custom projects', e);
      }
    }
  }, []);

  const addProject = (newProject: Project) => {
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    let customProjects: Project[] = [];
    if (savedProjects) {
      customProjects = JSON.parse(savedProjects);
    }
    
    const updatedCustom = [...customProjects, newProject];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustom));
    
    // Refresh allProjects
    const merged = staticProjects.map(sp => {
      const customVersion = updatedCustom.find(cp => cp.id === sp.id);
      return customVersion || sp;
    });
    updatedCustom.forEach(custom => {
      if (!staticProjects.find(sp => sp.id === custom.id)) {
        merged.push(custom);
      }
    });
    setAllProjects(merged);
  };

  const updateProject = (updatedProject: Project) => {
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    let customProjects: Project[] = [];
    if (savedProjects) {
      customProjects = JSON.parse(savedProjects);
    }
    
    // Replace or add to custom projects
    const index = customProjects.findIndex(p => p.id === updatedProject.id);
    let updatedCustom;
    if (index !== -1) {
      updatedCustom = [...customProjects];
      updatedCustom[index] = updatedProject;
    } else {
      updatedCustom = [...customProjects, updatedProject];
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustom));
    
    // Refresh allProjects
    const merged = staticProjects.map(sp => {
      const customVersion = updatedCustom.find(cp => cp.id === sp.id);
      return customVersion || sp;
    });
    updatedCustom.forEach(custom => {
      if (!staticProjects.find(sp => sp.id === custom.id)) {
        merged.push(custom);
      }
    });
    setAllProjects(merged);
  };

  const clearCustomProjects = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAllProjects(staticProjects);
  };

  return { projects: allProjects, addProject, updateProject, clearCustomProjects };
};

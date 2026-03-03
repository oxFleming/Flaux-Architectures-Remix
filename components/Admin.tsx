import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';
import Navigation from './Navigation';
import Footer from './Footer';
import { Plus, Trash2, Save, AlertCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const { projects, addProject, updateProject, clearCustomProjects } = useProjects();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Residential',
    location: '',
    year: new Date().getFullYear().toString(),
    description: '',
    longDescription: '',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    galleryImages: []
  });

  const [galleryInput, setGalleryInput] = useState('');

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Residential',
      location: '',
      year: new Date().getFullYear().toString(),
      description: '',
      longDescription: '',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
      galleryImages: []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    if (editingId) {
      updateProject({
        ...formData as Project,
        id: editingId
      });
      alert('Project updated successfully!');
    } else {
      const newProject: Project = {
        ...formData as Project,
        id: Date.now(), // Simple unique ID
      };
      addProject(newProject);
      alert('Project added successfully! It will now appear in the portfolio.');
    }
    
    resetForm();
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Project Backdoor</h1>
            <p className="text-gray-600">
              {editingId ? 'Edit existing project details.' : 'Add new projects to the portfolio instantly.'} 
              These projects are saved locally in your browser.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 rounded-lg border border-gray-200">
            {editingId && (
              <div className="flex items-center justify-between bg-flaux-red/10 p-4 rounded border border-flaux-red/20 mb-6">
                <div className="flex items-center gap-3 text-flaux-red">
                  <AlertCircle size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">Editing Mode: {formData.title}</span>
                </div>
                <button 
                  type="button" onClick={resetForm}
                  className="text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Cancel Edit
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Project Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleInputChange} required
                  className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
                >
                  <option value="Interior Design">Interior Design</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Public">Public</option>
                  <option value="Hospitality">Hospitality</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Location</label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleInputChange} required
                  className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Year</label>
                <input 
                  type="text" name="year" value={formData.year} onChange={handleInputChange} required
                  className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Main Image URL</label>
              <input 
                type="url" name="image" value={formData.image} onChange={handleInputChange} required
                className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Short Description (Grid View)</label>
              <textarea 
                name="description" value={formData.description} onChange={handleInputChange} required
                className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors h-24"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Long Description (Modal View)</label>
              <textarea 
                name="longDescription" value={formData.longDescription} onChange={handleInputChange} required
                className="w-full p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors h-48"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest block">Gallery Images</label>
              <div className="flex gap-2">
                <input 
                  type="url" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 p-3 border border-gray-300 rounded focus:border-flaux-red outline-none transition-colors"
                />
                <button 
                  type="button" onClick={handleAddGalleryImage}
                  className="px-6 bg-black text-white rounded hover:bg-flaux-red transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.galleryImages?.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded overflow-hidden border border-gray-200 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
              <button 
                type="button" onClick={() => {
                  if(confirm('Are you sure you want to clear all custom added projects?')) clearCustomProjects();
                }}
                className="text-red-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2"
              >
                <Trash2 size={14} /> Clear All Custom Projects
              </button>
              
              <button 
                type="submit"
                className="px-10 py-4 bg-flaux-red text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-black transition-all flex items-center gap-2"
              >
                <Save size={16} /> {editingId ? 'Update Project' : 'Save Project'}
              </button>
            </div>
          </form>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Current Projects ({projects.length})</h2>
            <div className="space-y-4">
              {projects.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 object-cover rounded" alt="" />
                    <div>
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="text-xs text-gray-500">{p.category} • {p.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {p.id > 1000 && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase">Custom</span>
                      )}
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-2 text-gray-400 hover:text-flaux-red transition-colors"
                        title="Edit Project"
                      >
                        <Save size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;

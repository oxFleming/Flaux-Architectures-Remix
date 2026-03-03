import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadFormProps {
  initialMessage?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    location: '',
    timeline: '',
    description: ''
  });

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, description: initialMessage }));
    }
  }, [initialMessage]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '', email: '', phone: '', projectType: '', budget: '', location: '', timeline: '', description: ''
      });
    }, 1500);
  };

  return (
    <section id="inquiry" className="py-24 bg-flaux-dark text-white relative overflow-hidden scroll-mt-28">
       {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-flaux-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Text Column */}
          <div className="w-full md:w-1/3">
            <h4 className="text-flaux-red font-bold uppercase tracking-widest mb-4 text-sm">Inquiry</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6">
              Start Your <br/> Project
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We collaborate with clients who value distinctiveness and sustainability. Tell us about your vision, and let's determine if Flaux Architectures is the right partner for your journey.
            </p>
            
            <div className="hidden md:block mt-12 border-t border-white/10 pt-8">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Process</p>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-flaux-red rounded-full"></span>Initial Consultation</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-flaux-red rounded-full"></span>Feasibility Study</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-flaux-red rounded-full"></span>Concept Design</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-flaux-red rounded-full"></span>Detailed Documentation</li>
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full md:w-2/3">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-12 rounded-sm text-center min-h-[400px] flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Inquiry Received</h3>
                <p className="text-white/60 max-w-md">Thank you for reaching out. Our team will review your project details and get back to you within 48 hours.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm uppercase tracking-widest font-bold text-flaux-red hover:text-white transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Phone Number</label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm"
                    placeholder="+234..."
                  />
                </div>

                <div className="md:col-span-1">
                   <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project Location</label>
                   <input 
                    required 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm"
                    placeholder="e.g. Ikoyi, Lagos"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project Type</label>
                  <select 
                    required 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm appearance-none"
                  >
                    <option value="" className="bg-flaux-dark text-gray-400">Select Type</option>
                    <option value="Residential" className="bg-flaux-dark">Residential (Private)</option>
                    <option value="Commercial" className="bg-flaux-dark">Commercial / Office</option>
                    <option value="Hospitality" className="bg-flaux-dark">Hospitality / Hotel</option>
                    <option value="Civic" className="bg-flaux-dark">Civic / Public</option>
                    <option value="Interior" className="bg-flaux-dark">Interior Design</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Budget Range</label>
                  <select 
                    required 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm appearance-none"
                  >
                    <option value="" className="bg-flaux-dark text-gray-400">Select Range</option>
                    <option value="2M-10M" className="bg-flaux-dark">₦2M - ₦10M</option>
                    <option value="10M-50M" className="bg-flaux-dark">₦10M - ₦50M</option>
                    <option value="50M-150M" className="bg-flaux-dark">₦50M - ₦150M</option>
                    <option value="150M-500M" className="bg-flaux-dark">₦150M - ₦500M</option>
                    <option value="500M-2B" className="bg-flaux-dark">₦500M - ₦2B</option>
                    <option value="2B+" className="bg-flaux-dark">₦2B+</option>
                    <option value="Undetermined" className="bg-flaux-dark">Undetermined</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Expected Timeline</label>
                  <select 
                    required 
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm appearance-none"
                  >
                    <option value="" className="bg-flaux-dark text-gray-400">Select Timeline</option>
                    <option value="Immediate" className="bg-flaux-dark">Immediate (0-3 months)</option>
                    <option value="Short-term" className="bg-flaux-dark">Short-term (3-6 months)</option>
                    <option value="Medium-term" className="bg-flaux-dark">Medium-term (6-12 months)</option>
                    <option value="Long-term" className="bg-flaux-dark">Long-term (1+ years)</option>
                    <option value="Undetermined" className="bg-flaux-dark">Undetermined</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project Description</label>
                  <textarea 
                    required 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-flaux-red transition-colors rounded-sm"
                    placeholder="Tell us about the site, the vision, and any specific requirements..."
                  />
                </div>

                <div className="md:col-span-2 mt-4 flex flex-col md:flex-row items-center gap-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-5 bg-flaux-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-flaux-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <>Send Inquiry <Send size={18} /></>}
                  </button>

                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">OR</span>

                  <a 
                    href="https://wa.me/2347037412354" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-flaux-dark transition-all duration-300 flex items-center justify-center gap-3 text-center"
                  >
                    Chat with us on WhatsApp <MessageCircle size={18} />
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadForm;
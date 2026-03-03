import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight, MessageSquarePlus } from 'lucide-react';
import { generateArchitecturalConcept } from '../services/geminiService';
import { ConceptResponse } from '../types';

interface AIConceptGeneratorProps {
  onConceptAction?: (message: string) => void;
}

const AIConceptGenerator: React.FC<AIConceptGeneratorProps> = ({ onConceptAction }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<ConceptResponse | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setConcept(null);
    
    const data = await generateArchitecturalConcept(prompt);
    
    setLoading(false);
    if (data) {
      setConcept(data);
    }
  };

  const handleDiscuss = () => {
    if (concept && onConceptAction) {
      const message = `I generated a concept titled "${concept.title}" using your AI tool. \n\nConcept Summary: ${concept.concept}\n\nI'd like to discuss bringing this vision to life.`;
      onConceptAction(message);
    }
  };

  return (
    <section id="ai-concept" className="py-24 bg-flaux-red text-white relative overflow-hidden scroll-mt-28">
       {/* Background decorative elements */}
      <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-black/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Input */}
          <div>
            <div className="flex items-center space-x-2 text-white/80 mb-6">
              <Sparkles size={20} />
              <span className="text-xs font-bold tracking-widest uppercase">Flaux Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6">
              Future <br/> Concepts
            </h2>
            <p className="text-white/80 mb-10 leading-relaxed max-w-md text-lg">
              Visualize the next icon of Lagos. Input a theme, and let our AI architect sketch the narrative.
            </p>

            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A bamboo skyscraper in Ikeja..."
                className="w-full bg-white/10 border border-white/20 p-6 pr-16 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 focus:border-white transition-all rounded-none font-serif text-xl"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white text-flaux-red hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          {/* Right: Output */}
          <div className="min-h-[400px] border-l border-white/20 pl-8 lg:pl-16 flex flex-col justify-center">
            {loading ? (
              <div className="space-y-4 animate-pulse opacity-50">
                <div className="h-8 bg-white w-3/4 rounded-sm" />
                <div className="h-4 bg-white w-full rounded-sm" />
                <div className="h-4 bg-white w-5/6 rounded-sm" />
                <div className="h-4 bg-white w-4/6 rounded-sm" />
              </div>
            ) : concept ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-4xl font-serif italic text-white mb-6">{concept.title}</h3>
                <p className="text-white/90 text-lg leading-relaxed mb-10 font-light">
                  {concept.concept}
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/60 mb-3 border-b border-white/20 pb-2">Materials</h4>
                    <ul className="space-y-2 mt-4">
                      {concept.materials.map((m, i) => (
                        <li key={i} className="text-base text-white">{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/60 mb-3 border-b border-white/20 pb-2">Features</h4>
                    <ul className="space-y-2 mt-4">
                      {concept.features.map((f, i) => (
                        <li key={i} className="text-base text-white">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {onConceptAction && (
                  <button
                    onClick={handleDiscuss}
                    className="mt-8 w-full py-4 bg-white text-flaux-red font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                  >
                    Discuss this Concept <MessageSquarePlus size={20} />
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white/30 h-full">
                <div className="w-20 h-20 border border-white/20 flex items-center justify-center mb-6 rounded-full">
                  <Sparkles size={24} />
                </div>
                <p className="text-sm tracking-widest uppercase">Waiting for inspiration</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIConceptGenerator;
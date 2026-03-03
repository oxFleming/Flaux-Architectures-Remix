import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Loader2, Maximize2, Minimize2, 
  Layers, Box, Grid, ArrowRight, X 
} from 'lucide-react';
import { generateBuildingImage, generateBuildingQuestion } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface InteractiveBuilderProps {
  onConceptAction?: (message: string) => void;
}

const InteractiveBuilder: React.FC<InteractiveBuilderProps> = ({ onConceptAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Welcome to the Co-Architect Studio. I'm here to help you visualize your dream structure layer by layer. What kind of building shall we start with today? (e.g., 'A 4-bedroom family home')" }
  ]);
  const [currentStage, setCurrentStage] = useState('Foundation/Layout');
  const [viewMode, setViewMode] = useState<'3d' | 'ortho'>('3d');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage3D, setGeneratedImage3D] = useState<string | null>(null);
  const [generatedImageOrtho, setGeneratedImageOrtho] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // 1. Generate AI Question/Response
    const aiResponse = await generateBuildingQuestion(
      userMessage, 
      currentStage, 
      messages.map(m => `${m.role}: ${m.content}`)
    );

    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);

    // 2. Generate Images (Parallel)
    // We construct a cumulative prompt based on history to maintain context
    // For simplicity in this demo, we'll use the user's latest input + context
    const imagePrompt = `Architectural sketch of ${userMessage}. Stage: ${currentStage}.`;
    
    // Generate 3D
    const img3d = await generateBuildingImage(imagePrompt, '3d');
    if (img3d) setGeneratedImage3D(img3d);

    // Generate Ortho (Lazy or parallel? Let's do parallel for "toggle" readiness)
    const imgOrtho = await generateBuildingImage(imagePrompt, 'ortho');
    if (imgOrtho) setGeneratedImageOrtho(imgOrtho);

    setIsLoading(false);
    
    // Advance stage logic (simple heuristic for demo)
    if (currentStage === 'Foundation/Layout') setCurrentStage('Walls & Windows');
    else if (currentStage === 'Walls & Windows') setCurrentStage('Roofing');
    else if (currentStage === 'Roofing') setCurrentStage('Materials & Finishes');
    else setCurrentStage('Final Refinements');
  };

  const handleFinish = () => {
    if (onConceptAction && generatedImage3D) {
      onConceptAction(`I've built a concept in the Co-Architect Studio. \n\nFinal Stage: ${currentStage}\n\nI'd like to discuss the feasibility of this design.`);
      setIsOpen(false);
    }
  };

  return (
    <section id="co-architect" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 text-flaux-red">
          <Layers size={24} />
          <span className="text-xs font-bold uppercase tracking-widest">Interactive Studio</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6">
          Build It Yourself.
        </h2>
        <p className="text-white/60 mb-10 max-w-2xl mx-auto text-lg">
          Step into our virtual studio. Collaborate with our AI to construct your vision layer by layer—from the foundation to the final finishes.
        </p>

        <button 
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-flaux-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-flaux-red transition-all flex items-center gap-3 mx-auto"
        >
          Start Building <ArrowRight size={20} />
        </button>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-zinc-900 flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-flaux-red transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left: Chat Interface */}
            <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col h-full bg-zinc-900">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">Co-Architect</h3>
                  <p className="text-xs text-flaux-red uppercase tracking-widest">{currentStage}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-flaux-red text-white rounded-tr-none' 
                        : 'bg-white/10 text-white/90 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-flaux-red" />
                      <span className="text-xs text-white/50">Generating concepts...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your idea..."
                    className="w-full bg-white/5 border border-white/10 p-4 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-flaux-red rounded-lg"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !prompt.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-flaux-red hover:text-white disabled:opacity-50"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Visualizer */}
            <div className="w-full md:w-2/3 bg-black relative flex flex-col">
              {/* Toolbar */}
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <button 
                  onClick={() => setViewMode('3d')}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${
                    viewMode === '3d' ? 'bg-white text-black' : 'bg-black/50 text-white border border-white/20'
                  }`}
                >
                  <Box size={14} /> 3D View
                </button>
                <button 
                  onClick={() => setViewMode('ortho')}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${
                    viewMode === 'ortho' ? 'bg-white text-black' : 'bg-black/50 text-white border border-white/20'
                  }`}
                >
                  <Grid size={14} /> Orthographic
                </button>
              </div>

              {/* Canvas Area */}
              <div className="flex-1 flex items-center justify-center p-12 relative">
                <div className="relative w-full h-full max-w-4xl max-h-[80vh] border border-white/10 rounded-lg overflow-hidden bg-zinc-900/50 flex items-center justify-center">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                  />
                  
                  {isLoading ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-flaux-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/50 text-sm uppercase tracking-widest">Rendering {currentStage}...</p>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {viewMode === '3d' && generatedImage3D ? (
                        <motion.img 
                          key="3d"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          src={generatedImage3D} 
                          alt="3D Concept" 
                          className="w-full h-full object-contain"
                        />
                      ) : viewMode === 'ortho' && generatedImageOrtho ? (
                        <motion.img 
                          key="ortho"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          src={generatedImageOrtho} 
                          alt="Orthographic Plan" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center text-white/30">
                          <Layers size={48} className="mx-auto mb-4 opacity-50" />
                          <p>Start chatting to generate visuals</p>
                        </div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-white/10 bg-zinc-900 flex justify-between items-center">
                <div className="text-xs text-white/40">
                  *AI-generated concepts are for visualization only.
                </div>
                <button 
                  onClick={handleFinish}
                  className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-flaux-red hover:text-white transition-colors text-sm"
                >
                  Finalize & Discuss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveBuilder;

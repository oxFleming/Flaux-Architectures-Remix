import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white py-24 border-t border-black/5 text-black scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tight mb-8">
              Let's build <br /> <span className="text-flaux-red italic font-serif">something iconic.</span>
            </h2>
            <a 
              href="mailto:studio@flaux.ng" 
              className="inline-flex items-center text-2xl font-bold hover:text-flaux-red transition-colors border-b-2 border-black pb-1 hover:border-flaux-red"
            >
              studio@flaux.ng
              <ArrowUpRight size={28} className="ml-3" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-gray-600 mt-8 md:mt-0">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-black mb-6 font-bold">Office</h4>
              <p className="mb-2">50 Araromi</p>
              <p className="mb-2">Onike Yaba</p>
              <p>Lagos, Nigeria</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-black mb-6 font-bold">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="flex items-center hover:text-flaux-red transition-colors"><Instagram size={16} className="mr-2"/> Instagram</a></li>
                <li><a href="#" className="flex items-center hover:text-flaux-red transition-colors"><Linkedin size={16} className="mr-2"/> LinkedIn</a></li>
                <li><a href="#" className="flex items-center hover:text-flaux-red transition-colors"><Twitter size={16} className="mr-2"/> X (Twitter)</a></li>
                <li><a href="https://wa.me/" className="flex items-center hover:text-flaux-red transition-colors"><MessageCircle size={16} className="mr-2"/> WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-end text-xs font-bold uppercase tracking-widest text-black/40">
          <span>© 2016 FLAUX ARCHITECTURES</span>
          <span className="mt-2 md:mt-0">Lagos • Abuja • Port Harcourt • International Design</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
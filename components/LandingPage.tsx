import React, { useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Services from './Services';
import ProjectGallery from './ProjectGallery';
import LeadForm from './LeadForm';
import Studio from './Studio';
import Team from './Team';
import Footer from './Footer';
import Testimonials from './Testimonials';

const LandingPage: React.FC = () => {
  const [initialLeadMessage, setInitialLeadMessage] = useState('');

  return (
    <div className="bg-white min-h-screen text-foreground selection:bg-flaux-red selection:text-white font-sans">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Studio />
        <Team />
        <ProjectGallery />
        <Testimonials />
        <LeadForm initialMessage={initialLeadMessage} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

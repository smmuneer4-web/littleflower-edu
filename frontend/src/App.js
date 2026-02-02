import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import AdvantagesSection from './components/AdvantagesSection';
import WhyChooseSection from './components/WhyChooseSection';
import StoriesSection from './components/StoriesSection';
import TestimonialsSection from './components/TestimonialsSection';
import VideoTestimonialsSection from './components/VideoTestimonialsSection';
import Footer from './components/Footer';
import AdmissionFormModal from './components/AdmissionFormModal';
import { Toaster } from './components/ui/sonner';

function App() {
  const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);

  useEffect(() => {
    const handleOpenAdmissionForm = () => {
      setIsAdmissionFormOpen(true);
    };

    window.addEventListener('openAdmissionForm', handleOpenAdmissionForm);

    return () => {
      window.removeEventListener('openAdmissionForm', handleOpenAdmissionForm);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        <WhyChooseSection />
        <StoriesSection />
        <TestimonialsSection />
        <VideoTestimonialsSection />
      </main>
      <Footer />
      <AdmissionFormModal 
        open={isAdmissionFormOpen} 
        onOpenChange={setIsAdmissionFormOpen} 
      />
      <Toaster />
    </div>
  );
}

export default App;

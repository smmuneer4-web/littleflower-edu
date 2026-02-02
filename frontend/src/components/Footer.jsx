import React from 'react';
import { heroData, institutions } from '../data/mockData';
import { Phone, Mail, MapPin, Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://littleflowerinstitutions.com/wp-content/uploads/2024/01/main_logo-1.webp" 
                alt="Little Flower Group Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Little Flower Group</h3>
                <p className="text-xs text-gray-400">of Institutions</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Empowering healthcare professionals through quality education and hands-on training since 2002.
            </p>
            <div className="flex gap-3">
              <a href="https://www.youtube.com/channel/UCUmEiGqj4yw8edx3IVov66w" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-[#2d3589] rounded-lg flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://www.instagram.com/littleflowergroupofficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-[#2d3589] rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/Littleflowergroupofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-[#2d3589] rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('courses')} className="hover:text-blue-400 transition-colors">
                  Find Your Course
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Life @ Little Flower
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="hover:text-blue-400 transition-colors">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Institutions */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Our Institutions</h4>
            {institutions.map((campus, index) => (
              <div key={index} className="mb-4">
                <h5 className="text-blue-400 font-semibold text-sm mb-2">{campus.campus}</h5>
                <ul className="space-y-1 text-xs">
                  {campus.colleges.slice(0, 3).map((college, idx) => (
                    <li key={idx}>
                      <a href={college.link} className="hover:text-emerald-400 transition-colors">
                        {college.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                <a href={`tel:${heroData.contactInfo.phone}`} className="hover:text-blue-400 transition-colors">
                  {heroData.contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                <a href={`mailto:${heroData.contactInfo.email}`} className="hover:text-blue-400 transition-colors break-all">
                  {heroData.contactInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {heroData.contactInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-center md:text-left">
              © 2025 Little Flower Group of Institutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Use</a>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Managed by Sandesh Educational Cultural and Charitable Trust/Society® since 2002.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

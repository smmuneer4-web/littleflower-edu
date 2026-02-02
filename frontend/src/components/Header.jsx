import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#2d3589] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+919037834632" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
              <Phone size={14} />
              <span>+91 90378 34632</span>
            </a>
            <a href="mailto:info@littleflowerinstitutions.in" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">info@littleflowerinstitutions.in</span>
            </a>
          </div>
          <div className="hidden md:block text-xs">
            80 Feet Ring Road, Mallathahalli, Bangalore - 560056
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <img 
                src="https://littleflowerinstitutions.com/wp-content/uploads/2024/01/main_logo-1.webp" 
                alt="Little Flower Group Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Little Flower Group</h1>
                <p className="text-xs text-gray-600">of Institutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-[#2d3589] font-medium transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Our Institutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#2d3589] font-medium transition-colors text-sm outline-none">
                  Our Institutions
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="text-[#2d3589] font-bold">Campus 1</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">Little Flower College of Nursing</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Little Flower Institute of Allied Health Sciences</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Little Flower College of Pharmacy</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Little Flower College of Physiotherapy</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Sree Venketeshwara School of Nursing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-[#2d3589] font-bold">Campus 2</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">D.R Vijayakumari School of Nursing</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">S V College of Nursing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                onClick={() => {
                  const event = new CustomEvent('openAdmissionForm');
                  window.dispatchEvent(event);
                }}
                className="bg-[#2d3589] hover:bg-[#232a6b] text-white"
              >
                Apply Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#2d3589] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-700 hover:text-[#2d3589] font-medium transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Institutions Dropdown */}
                <div className="py-2">
                  <div className="font-bold text-gray-900 mb-2">Our Institutions</div>
                  <div className="ml-4 space-y-2">
                    <div className="text-[#2d3589] font-semibold text-sm">Campus 1</div>
                    <div className="ml-2 text-sm text-gray-700 space-y-1">
                      <div>Little Flower College of Nursing</div>
                      <div>Little Flower Institute of Allied Health Sciences</div>
                      <div>Little Flower College of Pharmacy</div>
                      <div>Little Flower College of Physiotherapy</div>
                      <div>Sree Venketeshwara School of Nursing</div>
                    </div>
                    <div className="text-[#2d3589] font-semibold text-sm mt-2">Campus 2</div>
                    <div className="ml-2 text-sm text-gray-700 space-y-1">
                      <div>D.R Vijayakumari School of Nursing</div>
                      <div>S V College of Nursing</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const event = new CustomEvent('openAdmissionForm');
                    window.dispatchEvent(event);
                  }}
                  className="bg-[#2d3589] hover:bg-[#232a6b] text-white w-full"
                >
                  Apply Now
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

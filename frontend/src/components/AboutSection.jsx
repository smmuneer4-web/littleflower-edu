import React from 'react';
import { specializationsData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* WHO WE ARE Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              WHO WE ARE
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The Little Flower Group, managed by the <strong>SANDESH EDUCATIONAL CULTURAL AND CHARITABLE TRUST/SOCIETY®</strong>, has been dedicated to the pursuit of pure and scientific knowledge since 2002. In response to the growing demand for quality education in nursing, we have established various institutions to meet the needs of the global nursing industry.
              </p>
              
              <p>
                Our group's mission is to provide high-quality education and training to our aspiring nurses, ensuring that they are equipped with the latest knowledge and practical skills. We believe that this training translates into an effective clinical support system in both the Indian and global healthcare sectors.
              </p>
              
              <p>
                At Little Flower Group, we strive to set the highest standards in producing excellent nurses who can meet the challenges of the evolving healthcare system. We firmly believe in the power of knowledge to empower and uphold the truth.
              </p>
            </div>
          </div>
        </div>

        {/* COURSES WE OFFERED Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {specializationsData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {specializationsData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {specializationsData.courses.map((course, index) => (
            <Card 
              key={course.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-[#2d3589] hover:text-[#232a6b] hover:bg-blue-50 p-0 h-auto font-semibold group/btn"
                >
                  Learn More
                  <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import React from 'react';
import { advantagesData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Building2, Users, Microscope } from 'lucide-react';

const iconMap = {
  Building2: Building2,
  Users: Users,
  Microscope: Microscope
};

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={advantagesData.image}
                alt="Little Flower Advantage"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#2d3589] text-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">20+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {advantagesData.title}
              </h2>
              <p className="text-lg text-gray-600">
                {advantagesData.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {advantagesData.advantages.map((advantage) => {
                const IconComponent = iconMap[advantage.icon];
                return (
                  <Card 
                    key={advantage.id}
                    className="border-l-4 border-l-[#2d3589] hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="text-[#2d3589]" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {advantage.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {advantage.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

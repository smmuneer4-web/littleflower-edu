import React from 'react';
import { whyChooseUsData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { GraduationCap, IndianRupee, School, Warehouse, Home, Bus, Shield } from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  IndianRupee: IndianRupee,
  School: School,
  Warehouse: Warehouse,
  Home: Home,
  Bus: Bus,
  Shield: Shield
};

const WhyChooseSection = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {whyChooseUsData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {whyChooseUsData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsData.features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card 
                key={feature.id}
                className="group hover:shadow-xl transition-all duration-300 border hover:border-emerald-200"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-emerald-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

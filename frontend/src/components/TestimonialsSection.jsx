import React from 'react';
import { testimonialsData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {testimonialsData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {testimonialsData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonialsData.testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="hover:shadow-xl transition-all duration-300 border hover:border-emerald-200 relative overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote size={80} className="text-emerald-600" />
                </div>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-emerald-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed italic relative z-10">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

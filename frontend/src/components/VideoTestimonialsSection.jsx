import React from 'react';
import { videoTestimonialsData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Play } from 'lucide-react';

const VideoTestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {videoTestimonialsData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {videoTestimonialsData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonialsData.testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="text-[#2d3589] ml-1" size={28} fill="currentColor" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-[#2d3589]">{testimonial.location}</div>
                </div>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {testimonial.quote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;

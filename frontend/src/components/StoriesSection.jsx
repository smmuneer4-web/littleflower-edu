import React from 'react';
import { storiesData } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const StoriesSection = () => {
  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {storiesData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {storiesData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {storiesData.stories.map((story) => (
            <Card 
              key={story.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {story.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-[#2d3589] text-[#2d3589] hover:bg-blue-50 group"
          >
            Find More Stories
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;

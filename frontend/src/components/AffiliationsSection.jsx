import React from 'react';
import { Card, CardContent } from './ui/card';

const AffiliationsSection = () => {
  const affiliations = [
    {
      id: 1,
      title: "Little Flower College of Nursing",
      description: "Recognized by Rajiv Gandhi University of Health Science Karnataka and accredited by the Indian Nursing Council.",
      logos: [
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_20-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_21-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_19-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_18-removebg-preview.png"
      ]
    },
    {
      id: 2,
      title: "Sree Venkateshwara School of Nursing",
      description: "Endorsed by The Karnataka State Nursing Council and the Indian Nursing Council.",
      logos: [
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_21-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_19-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_18-removebg-preview.png"
      ]
    },
    {
      id: 3,
      title: "Little Flower Institute of Allied Health Sciences",
      description: "Affiliated with Rajiv Gandhi University of Health Sciences, Karnataka, and approved by the Karnataka Nursing & Paramedical Sciences Education (Regulating) Authority.",
      logos: [
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_20-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_19-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_22-removebg-preview.png"
      ]
    },
    {
      id: 4,
      title: "Little Flower College of Pharmacy",
      description: "Accredited by the Pharmacy Council of India and recognized by the Government of Karnataka.",
      logos: [
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_23-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_19-removebg-preview.png"
      ]
    },
    {
      id: 5,
      title: "Little Flower College of Physiotherapy",
      description: "Recognized by the Government of Karnataka and aligned with industry standards.",
      logos: [
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_19-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2024/01/Untitled_design_20-removebg-preview.png",
        "https://littleflowerinstitutions.com/wp-content/uploads/2025/04/Untitled-design-3.png"
      ]
    }
  ];

  return (
    <section id="affiliations" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            OUR AFFILIATIONS
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Little Flower Group of Institutions is recognized widely by all major important government bodies.
          </p>
        </div>

        <div className="space-y-8">
          {affiliations.map((affiliation) => (
            <Card 
              key={affiliation.id}
              className="hover:shadow-xl transition-all duration-300 border"
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {affiliation.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {affiliation.description}
                </p>
                
                <div className="flex flex-wrap gap-6 items-center">
                  {affiliation.logos.map((logo, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <img
                        src={logo}
                        alt={`Affiliation logo ${index + 1}`}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AffiliationsSection;

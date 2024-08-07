// src/components/FeaturedProperties.js

import React from 'react';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Villa',
    image: 'https://via.placeholder.com/400x300.png?text=Luxury+Villa',
    description: 'Experience luxury in this stunning villa.',
    price: '$3000/month',
  },
  {
    id: 2,
    title: 'Modern Apartment',
    image: 'https://via.placeholder.com/400x300.png?text=Modern+Apartment',
    description: 'A modern apartment with all amenities.',
    price: '$1500/month',
  },
  {
    id: 3,
    title: 'Cozy Cottage',
    image: 'https://via.placeholder.com/400x300.png?text=Cozy+Cottage',
    description: 'A cozy cottage perfect for a weekend getaway.',
    price: '$800/month',
  },
  {
    id: 4,
    title: 'Cozy Cottage',
    image: 'https://via.placeholder.com/400x300.png?text=Cozy+Cottage',
    description: 'A cozy cottage perfect for a weekend getaway.',
    price: '$800/month',
  },
  {
    id: 5,
    title: 'Cozy Cottage',
    image: 'https://via.placeholder.com/400x300.png?text=Cozy+Cottage',
    description: 'A cozy cottage perfect for a weekend getaway.',
    price: '$800/month',
  },
  {
    id: 6,
    title: 'Cozy Cottage',
    image: 'https://via.placeholder.com/400x300.png?text=Cozy+Cottage',
    description: 'A cozy cottage perfect for a weekend getaway.',
    price: '$800/month',
  },
];

const FeaturedProperties = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property) => (
          <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-bold">{property.title}</h3>
              <p className="text-gray-600">{property.description}</p>
              <p className="text-lg font-semibold mt-2">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;

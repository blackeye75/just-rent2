// src/components/HowItWorks.js

import React from "react";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-6xl text-gray-800 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Search Properties</h3>
            <p className="text-gray-600">
              Find properties that match your needs and preferences.
            </p>
          </div>
          <div>
            <div className="text-6xl text-gray-800 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Contact Owners</h3>
            <p className="text-gray-600">
              Reach out to property owners to get more details.
            </p>
          </div>
          <div>
            <div className="text-6xl text-gray-800 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Make a Deal</h3>
            <p className="text-gray-600">
              Finalize the rental or borrowing agreement easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

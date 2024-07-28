// src/components/CallToAction.js

import React from "react";

const CallToAction = () => {
  return (
    <div className="bg-blue-600 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="text-lg mb-8">
          Sign up now and start exploring a wide range of rental and borrowing
          options.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default CallToAction;

// src/components/ImageCarousel.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://plus.unsplash.com/premium_photo-1661510281120-91ed4ae73925?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661596587864-1a1f796b52a0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661594860012-39070b91a874?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661371804252-f4f6b1b22676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="relative w-full md:h-[92.2vh] h-screen ">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-7xl text-white font-['Courgette'] shadow-xl font-bold mb-4">
          {"Just Rent".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-fade-in-down"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase mb-2">
          Rent & Borrow Properties
        </h2>
        <p className="text-3xl font-extrabold font-['Roboto_Condensed'] text-white sm:text-4xl">
          Find Your Perfect Property
        </p>
        <p className="mt-3 max-w-2xl text-lg text-gray-300 sm:mx-auto text-center">
          Explore a wide range of rental and borrowing options tailored to your
          needs.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;

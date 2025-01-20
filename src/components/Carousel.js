"use client";

import { useState } from "react";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-96 flex items-center bg-gray-100 border border-gray-300 rounded-lg shadow-md"
          >
            {/* Left Section */}
            <div className="w-1/3 h-full">
              <img
                src={slide.leftImage}
                alt={`Left ${index}`}
                className="h-full w-full object-cover rounded-l-lg"
              />
            </div>

            {/* Middle Section */}
            <div className="w-1/3 h-full flex flex-col justify-center items-center px-4">
              <h2 className="text-lg font-bold text-gray-800">{slide.title}</h2>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {slide.description}
              </p>
            </div>

            {/* Right Section */}
            <div className="w-1/3 h-full">
              <img
                src={slide.rightImage}
                alt={`Right ${index}`}
                className="h-full w-full object-cover rounded-r-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md"
      >
        &larr;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md"
      >
        &rarr;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

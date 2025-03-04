import React, { useState, useEffect } from "react";

// Dynamically import all images from the uploads folder
const imageFiles = import.meta.glob("../assets/uploads/banner/*.{png,jpg,jpeg,webp}");

const HeroBanner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch image paths dynamically
    const loadImages = async () => {
      const paths = await Promise.all(Object.keys(imageFiles).map(async (path) => {
        const module = await imageFiles[path]();
        return module.default;
      }));
      setImages(paths);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full h-84 relative my-4 rounded-lg overflow-hidden shadow-lg">
      {/* Ensure images are loaded before displaying */}
      {images.length > 0 ? (
        <img
          src={images[currentIndex]}
          alt="Hero Banner"
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">Loading images...</p>
        </div>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

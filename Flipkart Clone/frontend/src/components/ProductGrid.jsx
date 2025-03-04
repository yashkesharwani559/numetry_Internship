import React from "react";

// Importing images from assets/uploads/items folder
import smartwatch from "../assets/uploads/items/smartwatch.webp";
import laptop from "../assets/uploads/items/laptop.jpg";
import headphones from "../assets/uploads/items/headphones.webp";
import speaker from "../assets/uploads/items/speaker.webp";

const products = [
  { name: "Smartwatch", price: "₹1,999", image: smartwatch },
  { name: "Laptop", price: "₹59,999", image: laptop },
  { name: "Headphones", price: "₹2,499", image: headphones },
  { name: "Speaker", price: "₹3,999", image: speaker },
];

const ProductGrid = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800">Best of Electronics</h2>
        <button className="text-blue-600 font-semibold hover:underline text-lg">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col items-center"
          >
            {/* Hover Effect Applied on Image */}
            <div className="overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Centered Text Below Image */}
            <h3 className="text-xl font-semibold mt-4 text-gray-800 text-center">
              {product.name}
            </h3>
            <p className="text-blue-600 font-bold text-lg text-center">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

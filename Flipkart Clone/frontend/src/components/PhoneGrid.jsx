import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Importing images directly
import vivoT3 from "../assets/uploads/phones/moto-g35.webp";

const products = [
  { name: "Motorola Edge 50 Pro", price: "Just ₹20,999*", image: vivoT3 },
  { name: "Vivo T3 5G", price: "From ₹16,999*", image: vivoT3 },
  { name: "CMF Phone 1 (8GB)", price: "Just ₹12,999*", image: vivoT3 },
  { name: "Moto G35 5G", price: "From ₹9,999*", image: vivoT3 },
  { name: "Moto G64 5G", price: "Just ₹12,999*", image: vivoT3 },
  { name: "Nothing Phone 2a", price: "From ₹21,999*", image: vivoT3 },
  { name: "Realme P1 5G", price: "From ₹13,999*", image: vivoT3 },
];

const PhoneGrid = () => {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Deals on Smartphones</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <div className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center gap-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-44 h-44 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-md font-semibold text-gray-800 text-center mt-1">{product.name}</h3>
              <p className="text-blue-600 font-bold text-sm text-center">{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhoneGrid;

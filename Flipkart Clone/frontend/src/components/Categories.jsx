import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const categories = [
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👕", dropdown: ["Men's Clothing", "Women's Clothing", "Footwear", "Watches", "Bags", "Jewelry", "Sunglasses", "Sportswear", "Ethnic Wear", "Winter Wear", "Hats", "Socks"] },
  { name: "Electronics", icon: "💻", dropdown: ["Laptops", "Smartphones", "Cameras", "Headphones", "Smartwatches", "Gaming Consoles", "Printers", "Tablets", "Monitors", "Power Banks", "Speakers", "Drones"] },
  { name: "Home & Furniture", icon: "🛏️", dropdown: ["Beds", "Sofas", "Chairs", "Dining Tables", "Wardrobes", "Curtains", "Lighting", "Storage Units", "Mattresses", "Study Tables", "Carpets", "Paintings"] },
  { name: "Appliances", icon: "🔌" },
  { name: "Flight Bookings", icon: "✈️" },
  { name: "Beauty, Toys & More", icon: "🧸", dropdown: ["Makeup", "Skincare", "Haircare", "Perfumes", "Toys", "Board Games", "Soft Toys", "Action Figures", "Puzzles", "Dolls", "Stationery", "Crafts"] },
  { name: "Two Wheelers", icon: "🏍️", dropdown: ["Scooters", "Motorcycles", "Electric Bikes", "Helmets", "Riding Jackets", "Gloves", "Bike Covers", "Tires", "Engine Oil", "Bike Accessories", "Spare Parts", "Toolkits"] },
];

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="bg-white p-4 shadow-md relative z-40">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center relative overflow-visible">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onMouseEnter={() => setHoveredCategory(cat.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-6xl">{cat.icon}</span>
              {cat.dropdown && <ChevronDownIcon className="w-5 h-5 text-gray-600" />}
            </div>
            <span className="text-sm font-semibold text-gray-700 mt-1">{cat.name}</span>

            {/* Dropdown Menu */}
            {cat.dropdown && hoveredCategory === cat.name && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg w-120 border border-gray-200 z-50 mt-2 h-100">
                <ul className={`text-gray-700 text-sm grid ${cat.dropdown.length > 5 ? "grid-cols-2" : "grid-cols-1"} gap-1 p-2`}>
                  {cat.dropdown.map((item, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

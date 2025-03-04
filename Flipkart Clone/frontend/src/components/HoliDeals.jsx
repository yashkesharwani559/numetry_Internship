import React from "react";

const imagePath = "/assets/uploads/templates/"; // Parent path for images (assuming images are in public folder)

const imageNames = [
  "washing-machine.webp",
  "watch.webp",
  "jewellery.webp",
  "flight.webp",
  "ac.webp",
  "iphone.webp",
  "laptop.webp",
  "moto.webp",
  "home-theatre.webp",
];

const HoliDeals = () => {
  return (
    <div className="p-2 bg-gray-100">
      {/* Grid for Images */}
      <div className="grid grid-cols-3 gap-4">
        {imageNames.map((image, index) => (
          <div key={index} className="w-150 h-70 p-2 flex justify-center items-center shadow-md rounded-lg">
            <img src={`${imagePath}${image}`} alt={`Deal ${index + 1}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoliDeals;

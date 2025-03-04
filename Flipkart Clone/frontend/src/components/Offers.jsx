import React, { useRef } from "react";

const offers = [
  {
    image: "/assets/uploads/offers/dress.png",
    title: "Vero Moda, Levi's...",
    discount: "60-80% Off",
  },
  {
    image: "/assets/uploads/offers/kids-dress.png",
    title: "Kids' Dresses, T-Shirts...",
    discount: "Under ₹399",
  },
  {
    image: "/assets/uploads/offers/suitcase.png",
    title: "Safari, Aristocrat & more",
    discount: "Min. 70% Off",
  },
  {
    image: "/assets/uploads/offers/watch.png",
    title: "French Connection, Fastrack",
    discount: "Min 70% Off",
  },
  {
    image: "/assets/uploads/offers/shoes.png",
    title: "Top Offers",
    discount: "Min. 70% Off",
  },
  {
    image: "/assets/uploads/offers/shirt.png",
    title: "USPA, Killer, Tommy Hilfiger...",
    discount: "60-80% Off",
  },
  {
    image: "/assets/uploads/offers/stylish.png",
    title: "Open knit, baggy jeans",
    discount: "From ₹249",
  },
];

const TopOffers = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Top Offers</h2>

      <div className="relative">
        {/* Left Scroll Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          onClick={() => scroll("left")}
        >
          ◀
        </button>

        {/* Scrollable Offers List */}
        <div ref={scrollRef} className="flex overflow-x-auto space-x-6 scrollbar-hide p-2">
          {offers.map((offer, index) => (
            <div key={index} className="flex flex-col items-center min-w-[120px]">
              <div className="w-[240px] h-[290px] flex items-center justify-center bg-gray-100 rounded-lg">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="text-xl text-gray-700 mt-2 text-center">{offer.title}</p>
              <p className="text-md font-semibold text-green-600">{offer.discount}</p>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          onClick={() => scroll("right")}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default TopOffers;

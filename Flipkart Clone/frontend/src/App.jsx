import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import PhoneGrid from "./components/PhoneGrid";
import Footer from "./components/Footer";
import Login from "./components/Login";
import HoliDeals from "./components/HoliDeals";
import Offers from "./components/Offers";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Categories />

      {showLogin ? (
        <Login onBack={() => setShowLogin(false)} />
      ) : (
        <>
          <HeroBanner />
          <ProductGrid />
          <Offers />
          <HoliDeals />
          <Offers />
          <PhoneGrid />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;

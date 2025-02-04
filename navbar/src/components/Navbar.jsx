
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="text-white font-semibold text-2xl">MyBrand</div>

        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-gray-400">Home</a>
          <a href="#services" className="text-white hover:text-gray-400">Services</a>
          <a href="#about" className="text-white hover:text-gray-400">About</a>
          <a href="#contact" className="text-white hover:text-gray-400">Contact</a>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-gray-800 flex flex-col items-center justify-center z-50">
          <a href="#home" className="text-white py-4 text-xl" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#services" className="text-white py-4 text-xl" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#about" className="text-white py-4 text-xl" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" className="text-white py-4 text-xl" onClick={() => setIsOpen(false)}>Contact</a>
          <button
            className="text-white mt-6 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✖ Close
          </button>
        </div>
      )}
    </nav>
  );
}


// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="w-full bg-gray-800 shadow-lg">
//       <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="text-white font-semibold text-2xl">
//           MyBrand
//         </div>
        
//         <div className="hidden md:flex space-x-8">
//           <a href="#home" className="text-white hover:text-gray-400">Home</a>
//           <a href="#services" className="text-white hover:text-gray-400">Services</a>
//           <a href="#about" className="text-white hover:text-gray-400">About</a>
//           <a href="#contact" className="text-white hover:text-gray-400">Contact</a>
//         </div>

//         <button
//           className="md:hidden text-white focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✖" : "☰"}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="md:hidden bg-gray-800 p-4">
//           <a href="#home" className="block text-white py-2">Home</a>
//           <a href="#services" className="block text-white py-2">Services</a>
//           <a href="#about" className="block text-white py-2">About</a>
//           <a href="#contact" className="block text-white py-2">Contact</a>
//         </div>
//       )}
//     </nav>
//   );
// }


// // import { useState } from "react";
// // import { Menu, X } from "lucide-react";

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <nav className="bg-blue-600 text-white shadow-lg">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16 items-center">
// //           {/* Logo */}
// //           <div className="text-2xl font-bold">MyBrand</div>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-6">
// //             <a href="#" className="hover:text-gray-200 transition">Home</a>
// //             <a href="#" className="hover:text-gray-200 transition">About</a>
// //             <a href="#" className="hover:text-gray-200 transition">Services</a>
// //             <a href="#" className="hover:text-gray-200 transition">Contact</a>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button
// //             className="md:hidden focus:outline-none"
// //             onClick={() => setIsOpen(!isOpen)}
// //           >
// //             {isOpen ? <X size={28} /> : <Menu size={28} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isOpen && (
// //         <div className="md:hidden bg-blue-700">
// //           <a href="#" className="block px-4 py-2 hover:bg-blue-800">Home</a>
// //           <a href="#" className="block px-4 py-2 hover:bg-blue-800">About</a>
// //           <a href="#" className="block px-4 py-2 hover:bg-blue-800">Services</a>
// //           <a href="#" className="block px-4 py-2 hover:bg-blue-800">Contact</a>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // }


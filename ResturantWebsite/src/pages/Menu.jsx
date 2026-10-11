import React from 'react';
import { burgers } from "../data/burgers";

export default function Menu() {
  return (
    <section className="p-12 pt-20  min-h-screen">
      <h3 className="display-lg text-center font-bold text-gray-800 mb-10">Menu</h3>
      
      <div className="menu-container p-6 rounded-lg max-w-6xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {burgers.map((burger) => (
            <li 
              key={burger.id} 
              className="bg-orange-600 text-white rounded-2xl p-6 shadow-xl flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
            >
              {/* Perfect Circular Image with spacing */}
              <div className="w-40 h-40 mb-4 overflow-hidden rounded-full border-4 border-white shadow-md">
                <img 
                  className="w-full h-full object-cover" 
                  src={burger.image} 
                  alt={burger.name} 
                />
              </div>

              {/* Title & Tagline */}
              <h4 className="text-xl font-extrabold tracking-wide mb-1">{burger.name}</h4>
              <p className="text-orange-200 text-xs italic mb-3 font-medium">{burger.tagLine}</p>
              
              {/* Description box expands to push price to the bottom */}
              <p className="text-sm text-orange-100 line-clamp-3 mb-4 flex-grow">
                {burger.description}
              </p>

              {/* Bottom Row: Price and Spice Level Split Perfectly */}
              <div className="w-full pt-3 border-t border-orange-500/40 flex justify-between items-center text-sm font-semibold">
                <span className="bg-white text-orange-700 px-3 py-1 rounded-full shadow-sm">
                  ${burger.price.toFixed(2)}
                </span>
                <span className="text-orange-200">
                  🔥 {burger.spice}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
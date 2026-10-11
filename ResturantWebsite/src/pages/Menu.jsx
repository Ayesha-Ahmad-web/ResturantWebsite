import React from 'react';
import { burgers } from "../data/burgers";

export default function Menu() {
  return (
    <section className="p-8 md:p-12 min-h-screen ">
      {/* Menu Header Area */}
      <div className="text-center mb-16"> 
        <h3 className="text-5xl md:text-7xl font-extrabold text-white tracking-wide uppercase mt-2">
          Menu
        </h3>
      </div>
      
      {/* Alternating List Container */}
      <div className="max-w-4xl mx-auto px-4">
        <ul className="flex flex-col gap-16 w-full">
          {burgers.map((burger, index) => {
            // Check if index is even to alternate layouts
            const isEven = index % 2 === 0;

            return (
              <li 
                key={burger.id} 
                className={`flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full relative ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* 1. Circular Image Wrapper */}
                <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 z-10 relative">
                  <img 
                    className="w-full h-full object-cover rounded-full border-4 border-[#E5A93C] shadow-2xl bg-amber-50" 
                    src={burger.image} 
                    alt={burger.name} 
                  />
                </div>

                {/* 2. Text Content Block */}
                <div className="flex-1  bg-orange-600 text-gray-800 p-6 md:p-8 rounded-3xl md:rounded-[40px] shadow-lg relative min-h-[160px] flex flex-col justify-center w-full">
                  
                  {/* Dynamic Floating Price Badge (Position shifts depending on layout) */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-[#E5A93C] text-white font-bold text-lg shadow-md z-20 ${
                    isEven ? '-right-8' : '-left-8'
                  }`}>
                    ₹{burger.price}
                  </div>

                  {/* Header Title */}
                  <h4 className="text-xl md:text-2xl font-black text-amber-950 uppercase tracking-wide mb-1">
                    {burger.name}
                  </h4>
                  
                  {/* Tagline */}
                  <p className="text-xs text-amber-700 italic font-medium mb-3">
                    {burger.tagLine}
                  </p>

                  {/* Description Box */}
                  <p className="text-sm text-gray-600 font-normal leading-relaxed max-w-xl">
                    {burger.description}
                  </p>

                  {/* Mobile-Only Price and Spice Indicator */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 sm:hidden">
                    <span className="font-bold text-lg text-amber-800">₹{burger.price}</span>
                    <span className="text-sm text-gray-500">Spice: {burger.spice}</span>
                  </div>
                </div>

              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
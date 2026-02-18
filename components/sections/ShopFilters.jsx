'use client';

import { useState } from 'react';

export default function ShopFilters() {
  const [selectedCategory, setSelectedCategory] = useState('drinkware');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 1000]);

  const categories = [
    { id: 'drinkware', name: 'Drinkware' },
    { id: 'tableware', name: 'Tableware' },
    { id: 'storage', name: 'Storage' },
    { id: 'gardenware', name: 'Gardenware' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'home-deco', name: 'Home Deco' },
  ];

  const brands = [
    { id: 'cgg', name: 'CGG Eco' },
    { id: 'bamboo', name: 'Bamboo Craft' },
    { id: 'rice', name: 'Rice Husk' },
    { id: 'coffee', name: 'Coffee Grounds' },
    { id: 'artdeco', name: 'Artdeco' },
  ];

  const colors = [
    { id: 'white', name: 'White', color: '#ffffff' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'blue', name: 'Blue', color: '#0000ff' },
    { id: 'red', name: 'Red', color: '#ff0000' },
    { id: 'yellow', name: 'Yellow', color: '#ffff00' },
    { id: 'orange', name: 'Orange', color: '#ffa500' },
    { id: 'brown', name: 'Brown', color: '#8b4513' },
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleColorChange = (colorId) => {
    setSelectedColors(prev =>
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200 h-screen overflow-y-auto">
      {/* Navigation Menu */}
      <nav className="mb-8">
        <ul className="space-y-3">
          <li>
            <a href="/" className="text-gray-600 text-sm hover:text-orange-500 transition-colors">HOME</a>
          </li>
          <li>
            <a href="/products/allproducts" className="text-orange-500 text-sm font-semibold border-b-2 border-orange-500 pb-1">SHOP</a>
          </li>
          <li>
            <a href="#" className="text-gray-600 text-sm hover:text-orange-500 transition-colors">PRODUCT</a>
          </li>
          <li>
            <a href="/cart" className="text-gray-600 text-sm hover:text-orange-500 transition-colors">CART</a>
          </li>
        </ul>
      </nav>

      {/* Promo Buttons */}
      <div className="mb-8 space-y-3">
        <button className="w-full py-3 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange-600 transition-colors">
          %Discount%
        </button>
        <button className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 transition-colors">
          New this week
        </button>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-bold text-sm uppercase mb-4 tracking-wide">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className={`text-left w-full text-sm transition-colors duration-200 ${
                  selectedCategory === category.id 
                    ? 'text-orange-500 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Filter */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-bold text-sm uppercase mb-4 tracking-wide">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center">
              <input
                type="checkbox"
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-offset-0"
              />
              <label htmlFor={brand.id} className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors Filter */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-bold text-sm uppercase mb-4 tracking-wide">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                selectedColors.includes(color.id) 
                  ? 'border-orange-500 scale-110' 
                  : 'border-gray-300 hover:scale-110'
              }`}
              style={{ backgroundColor: color.color }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-gray-900 font-bold text-sm uppercase mb-4 tracking-wide">Price</h3>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-3">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
            />
          </div>
          <div className="mt-3 text-xs text-gray-600">
            Range: ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex justify-between">
          <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
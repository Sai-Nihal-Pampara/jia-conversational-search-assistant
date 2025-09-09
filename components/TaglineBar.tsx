
import React from 'react';

const tags = [
  "Tones", "Embellished", "Pastels", "Kaftan", "Anarkali", "Floral", 
  "Block Prints", "A-Line", "Embroidery", "Co-Ord Sets", "Jewel Tones",
  "Embellished", "Pastels", "Kaftan"
];

export const TaglineBar: React.FC = () => {
  return (
    <div className="w-full bg-white py-2 overflow-x-auto">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-center space-x-2 whitespace-nowrap">
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <button 
              onClick={() => alert(`Showing results for "${tag}"`)}
              className="text-sm text-gray-700 hover:text-black font-medium"
            >
              {tag}
            </button>
            {index < tags.length - 1 && <span className="text-gray-300">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

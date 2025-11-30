import React, { useState } from "react";

const ColorGrid = () => {
  const gridSize = 25; 
  const [activeSquares, setActiveSquares] = useState(
    Array(gridSize).fill(false)
  );

  const toggleSquare = (index) => {
    const updated = [...activeSquares];
    updated[index] = !updated[index];
    
    setActiveSquares(updated);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      
      <div className="grid grid-cols-5 gap-3 justify-center">
        {activeSquares.map((active, i) => (
          <div
            key={i}
            onClick={() => toggleSquare(i)}
            className={`w-[50px] h-[50px] cursor-pointer transition
              ${active ? "bg-blue-500" : "bg-gray-500"}
              hover:shadow-md  hover:border-4`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorGrid;

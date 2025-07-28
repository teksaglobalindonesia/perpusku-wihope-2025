'use client';
import React from 'react';

const Pagination = () => {
  return (
    <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
      {['<', 1, 2, '...', 20, '>'].map((item, index) => (
        <div
          key={index}
          className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-200"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagination;

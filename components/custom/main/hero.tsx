'use client';

import React from 'react';

const Hero = () => {
  return (
    <div className="flex h-[670px] w-full items-center justify-between bg-white">
      <div className="w-1/4 text-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/10/03/20/30/book-2814026_1280.jpg"
          alt="Left Illustration"
          className="h-auto w-full"
        />
      </div>
      <div className="w-1/2 text-center">
        <h1 className="text-5xl font-light underline">Perpusku</h1>
        <p>Time And Knowledge Just For You.</p>
      </div>
      <div className="w-1/4 text-center">
        <img
          src="https://img.chrono24.com/images/uhren/32529139-psams0gfcjsgylzkdw7u4ytw-ExtraLarge.jpg"
          alt="Right Illustration"
          className="h-auto w-full pr-12"
        />
      </div>
    </div>
  );
};

export default Hero;

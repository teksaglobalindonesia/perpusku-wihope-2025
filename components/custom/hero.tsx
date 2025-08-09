'use client';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="flex h-[670px] w-full items-center justify-between bg-white px-8">
      {/* Kiri */}
      <div className="flex w-1/4 justify-center">
        <Image
          src="https://cdn.pixabay.com/photo/2017/10/03/20/30/book-2814026_1280.jpg"
          alt="Left Illustration"
          width={300}
          height={400}
          className="rounded-lg object-cover"
          priority
        />
      </div>

      {/* Tengah */}
      <div className="w-1/2 text-center">
        <h1 className="mb-4 text-5xl font-light underline">Perpusku</h1>
        <p className="text-lg text-gray-600">
          Time And Knowledge Just For You.
        </p>
      </div>

      {/* Kanan */}
      <div className="flex w-1/4 justify-center pr-6">
        <Image
          src="https://img.chrono24.com/images/uhren/32529139-psams0gfcjsgylzkdw7u4ytw-ExtraLarge.jpg"
          alt="Right Illustration"
          width={300}
          height={400}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;

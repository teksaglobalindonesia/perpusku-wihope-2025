'use client';

import React from 'react';

const Footer = () => {
  return (
    <div className="flex h-[120px] w-full flex-row items-center justify-between bg-blue-900 p-12 text-white">
      <div>
        <h2 className="text-lg font-bold">About Us</h2>
        <p>Learn more about our company and values.</p>
      </div>
      <div className="pr-12">
        <h2 className="text-lg font-bold">Contact</h2>
        <p>Email: contact@company.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div className="pr-40">
        <h2 className="text-lg font-bold">Follow Us</h2>
        <p>Social media links</p>
      </div>
    </div>
  );
};

export default Footer;

'use client';

import React from 'react';

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-8 bg-white p-6 text-black transition-colors duration-700 md:h-[120px] md:flex-row md:gap-10 md:p-4 dark:bg-black dark:text-white">
      {/* About */}
      <div className="text-center md:text-left">
        <h2 className="text-lg font-bold">About Us</h2>
        <p>Learn more about our company and values.</p>
      </div>

      {/* Contact */}
      <div className="text-center md:text-left">
        <h2 className="text-lg font-bold">Contact</h2>
        <p>Email: contact@company.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>

      {/* Follow Us */}
      <div className="text-center md:text-left">
        <h2 className="text-lg font-bold">Follow Us</h2>
        <p>Social media links</p>
      </div>
    </div>
  );
};

export default Footer;

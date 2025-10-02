'use client';

import React from 'react';
import About from '@/components/custom/about/about';
import History1 from '@/components/custom/history/history1';
import History2 from '@/components/custom/history/history2';
import History3 from '@/components/custom/history/history3';
import History4 from '@/components/custom/history/history4';
import History5 from '@/components/custom/history/history5';
import Test from '@/components/custom/about/test';

export default function Page() {
  return (
    <>
      <div className="mt-10 text-white dark:text-black">.</div>
      <h1 className="mt-10 flex h-[470px] flex-row items-center justify-center text-5xl">
        {' '}
        <span className="rounded-lg bg-blue-400 px-5 py-3 font-normal underline dark:bg-purple-700">
          📚 Apa Itu Perpusku?
        </span>
      </h1>
      <Test />
      <About />
      <History1 />
      <History2 />
      <History3 />
      <History4 />
      <History5 />
    </>
  );
}

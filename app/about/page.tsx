'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Import komponen
import About from '@/components/custom/about/about';
import VisiMisi from '@/components/custom/about/visimisi';
import History1 from '@/components/custom/history/history1';
import History2 from '@/components/custom/history/history2';
import History3 from '@/components/custom/history/history3';
import History4 from '@/components/custom/history/history4';
import History5 from '@/components/custom/history/history5';

// Daftarkan plugin GSAP
gsap.registerPlugin(TextPlugin);

export default function Page() {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    const finalText = '📚 Apa Itu Perpusku?';

    // Efek huruf acak sebelum teks final muncul
    gsap.fromTo(
      element,
      { text: '' },
      {
        duration: 3,
        text: {
          value: finalText,
          delimiter: ''
          // Hilangkan scrambleText karena tidak termasuk opsi bawaan TextPlugin
        },
        ease: 'power2.inOut'
      }
    );
  }, []);

  return (
    <>
      <div className="mt-10 text-white dark:text-black">.</div>

      <h1 className="mt-10 flex h-[470px] flex-row items-center justify-center text-5xl font-semibold">
        <span
          ref={textRef}
          className="rounded-lg bg-blue-400 px-5 py-3 text-center font-normal underline dark:bg-purple-700"
        >
          📚 Apa Itu Perpusku?
        </span>
      </h1>

      {/* Komponen lainnya */}
      <About />
      <VisiMisi />
      <History1 />
      <History2 />
      <History3 />
      <History4 />
      <History5 />
    </>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HistoryLeft() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.history-left-image', {
        opacity: 0,
        x: -150,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.history-left-image',
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });

      gsap.from('.history-left-text', {
        opacity: 0,
        x: 150,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.history-left-text',
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex min-h-[640px] items-center justify-center px-8"
    >
      <div className="grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Foto */}
        <div className="history-left-image">
          <Image
            src="/sejarahPerpusku(1)(2).png"
            alt="Perpusku"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg"
          />
        </div>
        {/* Text */}
        <div className="history-left-text">
          <h2 className="mb-4 text-3xl font-bold">Awal dari Tiga Buku</h2>
          <p className="leading-relaxed ">
            Bertahun kemudian, setelah jadi guru sederhana, Arga mulai
            mengumpulkan buku. Hanya tiga buku lusuh peninggalan sahabatnya yang
            meninggal, ia letakkan di gubuk kecil bekas kandang ayam. Anak-anak
            berdatangan, duduk di lantai tanah, namun mata mereka berbinar.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  useEffect(() => {
    // Animasi judul: muncul dari bawah + fade in
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 80, scale: 0.8 }, // kondisi awal
      { opacity: 1, y: 0, scale: 1.7, duration: 1.2, ease: 'power4.inOut' } // kondisi akhir
    );

    // Animasi garis
    gsap.fromTo(
      '.hero-line',
      { width: 0 },
      { width: 450, duration: 2, delay: 1, ease: 'power3.inOut' }
    );
  }, []);

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="hero-title text-5xl font-extrabold tracking-wide">
        Halo Dunia
      </h1>
      <div className="hero-line mt-5 h-1.5 bg-white" style={{ width: 0 }}></div>
    </section>
  );
}

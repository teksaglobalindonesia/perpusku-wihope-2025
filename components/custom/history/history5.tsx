'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi masuk untuk gambar (zoom dari tengah)
      gsap.from('.about-image', {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 85%',
          toggleActions: 'play none none reset'
        }
      });

      // Animasi masuk untuk teks (fade-in + naik dari bawah)
      gsap.from('.about-text', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 90%',
          toggleActions: 'play none none reset'
        }
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center px-6 py-12 md:px-20"
    >
      {/* Foto di atas */}
      <div className="about-image mb-8 h-48 w-48 md:h-72 md:w-72">
        <Image
          src="/sejarahPerpusku5.png"
          width={400}
          height={400}
          alt="Profile"
          className="h-full w-full rounded-xl border border-gray-200 object-cover shadow-lg"
        />
      </div>

      {/* Teks di bawah */}
      <div className="about-text max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
          Lahirnya Perpusku
        </h1>
        <p className="text-lg leading-relaxed md:text-xl">
          Dari gubuk rapuh menjadi rumah pengetahuan, Perpusku lahir. Ia bukan
          sekadar bangunan penuh buku, melainkan monumen cinta, perjuangan, dan
          harapan. Di sana, setiap halaman buku bercerita, bukan hanya tentang
          dunia, tetapi juga tentang jiwa-jiwa yang rela berkorban agar
          pengetahuan tetap hidup.
        </p>
      </div>
    </section>
  );
}

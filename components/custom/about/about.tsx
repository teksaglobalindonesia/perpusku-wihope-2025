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
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });

      // Animasi masuk untuk teks (fade-in + sedikit naik dari bawah)
      gsap.from('.about-text', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
          toggleActions: 'play none none reset'
        }
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      ref={containerRef}
      className="mt-32 flex min-h-screen w-screen flex-col items-center justify-center px-6 md:flex-row md:items-start md:px-20"
    >
      {/* Foto */}
      <div className="about-image mb-8 h-48 w-48 flex-shrink-0 md:mb-0 md:mr-12 md:h-72 md:w-72">
        <Image
          src="/perpusku.png"
          width={400}
          height={400}
          alt="Profile"
          className="h-full w-full rounded-xl border border-gray-200 object-cover shadow-lg"
        />
      </div>

      {/* Teks */}
      <div className="about-text max-w-xl text-center md:text-left">
        <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
          📚 Tentang Perpusku
        </h1>
        <p className="text-lg leading-relaxed md:text-xl">
          Halo, selamat datang di Perpusku! 🎉 Kami adalah perpustakaan yang
          hadir untuk menemani perjalanan belajarmu dengan cara yang seru dan
          menyenangkan. Di sini, kamu bisa menemukan berbagai koleksi buku,
          pengetahuan, dan inspirasi yang siap memperkaya hari-harimu.
          <br />
          <br />
          Bagi kami, perpustakaan bukan sekadar tempat menyimpan buku, tapi
          ruang untuk berbagi cerita, ide, dan pengalaman. Yuk, jelajahi
          Perpusku dan temukan dunia baru di setiap halamannya! ✨
        </p>
      </div>
    </section>
  );
}

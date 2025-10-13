'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisiMisi() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const visiRef = useRef(null);
  const misiItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk judul
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
        }
      });

      // Animasi untuk teks visi
      gsap.from(visiRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: visiRef.current,
          start: 'top 80%'
        }
      });

      // Animasi untuk daftar misi (stagger)
      gsap.from(misiItemsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-6 py-20 transition-colors duration-700 dark:from-gray-900 dark:to-purple-950"
    >
      <div className="max-w-4xl text-center">
        {/* Judul */}
        <h2
          ref={titleRef}
          className="decoration mb-10 text-5xl font-bold text-blue-600 underline underline-offset-8 dark:text-purple-400"
        >
          🌟 Visi & Misi Perpusku
        </h2>

        {/* Visi */}
        <div className="mb-14">
          <h3 className="mb-4 text-3xl font-semibold text-blue-500 dark:text-purple-500">
            Visi
          </h3>
          <p
            ref={visiRef}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            Menjadi pusat literasi digital yang inspiratif, inklusif, dan
            inovatif — mendorong masyarakat untuk mencintai membaca dan berbagi
            ilmu pengetahuan di era modern.
          </p>
        </div>

        {/* Misi */}
        <div>
          <h3 className="mb-5 text-3xl font-semibold text-blue-500 dark:text-purple-500">
            Misi
          </h3>
          <ul className="list-inside list-disc space-y-3 text-left text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {[
              'Menyediakan akses mudah terhadap koleksi buku fisik dan digital yang berkualitas.',
              'Menumbuhkan minat baca melalui kegiatan edukatif dan komunitas literasi.',
              'Mengintegrasikan teknologi untuk mendukung perpustakaan modern dan ramah pengguna.',
              'Mendorong kolaborasi antara pembaca, penulis, dan pendidik dalam ekosistem literasi terbuka.',
              'Menyediakan ruang belajar yang nyaman, inspiratif, dan menyenangkan bagi semua kalangan.'
            ].map((item, index) => (
              <li
                key={index}
                ref={(el) => (misiItemsRef.current[index] = el)}
                className="transition-transform duration-300 hover:translate-x-2 hover:text-blue-600 dark:hover:text-purple-400"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

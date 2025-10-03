'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugin
gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Kata-kata yang ditampilkan bergantian
    const words = [
      'Selamat Datang',
      'Perpustakaan Digital',
      'Tempat Ilmu Bertemu',
      'Alvin Ganteng and thats facts'
    ];

    // Timeline utama
    const tl = gsap.timeline({});

    // Step 1: animasi judul
    tl.fromTo(
      '.hero-title',
      { opacity: 0, y: 80, scale: 0.2 },
      { opacity: 1, y: 0, scale: 1.5, duration: 1.5, ease: 'power4.out' }
    );

    // Step 2: animasi garis (setelah judul)
    tl.fromTo(
      '.hero-line',
      { width: 0 },
      { width: '100%', duration: 2, ease: 'power3.Out' },
      '+=0.2'
    );

    // Step 3: paragraf "your ..." fade in
    tl.fromTo(
      '.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
      '+=0.3'
    );

    // Timeline teks berjalan
    // Timeline teks berjalan
    const textTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    words.forEach((word) => {
      textTl
        // Ketik masuk
        .to(textRef.current, {
          text: { value: word },
          duration: word.length * 0.1,
          ease: 'none',
          opacity: 1
        })
        // Jeda sebentar
        .to({}, { duration: 1 })
        // Fade out (tanpa hapus huruf satu-satu)
        .to(textRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (textRef.current) textRef.current.textContent = '';
          }
        });
    });

    // Step 4: masukkan animasi teks setelah paragraf muncul
    tl.add(textTl, '+=0.2');

    return () => {
      tl.kill();
      textTl.kill();
    };
  }, []);

  return (
    <section className="mt-20 flex min-h-[500px] w-full flex-col items-center justify-between px-4 md:mt-[230px] md:flex-row md:items-start md:px-8">
      {/* Kiri */}
      <div className="flex w-full flex-col text-center md:ml-20 md:w-1/2 md:text-left">
        <h1 className="hero-title mb-2 mt-10 text-3xl font-light text-foreground md:ml-36 md:text-7xl">
          Perpusku
        </h1>
        <div
          className="hero-line mb-1 mt-5 h-1 bg-black dark:bg-white"
          style={{ width: 0 }}
        />
        <p className="hero-sub opacity-1 text-lg text-foreground md:ml-20 md:text-2xl">
          your <span ref={textRef} className="font-semibold"></span>
          <span className="blinking-cursor">|</span>
        </p>
      </div>

      {/* Kanan */}
      <div className="mt-6 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end md:pr-6">
        <div className="rounded-lg bg-white p-2 transition-colors duration-700 dark:bg-black">
          <div className="bg-white p-2 transition-colors duration-700 dark:bg-gray-800">
            <div className="bg-white p-4 transition-colors duration-700">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-40 rounded-xl shadow-lg md:w-60"
              >
                <source src="/literatureVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

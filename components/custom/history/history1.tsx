'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HistoryRight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.history-right-image', {
        opacity: 0,
        x: 150,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.history-right-image',
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });

      gsap.from('.history-right-text', {
        opacity: 0,
        x: -150,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.history-right-text',
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
      className="flex min-h-[640px] w-screen items-center justify-center px-8"
    >
      <div className="grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Text */}
        <div className="history-right-text order-2 pr-6 md:order-1">
          <h2 className="mb-4 text-3xl font-bold ">
            Janji Seorang Anak Miskin
          </h2>
          <p className="leading-relaxed ">
            Arga kecil hanya bisa membaca di sekolah tetangga. Saat sekolah itu
            terbakar, ia kehilangan “dunia”-nya. Di tengah tangisnya, ia
            berjanji: “Kelak aku akan membangun tempat membaca untuk semua
            orang.”
          </p>
        </div>
        {/* Foto */}
        <div className="history-right-image order-1 md:order-2">
          <Image
            src="/sejarahPerpusku(1)(1).png"
            alt="Perpusku"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

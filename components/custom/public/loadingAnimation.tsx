'use client';
import { useState, useEffect, useRef } from 'react';

interface LoadingProps {
    isVisible: boolean;
    onComplete?: () => void;
}

export const LoadingScreen = ({ isVisible, onComplete }: LoadingProps) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Menginisialisasi sistem...");

    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);
    const statusTextRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const backgroundRef = useRef<HTMLDivElement>(null);

    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const progressAnimationRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isVisible) return;

        // Clear any existing animations
        if (animationRef.current) clearTimeout(animationRef.current);
        if (progressAnimationRef.current) clearTimeout(progressAnimationRef.current);

        initAnimations();
        startProgressAnimation();

        // Cleanup function
        return () => {
            if (animationRef.current) clearTimeout(animationRef.current);
            if (progressAnimationRef.current) clearTimeout(progressAnimationRef.current);
        };
    }, [isVisible]);

    const initAnimations = () => {
        // Set initial states with CSS animations instead of GSAP
        const elements = [logoRef.current, titleRef.current, subtitleRef.current, progressBarRef.current, statusTextRef.current, dotsRef.current];

        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                // Staggered animation
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });

        // Animate letters individually
        letterRefs.current.forEach((letter, index) => {
            if (letter) {
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(100px) rotate(15deg) scale(0.3)';
                letter.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0) rotate(0deg) scale(1)';

                    // Add bounce effect
                    setTimeout(() => {
                        letter.style.transform = 'translateY(-10px) rotate(0deg) scale(1)';
                        setTimeout(() => {
                            letter.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                        }, 150);
                    }, 300);
                }, 800 + index * 150);
            }
        });

        // Container fade in
        if (containerRef.current) {
            containerRef.current.style.opacity = '0';
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.style.opacity = '1';
                    containerRef.current.style.transition = 'opacity 0.6s ease-out';
                }
            }, 100);
        }

        // Start continuous animations
        startContinuousAnimations();
    };

    const startContinuousAnimations = () => {
        // Logo floating animation
        let logoDirection = 1;
        const animateLogo = () => {
            if (logoRef.current && isVisible) {
                logoRef.current.style.transform = `translateY(${logoDirection * -5}px)`;
                logoDirection *= -1;
                animationRef.current = setTimeout(animateLogo, 2000);
            }
        };
        animateLogo();

        // Dots pulsing animation
        const animateDots = () => {
            const dots = dotsRef.current?.children;
            if (dots && isVisible) {
                Array.from(dots).forEach((dot, index) => {
                    const element = dot as HTMLElement;
                    setTimeout(() => {
                        element.style.transform = 'scale(1.5)';
                        element.style.opacity = '0.3';
                        element.style.transition = 'all 0.4s ease-in-out';

                        setTimeout(() => {
                            element.style.transform = 'scale(1)';
                            element.style.opacity = '1';
                        }, 400);
                    }, index * 200);
                });

                setTimeout(animateDots, 1600);
            }
        };
        setTimeout(animateDots, 1000);
    };

    const startProgressAnimation = () => {
        let currentProgress = 0;
        const targetProgress = 100;
        const duration = 4500; // 4.5 seconds
        const steps = 60; // 60 FPS
        const increment = targetProgress / (duration / (1000 / steps));

        const animate = () => {
            if (currentProgress < targetProgress && isVisible) {
                currentProgress += increment;
                const progress = Math.min(Math.floor(currentProgress), 100);

                setProgress(progress);

                // Update status text based on progress
                if (progress < 25) {
                    setStatusText("Menginisialisasi sistem...");
                } else if (progress < 50) {
                    setStatusText("Memuat data buku...");
                } else if (progress < 75) {
                    setStatusText("Menyiapkan dashboard...");
                } else if (progress < 95) {
                    setStatusText("Finalisasi...");
                } else {
                    setStatusText("Hampir selesai...");
                }

                // Update progress bar
                if (progressFillRef.current) {
                    progressFillRef.current.style.width = `${progress}%`;
                    progressFillRef.current.style.transition = 'width 0.2s ease-out';
                }

                // Progress text bounce effect on milestones
                if (progress % 25 === 0 && progress > 0 && progressTextRef.current) {
                    progressTextRef.current.style.transform = 'scale(1.2)';
                    progressTextRef.current.style.transition = 'transform 0.2s ease-in-out';
                    setTimeout(() => {
                        if (progressTextRef.current) {
                            progressTextRef.current.style.transform = 'scale(1)';
                        }
                    }, 200);
                }

                progressAnimationRef.current = setTimeout(animate, 1000 / steps);
            } else if (currentProgress >= targetProgress) {
                startExitAnimation();
            }
        };

        animate();
    };

    const startExitAnimation = () => {
        setTimeout(() => {
            [...letterRefs.current].reverse().forEach((letter, index) => {
                if (letter) {
                    setTimeout(() => {
                        letter.style.opacity = '0';
                        letter.style.transform = 'translateY(-100px) rotate(-15deg) scale(0.3)';
                        letter.style.transition = 'all 0.6s cubic-bezier(0.6, 0.04, 0.98, 0.335)';
                    }, index * 100);
                }
            });

            setTimeout(() => {
                const elements = [logoRef.current, subtitleRef.current, progressBarRef.current, statusTextRef.current, dotsRef.current];
                elements.forEach((el, index) => {
                    if (el) {
                        setTimeout(() => {
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(50px)';
                            el.style.transition = 'all 0.5s ease-in';
                        }, index * 100);
                    }
                });

                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.opacity = '0';
                        containerRef.current.style.transform = 'scale(0.8)';
                        containerRef.current.style.transition = 'all 0.8s ease-in';

                        setTimeout(() => {
                            onComplete?.();
                        }, 800);
                    }
                }, 500);
            }, 400);
        }, 500);
    };

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] bg-gray-50 flex flex-col items-center justify-center">
            <div ref={backgroundRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-6 h-6 border-2 border-black animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-20 right-20 w-8 h-8 border-2 border-black transform rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
                <div className="absolute bottom-32 left-16 w-4 h-4 bg-black animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-7 h-7 border-2 border-black animate-spin" style={{ animationDuration: '30s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-black rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-5 h-5 border border-black transform rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
                <div className="absolute top-3/4 left-1/3 w-4 h-4 border-2 border-black animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-black animate-pulse"></div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-12 relative z-10">

                <div ref={logoRef} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-8 bg-black border-4 border-black flex items-center justify-center shadow-lg">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                        </svg>
                    </div>
                </div>

                <div ref={titleRef} className="text-center">
                    <h1 className="text-7xl md:text-9xl font-bold text-black leading-tight tracking-tight mb-6">
                        {['P', 'E', 'R', 'P', 'U', 'S', 'K', 'U'].map((letter, index) => (
                            <span
                                key={index}
                                ref={el => letterRefs.current[index] = el}
                                className="inline-block"
                                style={{ transformOrigin: 'center bottom' }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>

                    <div ref={subtitleRef} className="bg-black text-white px-10 py-5 text-base font-bold tracking-wider shadow-lg">
                        SISTEM PERPUSTAKAAN DIGITAL
                    </div>
                </div>

                <div ref={progressBarRef} className="w-full max-w-lg space-y-8">
                    <div className="relative">
                        <div className="w-full h-4 bg-white border-2 border-black shadow-inner">
                            <div
                                ref={progressFillRef}
                                className="h-full bg-black transition-all duration-300 ease-out"
                                style={{ width: '0%' }}
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white mix-blend-difference">
                                {progress}%
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div ref={statusTextRef} className="text-gray-700 font-medium tracking-wide">
                            {statusText}
                        </div>
                        <div ref={progressTextRef} className="text-3xl font-bold text-black tabular-nums">
                            {progress}%
                        </div>
                    </div>

                    <div ref={dotsRef} className="flex justify-center space-x-3">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(true);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return { isLoading, startLoading, stopLoading };
};

export default function LoadingExample() {
    const { isLoading, stopLoading } = useLoading();

    return (
        <div className="min-h-screen bg-gray-100">
            <LoadingScreen
                isVisible={isLoading}
                onComplete={stopLoading}
            />

            {!isLoading && (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-black mb-4">
                            PERPUSKU
                        </h1>
                        <div className="bg-black text-white px-8 py-4 text-sm font-medium tracking-wider inline-block mb-8">
                            SISTEM PERPUSTAKAAN DIGITAL
                        </div>
                        <p className="text-lg text-gray-600">
                            Selamat datang! Loading berhasil diselesaikan.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
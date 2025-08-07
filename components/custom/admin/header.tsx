'use client';
import Link from 'next/link';
import { useState } from 'react';

export type D_HeaderProps = {
    items?: Array<{
        link?: string;
        label?: string;
    }>;
};

export const D_Header = ({ items = [] }: D_HeaderProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/50 fixed top-0 w-full z-50">
                <div className="mx-auto px-6 md:px-8">
                    <div className="flex justify-between items-center h-20 md:h-24">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">
                                PERPUSKU
                            </h1>
                        </div>

                        <nav className="hidden md:flex items-center gap-12">
                            {items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link || ''}
                                    className="text-neutral-600 hover:text-neutral-900 font-normal text-base tracking-wide transition-colors duration-300 relative group"
                                >
                                    {item.label}
                                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-900 group-hover:w-full transition-all duration-300"></div>
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden w-12 h-12 flex items-center justify-center transition-all duration-300 relative z-60"
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-5 h-5">
                                <span
                                    className={`absolute top-1/2 left-1/2 w-5 h-px bg-neutral-900 transition-all duration-300 ${menuOpen ? 'rotate-45 -translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2 -translate-y-2'
                                        }`}
                                ></span>
                                <span
                                    className={`absolute top-1/2 left-1/2 w-5 h-px bg-neutral-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2'
                                        }`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${menuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                ></div>

                <div
                    className={`absolute top-0 right-0 h-full w-full bg-white shadow-2xl transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${menuOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        <div className="h-24 flex items-center justify-end px-6">
                            <div className="w-12 h-12"></div>
                        </div>

                        <nav className="flex-1 px-8 py-8">
                            <div className="space-y-2">
                                {items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.link || ''}
                                        className={`group block py-6 text-2xl font-light text-neutral-700 hover:text-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] border-b border-neutral-100 last:border-b-0 transform ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                            }`}
                                        style={{
                                            transitionDelay: menuOpen ? `${index * 100 + 200}ms` : '0ms',
                                        }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="transform group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                {item.label}
                                            </span>
                                            <span className="text-sm text-neutral-400 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                →
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        <div
                            className={`px-8 pb-8 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`}
                            style={{
                                transitionDelay: menuOpen ? '600ms' : '0ms',
                            }}
                        >
                            <div className="text-xs text-neutral-400 tracking-wider uppercase">
                                Menu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
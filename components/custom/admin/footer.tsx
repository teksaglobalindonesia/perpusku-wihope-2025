'use client';
import Link from 'next/link';

export const D_Footer = () => {
    return (
        <footer className="w-full bg-black">
            <div className="md:px-24 px-5 py-20">
                {/* Main Content */}
                <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="md:flex-1">
                        <h2 className="text-5xl font-light tracking-tight text-white mb-8">
                            PERPUSKU
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed max-w-lg">
                            Masih banyak ilmu yang menantimu! Jangan biarkan rasa penasaranmu menguap begitu saja. Jelajahi koleksi buku kami, temukan inspirasi baru, dan tumbuhkan semangat literasimu setiap hari bersama Perpusku — perpustakaan digital yang selalu buka untukmu.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:w-1/4">
                        <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-8">
                            Navigation
                        </h3>
                        <nav className="space-y-4">
                            <Link href="/" className="block text-neutral-300 hover:text-white transition-colors duration-300">
                                Home
                            </Link>
                            <Link href="/about" className="block text-neutral-300 hover:text-white transition-colors duration-300">
                                About Us
                            </Link>
                            <Link href="/competition" className="block text-neutral-300 hover:text-white transition-colors duration-300">
                                Competition
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Social Links and Copyright */}
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between pt-8 border-t border-neutral-800">
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link
                            href="#"
                            target="_blank"
                            className="text-neutral-500 hover:text-white transition-colors duration-300"
                        >
                            <span className="text-sm font-medium">Instagram</span>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            className="text-neutral-500 hover:text-white transition-colors duration-300"
                        >
                            <span className="text-sm font-medium">YouTube</span>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            className="text-neutral-500 hover:text-white transition-colors duration-300"
                        >
                            <span className="text-sm font-medium">TikTok</span>
                        </Link>
                    </div>

                    <div className="text-sm text-neutral-500">
                        © 2025 THEPIXELWEBSMITH
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default D_Footer;

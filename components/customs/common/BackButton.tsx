'use client';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed left-0 top-0 mx-5 my-3 rounded-sm bg-brand-primary px-5 py-2 text-white"
    >
      Kembali
    </button>
  );
};

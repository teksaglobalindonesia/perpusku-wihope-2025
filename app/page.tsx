  'use client'

  import { LoadingScreen, useLoading } from "@/components/custom/public/loadingAnimation";
  import { useRouter } from "next/navigation";
  import { useEffect } from "react";

  export default function Page() {
    const { isLoading, stopLoading } = useLoading();
    const router = useRouter();
    useEffect(() => {
      if (!isLoading) {
        router.push('/dashboard');
      }
    }, [isLoading, router]);

    useEffect(() => {
      if (isLoading) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isLoading]);

    return (
      <div className="overflow-hidden">
        <LoadingScreen isVisible={isLoading} onComplete={stopLoading} />
          <div className="h-screen w-screen flex justify-center items-center">
            <p className="text-black font-semibold text-4xl">LOADING...</p>
          </div>
      </div>
    );
  }
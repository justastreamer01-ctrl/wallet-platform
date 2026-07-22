"use client";

import { useEffect, useState } from "react";

export default function CareersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center">

          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-white border-r-blue-500"></div>

            <div className="absolute inset-5 rounded-full bg-blue-500 blur-xl opacity-50"></div>
          </div>

          <p className="mt-10 animate-pulse text-lg tracking-[0.3em] text-white">
            LOADING
          </p>

        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-6">

      <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-2xl backdrop-blur-xl animate-[fadeIn_0.8s_ease]">

        <div className="mb-8 text-6xl">💼</div>

        <h1 className="mb-6 text-5xl font-bold text-white">
          No Vacancies
        </h1>

        <p className="text-lg leading-8 text-gray-300">
          Currently there are no vacancies available.
          <br />
          Please check back later.
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-10 rounded-full bg-white px-8 py-3 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white"
        >
          Go Back
        </button>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

    </main>
  );
}
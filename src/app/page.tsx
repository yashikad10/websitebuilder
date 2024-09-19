"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-600">
      <h1 className="text-center text-4xl text-white mb-8">
        Welcome to NovaTemp
      </h1>

      <Link href="/LandingPageView">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
          Go to Landing Page
        </button>
      </Link>
    </div>
  );
}

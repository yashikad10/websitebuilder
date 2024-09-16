import LandingPageView from "@/views/LandingPageView";
"use client";
import Editor from "@/components/editor";

export default function Home() {
  return (
    <div className="">
      <LandingPageView/>
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <h1 className="text-center text-4xl text-white">Welcome to NovaTemp</h1>

      {/* <Editor /> */}
    </div>
  );
}

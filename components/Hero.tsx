"use client"
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          NexFlow <br />
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Create your own WorkFlow with NexFlow built with NextJs and ReactFlow
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={() => router.push('/signin')} className="bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded">
            Login
          </Button>
          <Button onClick={() => router.push('/signup')} className="bg-black border hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}


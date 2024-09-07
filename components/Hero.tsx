
"use client";

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
        fill="currentColor"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center text-neutral-900 dark:text-neutral-100">
          NexFlow <br />
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-600 dark:text-neutral-300 max-w-lg text-center mx-auto">
          Create your own WorkFlow with NexFlow built with Next.js and ReactFlow
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Button
            onClick={() => router.push('/signin')}
            className="bg-white text-black hover:bg-gray-100 font-bold py-2 px-4 rounded"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push('/signup')}
            className="bg-black text-white hover:bg-gray-800 border font-bold py-2 px-4 rounded mt-4 md:mt-0"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}


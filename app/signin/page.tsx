
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isSignup: false,
    });

    if (res?.error) {
      toast({
        title: "Sign In Error",
        description: res.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sign In Success",
        description: "You've signed in successfully!",
      });
      router.push("/workflow");
    }
  };

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="bg-white dark:bg-black shadow-lg dark:shadow-gray-700 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white"
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Do not have an account?{" "}
          <a href="/signup" className="text-blue-500 dark:text-blue-400">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

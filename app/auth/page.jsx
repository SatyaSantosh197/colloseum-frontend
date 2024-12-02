"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const [isSignUp, setIsSignUp] = useState(false);
  const form = useForm();

  useEffect(() => {
    if (!role) {
      router.push("/");
    }
  }, [role, router]);

  const handleSubmit = async (data) => {
    const endpoint = `/auth/${role}/${isSignUp ? "signup" : "signin"}`;

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (res.ok) {
        if (role === "player") {
          // Redirect to player home page after successful sign-in/signup
          router.push("/player/home");
        } else {
          // You can handle other roles here if needed (e.g., for organisers)
          router.push(`/${role}/dashboard`);
        }
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.errorMessage}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!role) {
    return null;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-auto transform scale-150 object-cover"
        src="/videos/authBackground.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Content Overlay */}
      <div className="relative z-10 flex justify-center items-center h-screen bg-black bg-opacity-50">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-md">
          {/* Sign In or Sign Up Form */}
          <h2 className="text-center text-2xl font-bold mb-4">
            {isSignUp ? "Sign Up" : "Sign In"} as {role.charAt(0).toUpperCase() + role.slice(1)}
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("username", { required: "Username is required" })}
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Email Field (only for Sign Up) */}
              {isSignUp && (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...form.register("email", { required: "Email is required" })}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...form.register("password", { required: "Password is required" })}
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <Button type="submit" className="w-full">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Toggle Between Sign In and Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-500 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Back to Role Selection */}
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => router.push("/")}>
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

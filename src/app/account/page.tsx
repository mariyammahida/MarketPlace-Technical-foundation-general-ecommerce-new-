"use client";
import React, { useState } from "react";
import { useSignIn, useUser, SignOutButton } from "@clerk/nextjs";

const Account = () => {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser(); // Check if user is logged in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: email,
        password,
      });
      window.location.href = "/"; // Redirect after login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {isSignedIn ? (
        // If user is logged in, show Sign Out button
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">You are logged in.</p>
          <SignOutButton>
            <button className="mt-4 py-2 px-6 bg-red-500 text-white rounded-md text-lg hover:bg-red-600 transition">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      ) : (
        // If user is NOT logged in, show Sign In form
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold mb-6">Login to Your Account</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md text-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default Account;

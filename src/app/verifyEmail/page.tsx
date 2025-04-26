"use client";

import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebaseConfig";
import { useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProceed = async () => {
    setLoading(true);
    setError("");

    try {
      if (auth.currentUser) {
        await auth.currentUser.reload(); // reload the user
        if (auth.currentUser.emailVerified) {
          router.push("/onboarding");
        } else {
          setError("Please verify your email before proceeding.");
        }
      } else {
        setError("No user found. Please sign in again.");
        router.push("/login"); // optional, in case session expired
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Please verify your email</h1>
        <p>
          We've sent a verification link to your email. After verifying, click the following button to complete onboarding.
        </p>
        <button
          onClick={handleProceed}
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Checking..." : "Proceed to Onboarding"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

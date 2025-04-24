"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";

export default function RequireEmailVerified({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else if (!user.emailVerified) {
        alert("You must verify your email address before accessing this page.");
        router.push("/signup");
      } else {
        setChecking(false); // Verified, allow access
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checking) return <p className="text-center mt-10">Checking access...</p>;

  return <>{children}</>;
}

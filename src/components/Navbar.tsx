"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser && user) {
        setShowLogoutMessage(true);
        setTimeout(() => {
          setShowLogoutMessage(false);
        }, 3000); 
      }
    });

    return () => unsubscribe(); 
  }, [user]);

  return (
    <>
      <div className="w-full h-16 bg-blue-500 sticky top-0">
        <div className="container mx-auto px-4 h-full relative">
          <div className="flex justify-center items-center h-full">
            <ul className="hidden md:flex gap-x-12 text-white text-xl">
              <li>
                <Link href="/">
                  <p className="hover:text-blue-500 hover:bg-white transition-all py-1 px-1 rounded-sm">
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <p className="hover:text-blue-500 hover:bg-white transition-all py-1 px-1 rounded-sm">
                    Resources
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p className="hover:text-blue-500 hover:bg-white transition-all py-1 px-1 rounded-sm">
                    Home
                  </p>
                </Link>
              </li>
              
            </ul>

            <div className="absolute right-4 text-white">
              {user ? (
                <button
                  onClick={() => auth.signOut()}
                  className="hover:text-blue-500 hover:bg-white transition-all py-1 px-4 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="hover:text-blue-500 border border-white hover:bg-white transition-all py-1 px-4 rounded-full">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLogoutMessage && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">
          You have successfully logged out.
        </div>
      )}
    </>
  );
};

export default Navbar;
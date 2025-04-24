"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/hipe.png"

export default function Signup() {
  const router = useRouter();

  type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organization: string;
  };

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    organization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    // Validate form data
    const { email, password, firstName, lastName, organization } = formData;
    if (!email || !password || !firstName || !lastName || !organization) {
      alert("Please fill in all fields.");
    return;
    }
    //

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        organization: formData.organization,
        createdAt: new Date(),
        role: "",
      });

      await sendEmailVerification(user);

      alert("A verification link was sent to your email. Please check your inbox.");

      router.push("/onboarding");
    } catch (error) {
      console.error(error);
      alert("Signup failed. Error:" + error);
    }
  };

  // google sign up

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prompt for organization
      setTimeout(async () => {
        const organization = prompt("What organization are you from?");
        if (!organization) {
          alert("Organization is required to proceed.");
          return;
        }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        firstName: user.displayName?.split(" ")[0] || "",
        lastname: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        organization,
        createdAt: new Date(),
        role: "",
      }, { merge: true});
      router.push("/onboarding");
    }, 500);
    } catch (error) {
      console.error(error);
      alert("Signup failed. Error:" + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Create an account
        </h1>

        <div className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            type="email"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            type="password"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="organization"
            placeholder="Organization"
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSignup}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-all duration-300"
          >
            Sign up
          </button>

        <button
          onClick={handleGoogleSignup}
          className="mt-3 w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm"
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
          <span>Sign up with Google</span>
        </button>

        <Link href="/login">
          <button
          className="mt-5 w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-800 hover:text-white border border-blue-600transition-all duration-300"
          >
            Have an account? Sign in
          </button>
          </Link>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";
import Link from "next/link";
import logo from "../../../public/images/hipe.png"
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  type FormData = {
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Login failed. Error: " + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
          Log in to your account
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
        </div>

        <button
          onClick={handleLogin}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-all duration-300"
        >
          Log in
        </button>
        <Link href="/signup">
          <button
          className="mt-5 w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-800 hover:text-white border border-blue-600transition-all duration-300"
          >
            Create an account
          </button>
          </Link>
      </div>
    </div>
  );
}

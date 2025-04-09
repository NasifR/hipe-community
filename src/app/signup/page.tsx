"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
        organization: formData.organization,
        email: formData.email,
        createdAt: new Date(),
      });

      router.push("/onboarding");
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <h1>Create an account</h1>

        <div>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            name="organization"
            placeholder="Organization"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

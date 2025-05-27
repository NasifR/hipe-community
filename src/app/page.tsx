"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/images/hipe.png";
import heroImage from "../../public/images/hipe_int.png";
import Button from "../components/Button";
import globe from "../../public/images/hipe_globe.png";
import { motion } from "framer-motion";
import ProgramCard from "@/components/ProgramCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import emailjs from "@emailjs/browser";
import Link from "next/link";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

type Program = {
  id: string;
  title: string;
  country: string;
  city: string;
  url: string;
};

const Page = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  // form state
  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
    program: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      const querySnapshot = await getDocs(collection(db, "programs"));
      const fetchedPrograms: Program[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedPrograms.push({
          id: doc.id,
          title: data.name,
          country: data.country,
          city: data.city,
          url: data.url,
        });
      });

      setPrograms(fetchedPrograms.slice(0, 3)); // Show only top 3
    };

    fetchPrograms();
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) {
      alert("Name and Email are required.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_email: form.email,
          user_name: form.name,
          user_phone: form.phone,
          program: form.program,
          message: form.message,
        }
      );
      alert("Request sent!");
      setForm({ email: "", phone: "", name: "", program: "", message: "" });
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex flex-col ml-10 px-10 items-center md:items-start justify-center transform -translate-y-15"
        >
          <Image
            src={heroImage}
            alt="Hero Logo"
            width={200}
            height={200}
            className="mx-auto md:mx-0"
          />
          <h1 className="text-6xl font-extrabold mt-4">Welcome to HIPE International</h1>
          <p className="text-2xl mt-4 max-w-md">
            Your gateway to global education, experiences, and connections.
          </p>
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-xl">
              Join the Community
            </Button>
          </Link>
            <Link href="/">
            <Button variant="outline" className="px-6 py-3 rounded-xl border-blue-600">
              Learn More
            </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
        >
          <Image
            src={globe}
            alt="Globe"
            width={600}
            height={600}
          />
        </motion.div>
      </section>

      {/* Top Opportunities Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Top Opportunities</h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-12">
          Explore the best study abroad programs, scholarships, and exchange opportunities selected for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              title={program.title}
              country={program.country}
              city={program.city}
              url={program.url}
            />
          ))}
        </div>
      </motion.section>

      {/* Events */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="px-4 py-16 bg-gray-100 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          Join our events, info sessions, and live webinars to learn more about your future abroad.
        </p>
      </motion.section>

      {/* Book Advising + Request Info */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Connect with Us</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Button className="bg-blue-600 hover:bg-blue-800 hover:text-white px-6 py-3 rounded-xl">
            Book Advising Session
          </Button>
          <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-800 hover:text-white px-6 py-3 rounded-xl">
            Request Information
          </Button>
        </div>
      </motion.section>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Request Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Program you are inquiring about
                </label>
                <input
                  name="program"
                  type="text"
                  value={form.program}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Describe your request</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg"
              >
                {sending ? "Sending…" : "Send Request"}
              </button>
            </form>
          </div>
    </div>
  )};
    </div>
  );
}

export default Page;

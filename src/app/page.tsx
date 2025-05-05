"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/images/hipe.png";
import heroImage from "../../public/images/hipe_int.png";
import Button from "../components/Button";
import globe from "../../public/images/hipe_globe.png";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 bg-gray-50">
      {/* Left side (Text & Logo) */}
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
          <Button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-xl">
            Join the Community
          </Button>
          <Button variant="outline" className="px-6 py-3 rounded-xl border-blue-600">
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Right side (Globe Image) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
      >
        <Image
          src={require("../../public/images/hipe_globe.png")}
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
        <p className="max-w-2xl mx-auto text-gray-700">
          Explore the best study abroad programs, scholarships, and exchange opportunities selected for you.
        </p>
        {/* Cards or grid of featured opportunities here */}
      </motion.section>

      {/* Events*/}
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
        {/* List or cards for events */}
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
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl">
            Book Advising Session
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl">
            Request Information
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default page;

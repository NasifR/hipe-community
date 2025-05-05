"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ProgramCardProps = {
  title: string;
  country: string;
  sponsorCollege: string;
  url: string;
};

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  country,
  sponsorCollege,
  url,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
    >
      <Image
        src="/images/program.jpg"
        alt="Program"
        width={400}
        height={250}
        className="w-full h-60 object-cover"
      />

      <div className="p-6 space-y-3">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {sponsorCollege}
        </div>

        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{country}</p>

        <Link href={url} target="_blank">
          <button className="mt-4 inline-block bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-xl transition">
            Learn More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProgramCard;

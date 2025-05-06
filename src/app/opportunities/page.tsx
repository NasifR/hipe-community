"use client";

import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import ProgramCard from "@/components/ProgramCard";

type Program = {
  id: string;
  title: string;
  country: string;
  city: string;
  url?: string;
};

export default function OpportunitiesPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "country" | "city">("title");

  // Fetch all programs once on mount
  useEffect(() => {
    const fetchPrograms = async () => {
      const snap = await getDocs(collection(db, "programs"));
      const data: Program[] = [];
      snap.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          title: d.name,
          country: d.country,
          city: d.city,
          url: d.url,
        });
      });
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  // Filter + Sort
  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return programs
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.country.toLowerCase().includes(lower) ||
          p.city.toLowerCase().includes(lower)
      )
      .sort((a, b) => {
        const aKey = a[sortKey]!.toLowerCase();
        const bKey = b[sortKey]!.toLowerCase();
        return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
      });
  }, [programs, search, sortKey]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar / Filters */}
      <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Filter &amp; Sort</h2>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, Country, City…"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Sort By</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="title">Name</option>
            <option value="country">Country</option>
            <option value="city">City</option>
          </select>
        </div>
      </aside>

      {/* Programs Grid */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">All Opportunities</h1>
        {filtered.length === 0 ? (
          <p className="text-gray-600">No programs match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((program) => (
              <ProgramCard
                key={program.id}
                title={program.title}
                country={program.country}
                city={program.city}
                url={program.url || ""}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

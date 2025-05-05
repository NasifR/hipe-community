import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "../../../../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// This API route scrapes the CUNY Study Abroad page and returns JSON
export async function GET() {
  try {
    const url = "https://www1.cuny.edu/sites/global/students/programs/programs-search/";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const programs: {
      name: string;
      country: string;
      city: string;
      sponsor: string;
    }[] = [];

    $("table tbody tr").each((i, elem) => {
      const columns = $(elem).find("td");
      programs.push({
        name: $(columns[0]).text().trim(),
        country: $(columns[1]).text().trim(),
        city: $(columns[2]).text().trim(),
        sponsor: $(columns[3]).text().trim(),
      });
    });

    const storePrograms = async () => {
        const programsCollection = collection(db, "programs");
        for (const program of programs) {
          await addDoc(programsCollection, program);
        }
      };
  
    await storePrograms();

    return NextResponse.json({
      success: true,
      total: programs.length,
      programs,
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to scrape data." },
      { status: 500 }
    );
  }
}

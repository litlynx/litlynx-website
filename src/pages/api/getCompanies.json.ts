// src/pages/api/getResume.json.ts
import { getCollection } from "astro:content";

export async function GET() {
  const companiesEntries = await getCollection("companies");

  type Company = {
    name: string;
    summary: string;
    startDate: Date;
    endDate: Date;
    position: string;
    keywords?: string[];
  };

  const companies = {
    ...companiesEntries[0]?.data,
    totalCompanies: companiesEntries[0]?.data?.companies?.length || 0,
  };

  return new Response(JSON.stringify(companies), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

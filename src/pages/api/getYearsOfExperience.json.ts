// src/pages/api/getResume.json.ts
import { getCollection } from "astro:content";

const GRADUATION_YEAR = 2017;

export async function GET() {
  const companiesEntries = await getCollection("companies");

  const totalYearsOfExperience = companiesEntries.reduce((total, entry) => {
    if (!Array.isArray(entry.data.companies)) return total;
    const entryExperience = entry.data.companies.reduce((companyTotal, company) => {
      const startDate = new Date(company.startDate);
      const endDate = company.endDate ? new Date(company.endDate) : new Date();
      const experience = endDate.getFullYear() - startDate.getFullYear();
      return companyTotal + experience;
    }, 0);
    return total + entryExperience;
  }, 0);

  const enterpriseYearsOfExperience = companiesEntries.reduce((total, entry) => {
    if (!Array.isArray(entry.data.companies)) return total;
    const enterpriseExperience = entry.data.companies.reduce((companyTotal, company) => {
      const startDate = new Date(company.startDate);
      if (startDate.getFullYear() >= GRADUATION_YEAR) {
        const endDate = company.endDate ? new Date(company.endDate) : new Date();
        const experience = endDate.getFullYear() - startDate.getFullYear();
        return companyTotal + experience;
      }
      return companyTotal;
    }, 0);
    return total + enterpriseExperience;
  }, 0);

  return new Response(JSON.stringify({ totalYearsOfExperience, enterpriseYearsOfExperience }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

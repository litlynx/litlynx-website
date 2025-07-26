// src/pages/api/getResume.json.ts
import { getCollection } from "astro:content";

export async function GET() {
  const resumeEntries = await getCollection("resume");
  const companiesEntries = await getCollection("companies");
  const skillsEntries = await getCollection("skills");
  const educationEntries = await getCollection("education");
  const languagesEntries = await getCollection("languages");

  // Build a response object based on the slug
  const resume = {
    ...resumeEntries[0]?.data,
    ...companiesEntries[0]?.data,
    ...skillsEntries[0]?.data,
    ...educationEntries[0]?.data,
    ...languagesEntries[0]?.data,
  };

  return new Response(JSON.stringify(resume), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

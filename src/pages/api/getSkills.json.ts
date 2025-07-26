// src/pages/api/getResume.json.ts
import { getCollection } from "astro:content";

export async function GET() {
  const skillsEntries = await getCollection("skills");

  // Build a response object based on the slug
  const skills = {
    skills: skillsEntries[0]?.data.skills || [],
    totalFrontedSkills: skillsEntries[0]?.data.skills.filter((skill) => skill.type === "front-end").length || 0,
    totalBackendSkills: skillsEntries[0]?.data.skills.filter((skill) => skill.type === "back-end").length || 0,
    totalFSSkills: skillsEntries[0]?.data.skills.filter((skill) => skill.type === "fullstack").length || 0,
    totalDesignSkills: skillsEntries[0]?.data.skills.filter((skill) => skill.type === "design").length || 0,
    totalSkills: skillsEntries[0]?.data.skills.length || 0,
    keywords: skillsEntries[0]?.data.skills.flatMap((skill) => skill.keywords || []),
  };
  return new Response(JSON.stringify(skills), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

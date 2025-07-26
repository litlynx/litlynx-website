import { defineCollection, z } from "astro:content";

// Resume schema (for main resume.yaml)
const resumeCollection = defineCollection({
  type: "data",
  schema: z.object({
    basics: z.object({
      name: z.string(),
      label: z.string(),
      picture: z.string().url(),
      email: z.string().email(),
      website: z.string().url(),
      summary: z.string(),
      location: z.object({
        address: z.string(),
        postalCode: z.string(),
        city: z.string(),
        countryCode: z.string(),
        region: z.string(),
      }),
      profiles: z.array(
        z.object({
          network: z.string(),
          username: z.string(),
          url: z.string().url(),
        })
      ),
    }),
  }),
});

// Companies schema (for companies.yaml)
const companiesCollection = defineCollection({
  type: "data",
  schema: z.object({
    companies: z.array(
      z.object({
        name: z.string(),
        position: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        summary: z.string(),
      })
    ),
  }),
});

// Skills schema (for skills.yaml)
const skillsCollection = defineCollection({
  type: "data",
  schema: z.object({
    skills: z.array(
      z.object({
        name: z.string(),
        level: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        type: z.string().optional(), // Optional type field for skill categorization
      })
    ),
  }),
});

// Education schema (for education.yaml)
const educationCollection = defineCollection({
  type: "data",
  schema: z.object({
    education: z.array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
      })
    ),
  }),
});

const languagesCollection = defineCollection({
  type: "data",
  schema: z.object({
    languages: z.array(
      z.object({
        language: z.string(),
        fluency: z.string(),
      })
    ),
  }),
});

export const collections = {
  resume: resumeCollection,
  skills: skillsCollection,
  education: educationCollection,
  languages: languagesCollection,
  companies: companiesCollection,
};

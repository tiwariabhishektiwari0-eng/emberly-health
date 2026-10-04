import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    tagline: z.string(),
    order: z.number(),
    description: z.string(),
    icon: z.string(),
    highlights: z.array(z.string()),
    includedFeatures: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    processSteps: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string()
    })),
    kpis: z.array(z.object({
      label: z.string(),
      benchmark: z.string(),
      description: z.string()
    })),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    }))
  })
});

const specialtiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortName: z.string(),
    order: z.number(),
    summary: z.string(),
    icon: z.string(),
    codingNuances: z.array(z.string()),
    commonDenialsAvoided: z.array(z.string()),
    workflowBenefits: z.array(z.string()),
    sampleBenchmark: z.string()
  })
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    authorRole: z.string(),
    readTime: z.string(),
    category: z.string(),
    tags: z.array(z.string())
  })
});

const rolesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.string(),
    experience: z.string(),
    summary: z.string(),
    responsibilities: z.array(z.string()),
    requirements: z.array(z.string())
  })
});

export const collections = {
  services: servicesCollection,
  specialties: specialtiesCollection,
  resources: resourcesCollection,
  roles: rolesCollection
};

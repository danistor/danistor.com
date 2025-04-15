import { type LocaleKey } from "@/components/i18n-provider";

// Base type for data stored with translation keys
export interface ProjectDataType {
  id: string;
  titleKey: string;
  categoryKey: string;
  tags: string[];
  image: string; // Placeholder path, update with actual paths
  descriptionKey: string;
  challengeKey: string;
  solutionKey: string;
  resultsKeys: string[];
  liveUrl: string;
}

// Type for the project data after translation
export interface ProjectType {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  liveUrl: string;
}


export const projectsData: ProjectDataType[] = [
  {
    id: "ubs-banking",
    titleKey: "portfolio.ubs.title",
    categoryKey: "portfolio.ubs.category",
    tags: ["React", "Node.js", "AWS", "Fintech"],
    image: "/images/project-ubs-placeholder.jpg", // Update with real path
    descriptionKey: "portfolio.ubs.description",
    challengeKey: "portfolio.ubs.challenge",
    solutionKey: "portfolio.ubs.solution",
    resultsKeys: [
      "portfolio.ubs.results.engagement",
      "portfolio.ubs.results.costs",
      "portfolio.ubs.results.performance",
    ],
    liveUrl: "#",
  },
  {
    id: "nestle-supply",
    titleKey: "portfolio.nestle.title",
    categoryKey: "portfolio.nestle.category",
    tags: ["Angular", "Python", "Docker", "AI"],
    image: "/images/project-nestle-placeholder.jpg", // Update with real path
    descriptionKey: "portfolio.nestle.description",
    challengeKey: "portfolio.nestle.challenge",
    solutionKey: "portfolio.nestle.solution",
    resultsKeys: [
      "portfolio.nestle.results.inventory",
      "portfolio.nestle.results.costs",
      "portfolio.nestle.results.efficiency",
    ],
    liveUrl: "#",
  },
  {
    id: "swatch-ecommerce",
    titleKey: "portfolio.swatch.title",
    categoryKey: "portfolio.swatch.category",
    tags: ["Next.js", "GraphQL", "Stripe", "Shopify"],
    image: "/images/project-swatch-placeholder.jpg", // Update with real path
    descriptionKey: "portfolio.swatch.description",
    challengeKey: "portfolio.swatch.challenge",
    solutionKey: "portfolio.swatch.solution",
    resultsKeys: [
      "portfolio.swatch.results.sales",
      "portfolio.swatch.results.conversion",
      "portfolio.swatch.results.global",
    ],
    liveUrl: "#",
  },
  {
    id: "zurich-tourism",
    titleKey: "portfolio.zurich.title",
    categoryKey: "portfolio.zurich.category",
    tags: ["React Native", "Firebase", "Google Maps API"],
    image: "/images/project-zurich-placeholder.jpg", // Update with real path
    descriptionKey: "portfolio.zurich.description",
    challengeKey: "portfolio.zurich.challenge",
    solutionKey: "portfolio.zurich.solution",
    resultsKeys: [
      "portfolio.zurich.results.downloads",
      "portfolio.zurich.results.engagement",
      "portfolio.zurich.results.ratings",
    ],
    liveUrl: "#",
  },
];

// Function to get translated project data
export const getTranslatedProjects = (t: (key: string) => string): ProjectType[] => {
  return projectsData.map((p: ProjectDataType): ProjectType => ({
    id: p.id,
    tags: p.tags,
    image: p.image,
    liveUrl: p.liveUrl,
    // Translated fields
    title: t(p.titleKey),
    category: t(p.categoryKey),
    description: t(p.descriptionKey),
    challenge: t(p.challengeKey),
    solution: t(p.solutionKey),
    results: p.resultsKeys.map(key => t(key)),
  }));
} 
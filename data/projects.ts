// Base type for data stored with translation keys
export interface ProjectDataType {
  id: string;
  titleKey: string;
  categoryKey: string;
  tags: string[];
  image: string;
  imageMobile: string;
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
  imageMobile: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  liveUrl: string;
}


export const projectsData: ProjectDataType[] = [
  {
    id: "bithy-ecommerce",
    titleKey: "portfolio.bithy.title",
    categoryKey: "portfolio.bithy.category",
    tags: ["Shopify", "React", "Remix", "Headless E-Commerce", "SEO", "Performance Optimization"],
    image: "/images/project-bithy-ecommerce.webp",
    imageMobile: "/images/project-bithy-ecommerce-mobile.webp",
    descriptionKey: "portfolio.bithy.description",
    challengeKey: "portfolio.bithy.challenge",
    solutionKey: "portfolio.bithy.solution",
    resultsKeys: [
      "portfolio.bithy.results.performance",
      "portfolio.bithy.results.conversion",
      "portfolio.bithy.results.mobile",
      "portfolio.bithy.results.engagement",
    ],
    liveUrl: "https://bithy.ch",
  },
  {
    id: "nahrin-cms",
    titleKey: "portfolio.nahrin.title",
    categoryKey: "portfolio.nahrin.category",
    tags: ["Headless CMS", "Prismic", "API", "Adobe Commerce", "Content Management System"],
    image: "/images/project-nahrin-cms.webp",
    imageMobile: "/images/project-nahrin-cms-mobile.webp",
    descriptionKey: "portfolio.nahrin.description",
    challengeKey: "portfolio.nahrin.challenge",
    solutionKey: "portfolio.nahrin.solution",
    resultsKeys: [
      "portfolio.nahrin.results.content",
      "portfolio.nahrin.results.engagement",
      "portfolio.nahrin.results.conversion",
      "portfolio.nahrin.results.retention",
    ],
    liveUrl: "https://nahrin.ch",
  },
  {
    id: "crosare-website",
    titleKey: "portfolio.crosare.title",
    categoryKey: "portfolio.crosare.category",
    tags: ["PHP", "Wordpress", "Responsive Design", "Front and Backend Development", "SEO"],
    image: "/images/project-crosare-website.webp",
    imageMobile: "/images/project-crosare-website-mobile.webp",
    descriptionKey: "portfolio.crosare.description",
    challengeKey: "portfolio.crosare.challenge",
    solutionKey: "portfolio.crosare.solution",
    resultsKeys: [
      "portfolio.crosare.results.sales",
      "portfolio.crosare.results.efficiency",
      "portfolio.crosare.results.events",
    ],
    liveUrl: "https://ristorantecrosare.it",
  },
  {
    id: "qualipet-website",
    titleKey: "portfolio.qualipet.title",
    categoryKey: "portfolio.qualipet.category",
    tags: ["AI", "Recommendation Engine", "Adobe Commerce", "Rest API"],
    image: "/images/project-qualipet-website.webp",
    imageMobile: "/images/project-qualipet-website-mobile.webp",
    descriptionKey: "portfolio.qualipet.description",
    challengeKey: "portfolio.qualipet.challenge",
    solutionKey: "portfolio.qualipet.solution",
    resultsKeys: [
      "portfolio.qualipet.results.sales",
      "portfolio.qualipet.results.conversion",
      "portfolio.qualipet.results.satisfaction",
    ],
    liveUrl: "https://www.qualipet.ch/",
  }
];

// Function to get translated project data
export const getTranslatedProjects = (t: (key: string) => string): ProjectType[] => {
  return projectsData.map((p: ProjectDataType): ProjectType => ({
    id: p.id,
    tags: p.tags,
    image: p.image,
    imageMobile: p.imageMobile,
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
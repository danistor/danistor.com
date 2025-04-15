import type { LocaleKey } from "@/components/i18n-provider";
import type { Metadata } from 'next';
import { ProjectsPageContent } from "@/components/projects/projects-page-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleKey }> }): Promise<Metadata> {
  // Resolve params Promise in Next.js 15.3
  const resolvedParams = await params;

  return {
    title: 'Projects | Dan Nistor - Full-Stack Developer & Designer',
    description: 'Explore my portfolio of web and mobile development projects.',
    openGraph: {
      title: 'Projects | Dan Nistor - Full-Stack Developer & Designer',
      description: 'Explore my portfolio of web and mobile development projects.',
      url: `https://danistor.com/${resolvedParams.locale}/projects`,
      images: [
        {
          url: `/api/og?locale=${resolvedParams.locale}&page=projects`,
          width: 1200,
          height: 630,
          alt: 'Dan Nistor - Projects',
        }
      ],
    },
  };
}

export default async function ProjectsPage(props: {
  params: Promise<{ locale: LocaleKey }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Need to await both params and searchParams in Next.js 15.3
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Handle search params
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : '';

  return <ProjectsPageContent query={query} tag={tag} />;
} 
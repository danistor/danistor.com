'use client'

import { Suspense } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsFilters } from "@/components/projects/projects-filters";
import { SearchInput } from "@/components/ui/search-input";

interface ProjectsPageContentProps {
  query: string;
  tag: string;
}

export function ProjectsPageContent({ query, tag }: ProjectsPageContentProps) {
  return (
    <MainLayout>
      <div className="container px-4 mx-auto pt-24 pb-32">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          My Projects
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-muted-foreground mb-8">
            Browse through my selected works spanning web applications, mobile apps,
            and design systems. Each project showcases my approach to solving complex
            problems with clean, user-focused solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <SearchInput
              placeholder="Search projects..."
              className="flex-1"
              defaultValue={query}
            />
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-md" />}>
              <ProjectsFilters selectedTag={tag} />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[16/12] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        }>
          <ProjectsGrid query={query} tag={tag} />
        </Suspense>
      </div>
    </MainLayout>
  );
} 
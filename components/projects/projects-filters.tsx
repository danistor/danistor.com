'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { projectsData } from '@/data/projects'

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
).sort()

interface ProjectsFiltersProps {
  selectedTag?: string
}

export function ProjectsFilters({ selectedTag }: ProjectsFiltersProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentTag = selectedTag || ''

  const handleTagSelect = React.useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (tag && tag !== 'all') {
        params.set('tag', tag)
      } else {
        params.delete('tag')
      }

      router.push(`${pathname}?${params.toString()}`)
      setOpen(false)
    },
    [pathname, router, searchParams]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between"
        >
          {currentTag ? currentTag : "Filter by tag"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => handleTagSelect('all')}
              className="cursor-pointer"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !currentTag ? "opacity-100" : "opacity-0"
                )}
              />
              All Tags
            </CommandItem>
            {allTags.map((tag) => (
              <CommandItem
                key={tag}
                onSelect={() => handleTagSelect(tag)}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentTag === tag ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 
'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export function SearchInput({
  placeholder = 'Search...',
  className,
  defaultValue,
  ...props
}: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = React.useState(defaultValue?.toString() || '')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onSearch = React.useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (term) {
        params.set('query', term)
      } else {
        params.delete('query')
      }

      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`pl-10 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
} 
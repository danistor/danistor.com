'use client'

import { Button } from '@/components/ui/button'
import { useSonnerToast } from '@/hooks/use-sonner-toast'

export function TestSonner() {
  const { toast } = useSonnerToast()

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button
        onClick={() => {
          toast({
            title: 'Default Toast',
            description: 'This is a default toast notification',
          })
        }}
      >
        Show Default Toast
      </Button>

      <Button
        onClick={() => {
          toast({
            title: 'Success Toast',
            description: 'This is a success toast notification',
            type: 'success',
          })
        }}
      >
        Show Success Toast
      </Button>

      <Button
        onClick={() => {
          toast({
            title: 'Error Toast',
            description: 'This is an error toast notification',
            type: 'error',
          })
        }}
      >
        Show Error Toast
      </Button>

      <Button
        onClick={() => {
          toast({
            title: 'Warning Toast',
            description: 'This is a warning toast notification',
            type: 'warning',
          })
        }}
      >
        Show Warning Toast
      </Button>

      <Button
        onClick={() => {
          toast({
            title: 'Toast with Action',
            description: 'This toast has an action button',
            action: {
              label: 'Undo',
              onClick: () => {},
            },
          })
        }}
      >
        Show Toast with Action
      </Button>
    </div>
  )
}

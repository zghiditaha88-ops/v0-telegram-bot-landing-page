'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function DeleteWatchButton({ watchId }: { watchId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const response = await fetch(`/api/watches/${watchId}`, {
        method: 'DELETE',
        headers: {
          // TODO: Replace with real authentication
          'x-mock-user-id': 'mock-user-id',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete watch')
      }

      router.refresh()
    } catch (error) {
      console.error('Error deleting watch:', error)
      alert('Failed to delete watch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      size="sm"
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  )
}


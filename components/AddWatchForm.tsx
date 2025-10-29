'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AddWatchForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slot, setSlot] = useState<string>('all')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      venueSlug: formData.get('venueSlug') as string,
      partySize: parseInt(formData.get('partySize') as string, 10),
      startDate: (formData.get('startDate') as string) + 'T00:00:00Z',
      endDate: (formData.get('endDate') as string) + 'T23:59:59Z',
      slot: slot,
    }

    try {
      const response = await fetch('/api/watches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Replace with real authentication
          'x-mock-user-id': 'mock-user-id',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create watch')
      }

      // Reset form
      e.currentTarget.reset()
      setSlot('all')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="venueSlug">Venue Slug</Label>
        <Input
          id="venueSlug"
          name="venueSlug"
          placeholder="e.g., carbone-london"
          required
        />
      </div>

      <div>
        <Label htmlFor="partySize">Party Size</Label>
        <Input
          id="partySize"
          name="partySize"
          type="number"
          min="1"
          defaultValue="2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="slot">Time Slot</Label>
        <Select value={slot} onValueChange={setSlot} required>
          <SelectTrigger id="slot">
            <SelectValue placeholder="Select time slot" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
            <SelectItem value="all">All Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Watch'}
      </Button>
    </form>
  )
}


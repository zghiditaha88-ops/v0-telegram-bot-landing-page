import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddWatchForm } from '@/components/AddWatchForm'
import { DeleteWatchButton } from '@/components/DeleteWatchButton'

// Force dynamic rendering (SSR) - required for Prisma database queries
export const dynamic = 'force-dynamic'

// TODO: Replace with real authentication (Telegram or email magic link)
function getMockUserId(): string {
  // In a real implementation, read from cookies or headers
  return 'mock-user-id'
}

export default async function DashboardPage() {
  const userId = getMockUserId()

  // TODO: Replace with real authentication
  // Get or create user for mock auth
  let user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    user = await prisma.user.create({
      data: { id: userId },
    })
  }

  const watches = await prisma.watch.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  const drops = await prisma.drop.findMany({
    take: 20,
    orderBy: { detectedAt: 'desc' },
  })

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Watches Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Watches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddWatchForm />
            <div className="mt-6 space-y-3">
              {watches.length === 0 ? (
                <p className="text-sm text-muted-foreground">No watches yet. Add one above.</p>
              ) : (
                watches.map((watch) => (
                  <div
                    key={watch.id}
                    className="p-4 border rounded-lg flex justify-between items-start"
                  >
                    <div>
                      <div className="font-medium">{watch.venueSlug}</div>
                      <div className="text-sm text-muted-foreground">
                        Party: {watch.partySize} | Slot: {watch.slot}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(watch.startDate).toLocaleDateString()} -{' '}
                        {new Date(watch.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <DeleteWatchButton watchId={watch.id} />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Drops Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Drops</CardTitle>
          </CardHeader>
          <CardContent>
            {drops.length === 0 ? (
              <p className="text-sm text-muted-foreground">No drops detected yet.</p>
            ) : (
              <div className="space-y-3">
                {drops.map((drop) => (
                  <div
                    key={drop.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="font-medium">{drop.venueSlug}</div>
                    <div className="text-sm text-muted-foreground">
                      Party: {drop.partySize} | Date: {new Date(drop.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Times: {Array.isArray(drop.times) ? drop.times.length : 0} slot(s) |{' '}
                      Detected: {new Date(drop.detectedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


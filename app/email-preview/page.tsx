import { getWelcomeEmailHTML } from "../actions"

export default async function EmailPreview() {
  const emailHTML = await getWelcomeEmailHTML("example@email.com")

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h1 className="text-2xl font-bold mb-2">Email Preview</h1>
          <p className="text-muted-foreground">This is what users will receive when they join your waitlist.</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-muted px-6 py-3 border-b">
            <p className="text-sm font-medium">Subject: Welcome to Seats - You're on the list!</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: emailHTML }} />
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            To view this preview, visit: <code className="bg-muted px-2 py-1 rounded text-xs">/email-preview</code>
          </p>
        </div>
      </div>
    </div>
  )
}

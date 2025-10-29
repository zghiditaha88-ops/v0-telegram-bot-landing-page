import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Seats - Never Miss Restaurant Reservations in London",
  description:
    "Get instant Telegram alerts for London's hottest restaurants. Monitor Carbone, Gymkhana, The Dover & more 24/7. Join the waitlist.",
  keywords: [
    "restaurant reservations London",
    "SevenRooms",
    "reservation alerts",
    "Telegram bot",
    "Carbone London",
    "Gymkhana reservations",
    "The Dover",
    "Gaia restaurant",
    "Dorian London",
    "Endo Kazutoshi",
    "London restaurant booking",
  ],
  authors: [{ name: "Seats" }],
  creator: "Seats",
  publisher: "Seats",
  metadataBase: new URL("https://seatsbookings.com"),
  alternates: {
    canonical: "https://seatsbookings.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://seatsbookings.com",
    title: "Seats - Never Miss Restaurant Reservations",
    description:
      "Get instant Telegram alerts for London's hottest restaurants. Monitor Carbone, Gymkhana, The Dover & more 24/7.",
    siteName: "Seats",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Seats - Restaurant Reservation Alerts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seats - Never Miss Restaurant Reservations",
    description:
      "Get instant Telegram alerts for London's hottest restaurants. Monitor Carbone, Gymkhana, The Dover & more 24/7.",
    images: ["/logo.png"],
    creator: "@seatsbookings",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Seats",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web, Telegram",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
              },
              description:
                "Get instant Telegram alerts when tables open up at London's impossible-to-book restaurants including Carbone, Gymkhana, The Dover, Gaia, Dorian, and Endo.",
              url: "https://seatsbookings.com",
              image: "https://seatsbookings.com/logo.png",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "500",
              },
              areaServed: {
                "@type": "City",
                name: "London",
                "@id": "https://en.wikipedia.org/wiki/London",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

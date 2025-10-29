"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bell, Clock, Calendar, CheckCircle2, Sparkles, AlertCircle, Globe } from "lucide-react"
import { addToWaitlist, submitUrgentRequest } from "./actions"

export default function SeatsLanding() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [currentSlide, setCurrentSlide] = useState(0)

  const [urgentForm, setUrgentForm] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    paymentAmount: "",
    message: "",
    email: "",
    venueName: "", // Added venue name field
    partySize: "",
    startDate: "",
    endDate: "",
    mealType: "",
    country: "",
  })
  const [urgentFormSubmitted, setUrgentFormSubmitted] = useState(false)
  const [urgentFormLoading, setUrgentFormLoading] = useState(false)
  const [urgentFormError, setUrgentFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await addToWaitlist(email)

    if (result.success) {
      setSuccessMessage(result.message || "Successfully joined the waitlist!")
      setIsSubmitted(true)
      setEmail("")
    } else {
      setError(result.error || "Something went wrong")
    }

    setIsLoading(false)
  }

  const handleUrgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUrgentFormLoading(true)
    setUrgentFormError(null)

    const result = await submitUrgentRequest(urgentForm)

    if (result.success) {
      setUrgentFormSubmitted(true)
      setUrgentForm({
        firstName: "",
        lastName: "",
        occupation: "",
        paymentAmount: "",
        message: "",
        email: "",
        venueName: "", // Reset venue name
        partySize: "",
        startDate: "",
        endDate: "",
        mealType: "",
        country: "",
      })
    } else {
      setUrgentFormError(result.error || "Something went wrong")
    }

    setUrgentFormLoading(false)
  }

  const restaurants = [
    {
      name: "Carbone",
      location: "Mayfair",
      cuisine: "Italian-American",
      difficulty: "Extremely Hard",
      emoji: "🍝",
      gradient: "from-red-500/20 to-orange-500/20",
    },
    {
      name: "Gymkhana",
      location: "Mayfair",
      cuisine: "Indian Fine Dining",
      difficulty: "Very Hard",
      emoji: "🍛",
      gradient: "from-amber-500/20 to-yellow-500/20",
    },
    {
      name: "The Dover",
      location: "Mayfair",
      cuisine: "British Modern",
      difficulty: "Very Hard",
      emoji: "🥩",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Gaia",
      location: "Mayfair",
      cuisine: "Mediterranean",
      difficulty: "Hard",
      emoji: "🥂",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Dorian",
      location: "Notting Hill",
      cuisine: "French Modern",
      difficulty: "Very Hard",
      emoji: "🍷",
      gradient: "from-rose-500/20 to-red-500/20",
    },
    {
      name: "Endo",
      location: "White City",
      cuisine: "Japanese Omakase",
      difficulty: "Extremely Hard",
      emoji: "🍣",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      name: "Dishoom",
      location: "Multiple Locations",
      cuisine: "Indian Bombay Cafe",
      difficulty: "Very Hard",
      emoji: "🍛",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      name: "Cipriani",
      location: "Mayfair",
      cuisine: "Italian Fine Dining",
      difficulty: "Very Hard",
      emoji: "🍾",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % restaurants.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + restaurants.length) % restaurants.length)
  }

  const getVisibleRestaurants = () => {
    const visible = []
    for (let i = 0; i < 4; i++) {
      visible.push(restaurants[(currentSlide + i) % restaurants.length])
    }
    return visible
  }

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <header className="glass-strong sticky top-0 z-[100] border-b border-white/10" role="banner">
        <nav
          className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between max-w-7xl"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="Seats logo" className="w-8 h-8 md:w-12 md:h-12 mix-blend-screen" />
            <span className="font-bold text-lg md:text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Seats
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="glass border-primary/30 hover:border-primary/50 bg-transparent text-xs md:text-base px-3 md:px-6 h-9 md:h-11"
            asChild
          >
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </nav>
      </header>

      <main>
        <section
          className="container mx-auto px-4 py-12 md:py-24 lg:py-32 max-w-7xl relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div
            className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full blur-[100px] animate-float pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-primary/15 rounded-full blur-[120px] animate-float-delayed pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
            <div className="space-y-4 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-strong rounded-full text-xs md:text-sm font-medium border border-primary/30 animate-glow">
                <span className="text-lg">✨</span>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Now monitoring SevenRooms restaurants
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[1.1]"
              >
                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  Never miss a
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  reservation
                </span>
                <br />
                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  again
                </span>
              </h1>

              <p className="text-base md:text-xl text-foreground/70 text-balance leading-relaxed max-w-xl">
                Seats watches impossible-to-book restaurants 24/7 and alerts you the instant a table opens up. Get
                notified directly in Telegram.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start pt-2 md:pt-6">
                <Button
                  size="lg"
                  className="text-sm md:text-lg px-6 md:px-10 h-12 md:h-16 w-full sm:w-auto min-w-[180px] md:min-w-[220px] bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                  asChild
                >
                  <a href="#waitlist">
                    <span className="mr-2">⚡</span>
                    Join the Waitlist
                  </a>
                </Button>
                <div className="flex flex-col gap-1 justify-center px-2 sm:px-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground">Free early access</p>
                  <p className="text-xs md:text-sm text-foreground/60">No credit card required</p>
                </div>
              </div>

              <div className="pt-2 md:pt-6 flex items-center gap-3" aria-label="Social proof">
                <div className="flex -space-x-2" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full glass-strong border-2 border-background flex items-center justify-center text-xs md:text-sm font-bold shadow-lg shadow-primary/30"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs md:text-sm text-foreground/90">
                    <span className="font-bold text-primary text-base md:text-lg">500+</span> food lovers
                  </p>
                  <p className="text-xs text-foreground/60">already waiting</p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 lg:mt-0">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-3xl blur-3xl"
                aria-hidden="true"
              />
              <Card className="relative glass-strong p-4 md:p-8 border-2 border-white/10 shadow-2xl animate-float">
                <div className="space-y-4 md:space-y-5">
                  {/* Telegram header mockup */}
                  <div className="flex items-center gap-3 pb-4 md:pb-5 border-b border-white/10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 text-xl md:text-2xl">
                      💬
                    </div>
                    <div>
                      <p className="font-bold text-base md:text-lg">Seats Bot</p>
                      <p className="text-xs text-foreground/60 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-label="Online status" />
                        online
                      </p>
                    </div>
                  </div>

                  {/* Bot messages */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex gap-2 md:gap-3 animate-in slide-in-from-left duration-500">
                      <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 text-base md:text-lg">
                        🔔
                      </div>
                      <div className="glass-strong rounded-2xl rounded-tl-sm p-3 md:p-5 max-w-[85%] border border-white/10 shadow-xl">
                        <p className="font-bold mb-2 text-sm md:text-lg">🎉 Reservation Available!</p>
                        <p className="text-xs md:text-sm mb-1">
                          <span className="font-semibold text-primary">Gymkhana</span> - London
                        </p>
                        <div className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 text-foreground/80">
                          <p>📅 March 15, 2025</p>
                          <p>🕐 7:30 PM</p>
                          <p>👥 Table for 2</p>
                        </div>
                        <Button
                          size="sm"
                          className="w-full text-xs md:text-sm bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                        >
                          Book Now →
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 md:gap-3 opacity-60 animate-in slide-in-from-left duration-500 delay-150">
                      <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 text-base md:text-lg">
                        🔔
                      </div>
                      <div className="glass rounded-2xl rounded-tl-sm p-3 md:p-4 max-w-[85%] border border-white/5">
                        <p className="font-semibold mb-1 text-xs md:text-sm">New Opening</p>
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">Dorian</span>
                        </p>
                        <p className="text-xs text-foreground/60">March 22 • 8:00 PM • Party of 4</p>
                      </div>
                    </div>

                    <div className="flex gap-3 opacity-30 animate-in slide-in-from-left duration-500 delay-300">
                      <div className="w-10 h-10 glass rounded-full flex items-center justify-center flex-shrink-0 border border-white/5">
                        <Bell className="w-5 h-5 text-primary/50" aria-hidden="true" />
                      </div>
                      <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[85%] border border-white/5">
                        <p className="font-medium">Carbone</p>
                        <p className="text-xs text-foreground/50">Table available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="restaurants-heading"
          id="restaurants"
        >
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full text-xs md:text-sm font-medium border border-primary/30 mb-4 md:mb-6">
              <span className="text-base md:text-lg">🎯</span>
              <span>Powered by SevenRooms</span>
            </div>
            <h2
              id="restaurants-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-balance"
            >
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                London's hardest tables
              </span>
            </h2>
            <p className="text-sm md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance px-4">
              We monitor the most exclusive restaurants in London. Get notified the instant a table opens up.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 glass-strong rounded-full items-center justify-center border-2 border-white/10 hover:border-primary/50 transition-all hover:scale-110 text-2xl"
              aria-label="Previous restaurant"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 glass-strong rounded-full items-center justify-center border-2 border-white/10 hover:border-primary/50 transition-all hover:scale-110 text-2xl"
              aria-label="Next restaurant"
            >
              →
            </button>

            <div className="overflow-hidden px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {getVisibleRestaurants().map((restaurant, i) => (
                  <Card
                    key={`${restaurant.name}-${i}`}
                    className="glass-strong p-4 md:p-6 space-y-3 border-2 border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden animate-in slide-in-from-right duration-500"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${restaurant.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="w-12 h-12 md:w-16 md:h-16 glass rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-3 md:mb-4 border border-white/10 group-hover:border-primary/30 transition-colors">
                        {restaurant.emoji}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-2">{restaurant.name}</h3>

                      <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                        <p className="text-foreground/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" aria-hidden="true" />
                          {restaurant.location}
                        </p>
                        <p className="text-foreground/60">{restaurant.cuisine}</p>
                      </div>

                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground/50 font-medium">Difficulty</span>
                          <span className="text-xs font-bold text-primary px-2 md:px-3 py-1 md:py-1.5 glass rounded-full border border-primary/30">
                            {restaurant.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {restaurants.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center px-4">
            <p className="text-sm md:text-base text-foreground/60 mb-4 md:mb-6">
              And <span className="font-bold text-primary">100+ more</span> exclusive restaurants across London
            </p>
            <Button
              size="lg"
              variant="outline"
              className="glass border-primary/30 hover:border-primary/50 bg-transparent text-sm md:text-base"
              asChild
            >
              <a href="#waitlist">Join Waitlist to See All</a>
            </Button>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="cities-heading"
          id="cities"
        >
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-strong rounded-full text-sm font-medium border border-primary/30 mb-6">
              <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Global Coverage</span>
            </div>
            <h2 id="cities-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Available in major cities worldwide
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
              Seats monitors exclusive restaurants across the world's top dining destinations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { city: "London", country: "UK", flag: "🇬🇧", gradient: "from-blue-500/20 to-red-500/20" },
              { city: "New York", country: "USA", flag: "🇺🇸", gradient: "from-blue-500/20 to-red-500/20" },
              { city: "Dubai", country: "UAE", flag: "🇦🇪", gradient: "from-green-500/20 to-red-500/20" },
              { city: "Miami", country: "USA", flag: "🇺🇸", gradient: "from-orange-500/20 to-pink-500/20" },
              { city: "Paris", country: "France", flag: "🇫🇷", gradient: "from-blue-500/20 to-red-500/20" },
            ].map((location, i) => (
              <Card
                key={i}
                className="glass-strong p-6 md:p-8 space-y-3 md:space-y-4 border-2 border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${location.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  aria-hidden="true"
                />

                <div className="relative z-10 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {location.flag}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{location.city}</h3>
                  <p className="text-xs md:text-sm text-foreground/60">{location.country}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground/60 mb-6">
              And expanding to <span className="font-bold text-primary">more cities</span> every month
            </p>
            <Button
              size="lg"
              variant="outline"
              className="glass border-primary/30 hover:border-primary/50 bg-transparent"
              asChild
            >
              <a href="#waitlist">Get Early Access</a>
            </Button>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="how-it-works"
          id="how-it-works"
        >
          <div className="text-center mb-16 md:mb-20">
            <h2 id="how-it-works" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                How Seats works
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
              Set it up once, then relax while we do the hunting for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Calendar,
                number: "01",
                title: "Set your preferences",
                description:
                  "Tell us which restaurants you want, your preferred dates, party size, and time windows. We'll watch them all.",
              },
              {
                icon: Clock,
                number: "02",
                title: "We monitor 24/7",
                description:
                  "Seats checks SevenRooms constantly for cancellations and new availability at your target restaurants.",
              },
              {
                icon: Bell,
                number: "03",
                title: "Get instant alerts",
                description:
                  "The moment a table opens up, you'll get a Telegram notification with a direct booking link. First come, first served.",
              },
            ].map((step, i) => (
              <Card
                key={i}
                className="glass-strong p-6 md:p-8 space-y-4 md:space-y-5 border-2 border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-[80px] md:text-[120px] font-bold text-white/5 leading-none">
                  {step.number}
                </div>
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-colors relative z-10">
                  <step.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold relative z-10">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed relative z-10">{step.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="features-heading"
          id="features"
        >
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div
                className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl pointer-events-none -z-10"
                aria-hidden="true"
              />
              <Card className="relative glass-strong p-6 md:p-10 border-2 border-white/10 overflow-hidden shadow-2xl">
                <div
                  className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative space-y-5 z-10">
                  {[
                    {
                      emoji: "🍝",
                      name: "Carbone",
                      location: "Mayfair, London",
                      date: "Mar 15 • 7:30 PM",
                      party: "Table for 2",
                      opacity: "opacity-100",
                    },
                    {
                      emoji: "🍛",
                      name: "Gymkhana",
                      location: "Mayfair, London",
                      date: "Mar 18 • 6:00 PM",
                      party: "Table for 2",
                      opacity: "opacity-60",
                    },
                    {
                      emoji: "🥂",
                      name: "Dorian",
                      location: "Notting Hill, London",
                      date: "Mar 22 • 8:00 PM",
                      party: "Table for 4",
                      opacity: "opacity-30",
                    },
                  ].map((restaurant, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 p-6 glass-strong rounded-2xl border-2 ${i === 0 ? "border-primary/30 shadow-lg shadow-primary/20" : "border-white/5"} ${restaurant.opacity} transition-all hover:opacity-100`}
                    >
                      <div className="w-16 h-16 glass rounded-xl flex items-center justify-center flex-shrink-0 text-3xl border border-white/10">
                        {restaurant.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg mb-1">{restaurant.name}</p>
                        <p className="text-sm text-foreground/60 mb-3">{restaurant.location}</p>
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          <span className="px-3 py-1.5 glass rounded-lg font-medium border border-primary/20">
                            {restaurant.date}
                          </span>
                          <span className="text-foreground/70">{restaurant.party}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Built for serious food lovers
                </span>
              </h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                Stop refreshing reservation sites manually. Seats gives you an unfair advantage in the race for the best
                tables.
              </p>

              <div className="space-y-5 pt-4">
                {[
                  { title: "Multiple restaurants", description: "Track as many venues as you want simultaneously" },
                  {
                    title: "Flexible date ranges",
                    description: "Set date windows instead of single dates for better odds",
                  },
                  { title: "Custom party sizes", description: "Specify exactly how many people you're booking for" },
                  { title: "Time preferences", description: "Only get notified for times that work for you" },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-6 h-6 glass rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border border-primary/30 group-hover:border-primary/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">{feature.title}</h4>
                      <p className="text-foreground/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="urgent-request"
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="urgent-request-heading"
        >
          <Card className="glass-strong p-8 md:p-12 lg:p-16 border-2 border-primary/30 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-strong rounded-full text-sm font-medium border border-primary/30 mb-6">
                  <AlertCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Urgent One-Off Service</span>
                </div>

                <h2
                  id="urgent-request-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance"
                >
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    Need a table urgently?
                  </span>
                </h2>

                <p className="text-base md:text-lg text-foreground/70 text-balance leading-relaxed max-w-2xl mx-auto">
                  Submit an urgent booking request for a one-off reservation. Our team will personally hunt down the
                  table for you. You only pay if we successfully secure your booking.
                </p>
              </div>

              {!urgentFormSubmitted ? (
                <form
                  onSubmit={handleUrgentSubmit}
                  className="space-y-5 md:space-y-6"
                  aria-label="Urgent booking request form"
                >
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-foreground/90">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={urgentForm.firstName}
                        onChange={(e) => setUrgentForm({ ...urgentForm, firstName: e.target.value })}
                        required
                        className="glass-strong border-white/20 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-foreground/90">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Smith"
                        value={urgentForm.lastName}
                        onChange={(e) => setUrgentForm({ ...urgentForm, lastName: e.target.value })}
                        required
                        className="glass-strong border-white/20 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/90">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={urgentForm.email}
                      onChange={(e) => setUrgentForm({ ...urgentForm, email: e.target.value })}
                      required
                      className="glass-strong border-white/20 focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium mb-2 text-foreground/90">
                      Occupation
                    </label>
                    <Input
                      id="occupation"
                      type="text"
                      placeholder="e.g., Software Engineer, Doctor, etc."
                      value={urgentForm.occupation}
                      onChange={(e) => setUrgentForm({ ...urgentForm, occupation: e.target.value })}
                      required
                      className="glass-strong border-white/20 focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="venueName" className="block text-sm font-medium mb-2 text-foreground/90">
                      Venue Name
                    </label>
                    <Input
                      id="venueName"
                      type="text"
                      placeholder="e.g., Carbone, Gymkhana, The Dover"
                      value={urgentForm.venueName}
                      onChange={(e) => setUrgentForm({ ...urgentForm, venueName: e.target.value })}
                      required
                      className="glass-strong border-white/20 focus:border-primary/50"
                    />
                    <p className="text-xs text-foreground/60 mt-2">Which restaurant are you trying to book?</p>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2 text-foreground/90">
                      Country / City
                    </label>
                    <select
                      id="country"
                      value={urgentForm.country}
                      onChange={(e) => setUrgentForm({ ...urgentForm, country: e.target.value })}
                      required
                      className="w-full h-12 glass-strong border-white/20 focus:border-primary/50 rounded-lg px-4 bg-transparent text-foreground"
                    >
                      <option value="" disabled>
                        Select location
                      </option>
                      <option value="London, UK">🇬🇧 London, UK</option>
                      <option value="New York, USA">🇺🇸 New York, USA</option>
                      <option value="Dubai, UAE">🇦🇪 Dubai, UAE</option>
                      <option value="Miami, USA">🇺🇸 Miami, USA</option>
                      <option value="Paris, France">🇫🇷 Paris, France</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="partySize" className="block text-sm font-medium mb-2 text-foreground/90">
                      Party Size
                    </label>
                    <Input
                      id="partySize"
                      type="number"
                      placeholder="2"
                      value={urgentForm.partySize}
                      onChange={(e) => setUrgentForm({ ...urgentForm, partySize: e.target.value })}
                      required
                      min="1"
                      max="20"
                      className="glass-strong border-white/20 focus:border-primary/50"
                    />
                    <p className="text-xs text-foreground/60 mt-2">Number of people dining</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium mb-2 text-foreground/90">
                        Start Date
                      </label>
                      <Input
                        id="startDate"
                        type="date"
                        value={urgentForm.startDate}
                        onChange={(e) => setUrgentForm({ ...urgentForm, startDate: e.target.value })}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="glass-strong border-white/20 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium mb-2 text-foreground/90">
                        End Date
                      </label>
                      <Input
                        id="endDate"
                        type="date"
                        value={urgentForm.endDate}
                        onChange={(e) => setUrgentForm({ ...urgentForm, endDate: e.target.value })}
                        required
                        min={urgentForm.startDate || new Date().toISOString().split("T")[0]}
                        className="glass-strong border-white/20 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mealType" className="block text-sm font-medium mb-2 text-foreground/90">
                      Time
                    </label>
                    <select
                      id="mealType"
                      value={urgentForm.mealType}
                      onChange={(e) => setUrgentForm({ ...urgentForm, mealType: e.target.value })}
                      required
                      className="w-full h-12 glass-strong border-white/20 focus:border-primary/50 rounded-lg px-4 bg-transparent text-foreground"
                    >
                      <option value="" disabled>
                        Select time
                      </option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="either">Either Lunch or Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="paymentAmount" className="block text-sm font-medium mb-2 text-foreground/90">
                      Payment Amount (£) - Only if booking secured
                    </label>
                    <Input
                      id="paymentAmount"
                      type="number"
                      placeholder="100"
                      value={urgentForm.paymentAmount}
                      onChange={(e) => setUrgentForm({ ...urgentForm, paymentAmount: e.target.value })}
                      required
                      min="0"
                      step="1"
                      className="glass-strong border-white/20 focus:border-primary/50"
                    />
                    <p className="text-xs text-foreground/60 mt-2">
                      You only pay this amount if we successfully secure your booking
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/90">
                      Additional Requirements & Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Restaurant name, special requests, dietary restrictions, occasion details, etc..."
                      value={urgentForm.message}
                      onChange={(e) => setUrgentForm({ ...urgentForm, message: e.target.value })}
                      required
                      rows={6}
                      className="glass-strong border-white/20 focus:border-primary/50 resize-none"
                    />
                  </div>

                  {urgentFormError && (
                    <p
                      role="alert"
                      className="text-sm text-destructive glass-strong rounded-lg p-4 border border-destructive/30"
                    >
                      {urgentFormError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={urgentFormLoading}
                    className="w-full h-12 md:h-14 bg-primary hover:bg-primary/90 text-base md:text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                  >
                    {urgentFormLoading ? "Submitting..." : "Submit Urgent Request"}
                  </Button>

                  <p className="text-xs text-foreground/50 text-center">
                    Our team will review your request and contact you within 24 hours
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4 py-12" role="status" aria-live="polite">
                  <div className="w-20 h-20 glass-strong rounded-full flex items-center justify-center border-2 border-primary/30 shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-10 h-10 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-bold">Request Submitted!</p>
                  <p className="text-foreground/70 text-lg text-center max-w-md">
                    We've received your urgent booking request. Our team will contact you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setUrgentFormSubmitted(false)}
                    className="mt-4 glass border-primary/30 hover:border-primary/50 bg-transparent"
                  >
                    Submit Another Request
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </section>

        <section
          id="waitlist"
          className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10"
          aria-labelledby="waitlist-heading"
        >
          <Card className="glass-strong p-8 md:p-12 lg:p-16 border-2 border-primary/30 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-strong rounded-full text-sm font-medium border border-primary/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Limited early access spots</span>
              </div>

              <h2
                id="waitlist-heading"
                className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance"
              >
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  Get early access to Seats
                </span>
              </h2>

              <p className="text-base md:text-xl text-foreground/70 text-balance leading-relaxed max-w-2xl mx-auto">
                Join the waitlist and be among the first to never miss a reservation again. We're launching soon.
              </p>

              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 pt-4 md:pt-6 max-w-lg mx-auto"
                  aria-label="Waitlist signup form"
                >
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address"
                      aria-required="true"
                      className="flex-1 h-12 md:h-14 glass-strong border-white/20 focus:border-primary/50 text-base md:text-lg"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      aria-label={isLoading ? "Joining waitlist" : "Join waitlist"}
                      className="h-12 md:h-14 bg-primary hover:bg-primary/90 min-w-[140px] md:min-w-[160px] text-base md:text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    >
                      {isLoading ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </div>
                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-destructive glass-strong rounded-lg p-4 border border-destructive/30"
                    >
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4 pt-6" role="status" aria-live="polite">
                  <div className="w-20 h-20 glass-strong rounded-full flex items-center justify-center border-2 border-primary/30 shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-10 h-10 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-bold">{successMessage}</p>
                  <p className="text-foreground/70 text-lg text-center max-w-md">
                    We'll email you as soon as we launch.
                  </p>
                </div>
              )}

              <p className="text-xs md:text-sm text-foreground/50 pt-4">No spam, ever. Unsubscribe anytime.</p>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t border-white/10 glass-strong mt-16 md:mt-24 relative z-10" role="contentinfo">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-6">
            <div className="flex items-center gap-1.5">
              <img src="/logo.png" alt="Seats logo" className="w-10 h-10 mix-blend-screen" />
              <span className="font-bold text-xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Seats
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              <p className="text-xs md:text-sm text-foreground/60 text-center">
                © 2025 Seats. Never miss a reservation again.
              </p>
              <div className="flex items-center gap-4 md:gap-6">
                <a
                  href="https://www.tiktok.com/@seatsbooking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  aria-label="Follow us on TikTok"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="font-medium">@seatsbooking</span>
                </a>
                <a
                  href="https://www.instagram.com/seatsbookings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.262-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-medium">@seatsbookings</span>
                </a>
              </div>
            </div>

            <nav
              className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-foreground/60"
              aria-label="Footer navigation"
            >
              <a href="#restaurants" className="hover:text-foreground transition-colors">
                Restaurants
              </a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#waitlist" className="hover:text-foreground transition-colors">
                Waitlist
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

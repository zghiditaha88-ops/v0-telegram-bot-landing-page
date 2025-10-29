"use server"

import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function getWelcomeEmailHTML(email: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <!-- Header with logo -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qk7Glv85Qk1EKpWVbq9DqY70EiE3FX.png" alt="Seats" style="width: 80px; height: 80px; margin-bottom: 16px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Welcome to Seats!</h1>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 24px; color: #111827; font-size: 18px; line-height: 1.6;">
                      Thanks for joining the waitlist! 🎉
                    </p>
                    
                    <p style="margin: 0 0 24px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      You're now on the list for early access to Seats, the smartest way to snag impossible-to-book restaurant reservations.
                    </p>
                    
                    <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 24px 0; border-radius: 8px;">
                      <p style="margin: 0; color: #991b1b; font-size: 15px; line-height: 1.6;">
                        <strong>What happens next?</strong><br>
                        We'll email you as soon as we launch. You'll be among the first to get access to Seats and never miss a reservation again.
                      </p>
                    </div>
                    
                    <h2 style="margin: 32px 0 16px; color: #111827; font-size: 20px; font-weight: bold;">What you'll get with Seats:</h2>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #ef4444; font-size: 20px; margin-right: 12px;">🔔</span>
                          <span style="color: #4b5563; font-size: 15px; line-height: 1.6;">Instant Telegram alerts when tables open up</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #ef4444; font-size: 20px; margin-right: 12px;">⏰</span>
                          <span style="color: #4b5563; font-size: 15px; line-height: 1.6;">24/7 monitoring of your favorite restaurants</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #ef4444; font-size: 20px; margin-right: 12px;">🎯</span>
                          <span style="color: #4b5563; font-size: 15px; line-height: 1.6;">Custom preferences for dates, times, and party size</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #ef4444; font-size: 20px; margin-right: 12px;">⚡</span>
                          <span style="color: #4b5563; font-size: 15px; line-height: 1.6;">Direct booking links - be the first to grab the table</span>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 24px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                      We're working hard to launch soon. Stay tuned!
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px; color: #111827; font-size: 16px; font-weight: bold;">
                      Seats
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      Never miss a reservation again.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export async function addToWaitlist(email: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("waitlist").insert([{ email }]).select()

    if (error) {
      if (error.code === "23505" || error.message?.includes("duplicate key")) {
        return {
          success: true,
          message: "You're already on the waitlist!",
        }
      }
      console.error("[v0] Supabase error:", error)
      return {
        success: false,
        error: "Failed to join waitlist. Please try again.",
      }
    }

    try {
      await resend.emails.send({
        from: "Seats <hello@seatsbookings.com>",
        to: email,
        subject: "Welcome to Seats - You're on the list! 🎉",
        html: await getWelcomeEmailHTML(email),
      })
      console.log("[v0] Welcome email sent successfully to:", email)
    } catch (emailError: any) {
      console.error("[v0] Email sending failed:", emailError?.message)
    }

    return {
      success: true,
      message: "Successfully joined the waitlist!",
    }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function submitUrgentRequest(formData: {
  firstName: string
  lastName: string
  occupation: string
  paymentAmount: string
  message: string
  email: string
  venueName: string
  partySize: string
  startDate: string
  endDate: string
  mealType: string
  country: string
}) {
  try {
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                  <tr>
                    <td style="padding: 40px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🚨 Urgent Booking Request</h1>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 24px; color: #111827; font-size: 20px;">New Urgent Request Details:</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Name:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563;">${formData.firstName} ${formData.lastName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Email:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563;">${formData.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Occupation:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563;">${formData.occupation}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Venue Name:</strong>
                            <p style="margin: 4px 0 0; color: #ef4444; font-size: 18px; font-weight: bold;">🍽️ ${formData.venueName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Location:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563; font-size: 16px;">📍 ${formData.country}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Party Size:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563; font-size: 16px;">👥 ${formData.partySize} people</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Date Range:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563; font-size: 16px;">📅 ${new Date(formData.startDate).toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} - ${new Date(formData.endDate).toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Time:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563; font-size: 16px; text-transform: capitalize;">🍽️ ${formData.mealType}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #111827;">Payment Amount (if booking secured):</strong>
                            <p style="margin: 4px 0 0; color: #ef4444; font-size: 18px; font-weight: bold;">£${formData.paymentAmount}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <strong style="color: #111827;">Additional Requirements:</strong>
                            <p style="margin: 4px 0 0; color: #4b5563; white-space: pre-wrap;">${formData.message}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px;">
                        <p style="margin: 0; color: #991b1b; font-size: 14px;">
                          <strong>Action Required:</strong> This is an urgent one-off booking request. Please respond as soon as possible.
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        Sent from Seats Urgent Request Form
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    await resend.emails.send({
      from: "Seats Urgent Requests <hello@seatsbookings.com>",
      to: ["tzghidi@yahoo.fr", "hello@seatsbookings.com"],
      replyTo: formData.email,
      subject: `🚨 Urgent Booking Request from ${formData.firstName} ${formData.lastName}`,
      html: emailContent,
    })

    return {
      success: true,
      message: "Your urgent request has been submitted successfully!",
    }
  } catch (error) {
    console.error("[v0] Urgent request submission error:", error)
    return {
      success: false,
      error: "Failed to submit request. Please try again.",
    }
  }
}

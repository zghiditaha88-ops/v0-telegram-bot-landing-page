import crypto from 'crypto'

/**
 * HMAC token helper for signed redirect URLs
 * Format: base64url(json) + "." + hex(hmac256(base64))
 */

export function sign(payload: object, secret: string): string {
  const json = JSON.stringify(payload)
  const base64 = Buffer.from(json).toString('base64url')
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(base64)
  const signature = hmac.digest('hex')
  return `${base64}.${signature}`
}

export function verify(token: string, secret: string): object | null {
  try {
    const [base64, signature] = token.split('.')
    if (!base64 || !signature) {
      return null
    }

    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(base64)
    const expectedSignature = hmac.digest('hex')

    if (signature !== expectedSignature) {
      return null
    }

    const json = Buffer.from(base64, 'base64url').toString('utf-8')
    const payload = JSON.parse(json)

    // Check expiration if present
    if (payload.exp && typeof payload.exp === 'number') {
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp < now) {
        return null
      }
    }

    return payload
  } catch {
    return null
  }
}


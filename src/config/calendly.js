/**
 * Your public Calendly event URL (no .env needed).
 * Calendly → Event types → open your meeting → Share → copy link.
 *
 * Example: 'https://calendly.com/your-username/consultation-meeting'
 *
 * Google Calendar & Google Meet (done in Calendly, not in code):
 * 1. Calendly → Settings → Calendar connections → connect Google Calendar
 *    (bookings show on your calendar; avoid double-booking).
 * 2. Same event type → Location / Meeting location → choose Google Meet
 *    (Calendly adds the Meet link to invites and confirmation emails).
 */
export const CALENDLY_BOOKING_URL = 'https://calendly.com/pixl_develop/30min'

/** Calendly requires embed_domain + embed_type for inline iframe embeds (works reliably vs. JS widget in React). */
export function buildCalendlyEmbedSrc(bookingPageUrl) {
  const trimmed = (bookingPageUrl || '').trim()
  if (!trimmed) return ''
  try {
    const url = new URL(trimmed)
    if (typeof window !== 'undefined' && window.location?.host) {
      url.searchParams.set('embed_domain', window.location.host)
    }
    url.searchParams.set('embed_type', 'Inline')
    // Shorter embed; less empty chrome (hex colors without # — Calendly embed API)
    url.searchParams.set('hide_gdpr_banner', '1')
    url.searchParams.set('hide_event_type_details', '1')
    url.searchParams.set('background_color', '000000')
    url.searchParams.set('text_color', 'ffffff')
    url.searchParams.set('primary_color', '10b981')
    return url.toString()
  } catch {
    return trimmed
  }
}

/** Try to read iframe content height from Calendly postMessage payloads (format varies by embed version). */
export function parseCalendlyFrameHeight(raw) {
  let data = raw
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      return null
    }
  }
  if (!data || typeof data !== 'object') return null
  if (typeof data.height === 'number') return data.height
  if (data.payload && typeof data.payload.height === 'number') return data.payload.height
  if (data.payload && typeof data.payload.offsetHeight === 'number') return data.payload.offsetHeight
  return null
}

import nodemailer from 'nodemailer'

// ─── Configuration ─────────────────────────────────────────────
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10)
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' // true for port 465, false for 587
const SMTP_USER = process.env.SMTP_USER || 'thebeautyofarmenia@gmail.com'
const SMTP_PASS = process.env.SMTP_PASS || ''

const FROM_EMAIL = `"The Beauty of Armenia" <${SMTP_USER}>`
const ADMIN_EMAIL = 'thebeautyofarmenia@gmail.com'

export const DISCOUNT_CODE = 'Armen5'

// ─── Transporter (lazy init) ──────────────────────────────────
let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }
  return transporter
}

// ─── Helper ────────────────────────────────────────────────────
async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const transport = getTransporter()
    await transport.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })
    console.log(`Email sent successfully to ${to}`)
    return true
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Failed to send email to ${to}:`, msg)
    throw error
  }
}

// ─── Verification Code Email ───────────────────────────────────
const VERIFICATION_TEMPLATES: Record<string, { subject: string; body: (code: string) => string }> = {
  en: {
    subject: 'Your Verification Code — The Beauty of Armenia',
    body: (code) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">THE BEAUTY OF ARMENIA</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">Email Verification</p>
          <p style="color: rgba(255,255,255,0.6); font-size: 15px; margin: 0 0 24px;">Enter this code to verify your email address:</p>
          <div style="background: rgba(148,163,184,0.08); border: 1px solid rgba(148,163,184,0.2); border-radius: 12px; padding: 18px 32px; display: inline-block; margin-bottom: 24px;">
            <span style="color: #94A3B8; font-size: 36px; font-weight: 700; letter-spacing: 0.3em; font-family: 'Courier New', monospace;">${code}</span>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `,
  },
  ru: {
    subject: 'Ваш код подтверждения — Красота Армении',
    body: (code) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">КРАСОТА АРМЕНИИ</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">Подтверждение email</p>
          <p style="color: rgba(255,255,255,0.6); font-size: 15px; margin: 0 0 24px;">Введите этот код для подтверждения вашего email:</p>
          <div style="background: rgba(148,163,184,0.08); border: 1px solid rgba(148,163,184,0.2); border-radius: 12px; padding: 18px 32px; display: inline-block; margin-bottom: 24px;">
            <span style="color: #94A3B8; font-size: 36px; font-weight: 700; letter-spacing: 0.3em; font-family: 'Courier New', monospace;">${code}</span>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Код действителен 10 минут. Если вы не запрашивали код, проигнорируйте это письмо.</p>
        </div>
      </div>
    `,
  },
  de: {
    subject: 'Ihr Bestätigungscode — Die Schönheit Armeniens',
    body: (code) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">DIE SCHÖNHEIT ARMENIENS</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">E-Mail-Bestätigung</p>
          <p style="color: rgba(255,255,255,0.6); font-size: 15px; margin: 0 0 24px;">Geben Sie diesen Code ein, um Ihre E-Mail-Adresse zu bestätigen:</p>
          <div style="background: rgba(148,163,184,0.08); border: 1px solid rgba(148,163,184,0.2); border-radius: 12px; padding: 18px 32px; display: inline-block; margin-bottom: 24px;">
            <span style="color: #94A3B8; font-size: 36px; font-weight: 700; letter-spacing: 0.3em; font-family: 'Courier New', monospace;">${code}</span>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Dieser Code läuft in 10 Minuten ab. Wenn Sie dies nicht angefordert haben, ignorieren Sie diese E-Mail.</p>
        </div>
      </div>
    `,
  },
}

export async function sendVerificationCodeEmail(
  email: string,
  code: string,
  lang: 'en' | 'ru' | 'de' = 'en'
): Promise<boolean> {
  const template = VERIFICATION_TEMPLATES[lang] || VERIFICATION_TEMPLATES.en
  return sendMail(email, template.subject, template.body(code))
}

// ─── Confirmation Email (Booking) ──────────────────────────────
interface BookingEmailData {
  bookingId: string
  tourName: string
  tourDate: string
  guideLanguage: string
  adults: number
  children: number
  totalPriceAMD: number
  totalPriceEUR: number
  userFirstName: string
  userLastName: string
  userEmail: string
  userPhone?: string | null
  discountCode: string
}

const CONFIRMATION_TEMPLATES: Record<string, { subject: (tour: string) => string; body: (d: BookingEmailData) => string }> = {
  en: {
    subject: (tour) => `Reservation Confirmed — ${tour}`,
    body: (d) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">THE BEAUTY OF ARMENIA</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">Reservation Confirmed</p>
          <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin: 0 0 6px;">${d.tourName}</p>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">${d.tourDate}</p>
        </div>
        <div style="padding: 0 28px 28px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Guest:</strong> ${d.userFirstName} ${d.userLastName}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Guide Language:</strong> ${d.guideLanguage === 'armenian' ? 'Armenian' : 'English/Russian'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Adults:</strong> ${d.adults}${d.children > 0 ? ` | <strong style="color: rgba(255,255,255,0.7);">Children:</strong> ${d.children}` : ''}</p>
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Total: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">YOUR DISCOUNT CODE</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">5% off when you pay in person at the office</p>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; margin: 0;">Pay in person at the OneWay Tour office in Yerevan. Show this email to get your discount. Free cancellation within 24 hours.</p>
        </div>
      </div>
    `,
  },
  ru: {
    subject: (tour) => `Бронирование подтверждено — ${tour}`,
    body: (d) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">КРАСОТА АРМЕНИИ</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">Бронирование подтверждено</p>
          <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin: 0 0 6px;">${d.tourName}</p>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">${d.tourDate}</p>
        </div>
        <div style="padding: 0 28px 28px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Гость:</strong> ${d.userFirstName} ${d.userLastName}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Язык гида:</strong> ${d.guideLanguage === 'armenian' ? 'Армянский' : 'Английский/Русский'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Взрослые:</strong> ${d.adults}${d.children > 0 ? ` | <strong style="color: rgba(255,255,255,0.7);">Дети:</strong> ${d.children}` : ''}</p>
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Итого: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">ВАШ СКИДОЧНЫЙ КОД</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">Скидка 5% при оплате в офисе</p>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; margin: 0;">Оплата наличными в офисе OneWay Tour в Ереване. Покажите это письмо для получения скидки. Бесплатная отмена в течение 24 часов.</p>
        </div>
      </div>
    `,
  },
  de: {
    subject: (tour) => `Reservierung bestätigt — ${tour}`,
    body: (d) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 6px; letter-spacing: 0.05em;">DIE SCHÖNHEIT ARMENIENS</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 28px;">Reservierung bestätigt</p>
          <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin: 0 0 6px;">${d.tourName}</p>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">${d.tourDate}</p>
        </div>
        <div style="padding: 0 28px 28px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Gast:</strong> ${d.userFirstName} ${d.userLastName}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Guidesprache:</strong> ${d.guideLanguage === 'armenian' ? 'Armenisch' : 'Englisch/Russisch'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Erwachsene:</strong> ${d.adults}${d.children > 0 ? ` | <strong style="color: rgba(255,255,255,0.7);">Kinder:</strong> ${d.children}` : ''}</p>
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Gesamt: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">IHR RABATTCODE</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">5% Rabatt bei Zahlung im Büro</p>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; margin: 0;">Zahlung vor Ort im OneWay Tour-Büro in Eriwan. Zeigen Sie diese E-Mail für den Rabatt. Kostenlose Stornierung innerhalb von 24 Stunden.</p>
        </div>
      </div>
    `,
  },
}

// ─── Send Confirmation Emails (to customer + admin) ────────────
export async function sendConfirmationEmails(
  data: BookingEmailData,
  lang: 'en' | 'ru' | 'de' = 'en'
): Promise<void> {
  const template = CONFIRMATION_TEMPLATES[lang] || CONFIRMATION_TEMPLATES.en

  // Send to customer
  await sendMail(data.userEmail, template.subject(data.tourName), template.body(data))

  // Send copy to admin
  const adminSubject = `[New Reservation] ${data.tourName} — ${data.userFirstName} ${data.userLastName}`
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
      <div style="padding: 32px 28px;">
        <h2 style="color: #94A3B8; font-size: 18px; margin: 0 0 16px;">New Tour Reservation</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Tour:</strong> ${data.tourName}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Date:</strong> ${data.tourDate}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Guest:</strong> ${data.userFirstName} ${data.userLastName}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Email:</strong> ${data.userEmail}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Phone:</strong> ${data.userPhone || 'N/A'}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Guide:</strong> ${data.guideLanguage}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Adults:</strong> ${data.adults}${data.children > 0 ? ` | <strong style="color: rgba(255,255,255,0.8);">Children:</strong> ${data.children}` : ''}</p>
        <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Total: €${data.totalPriceEUR}</p>
        <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 8px 0 0;">Booking ID: ${data.bookingId}</p>
      </div>
    </div>
  `
  await sendMail(ADMIN_EMAIL, adminSubject, adminHtml)
}

// ─── Cancellation Emails ───────────────────────────────────────
export async function sendCancellationEmails(
  data: BookingEmailData,
  lang: 'en' | 'ru' | 'de' = 'en'
): Promise<void> {
  const subjects: Record<string, string> = {
    en: `Reservation Cancelled — ${data.tourName}`,
    ru: `Бронирование отменено — ${data.tourName}`,
    de: `Reservierung storniert — ${data.tourName}`,
  }

  const bodies: Record<string, string> = {
    en: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,80,80,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #ff5050; font-size: 22px; margin: 0 0 6px;">RESERVATION CANCELLED</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">Your reservation for <strong style="color: rgba(255,255,255,0.7);">${data.tourName}</strong> on ${data.tourDate} has been cancelled.</p>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">If you did not request this cancellation, please contact us immediately.</p>
        </div>
      </div>
    `,
    ru: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,80,80,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #ff5050; font-size: 22px; margin: 0 0 6px;">БРОНИРОВАНИЕ ОТМЕНЕНО</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">Ваше бронирование <strong style="color: rgba(255,255,255,0.7);">${data.tourName}</strong> на ${data.tourDate} было отменено.</p>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Если вы не запрашивали отмену, свяжитесь с нами немедленно.</p>
        </div>
      </div>
    `,
    de: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,80,80,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #ff5050; font-size: 22px; margin: 0 0 6px;">RESERVIERUNG STORNIERT</h1>
          <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0 0 24px;">Ihre Reservierung für <strong style="color: rgba(255,255,255,0.7);">${data.tourName}</strong> am ${data.tourDate} wurde storniert.</p>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Wenn Sie diese Stornierung nicht angefordert haben, kontaktieren Sie uns umgehend.</p>
        </div>
      </div>
    `,
  }

  const subject = subjects[lang] || subjects.en
  const html = bodies[lang] || bodies.en

  // Send to customer
  await sendMail(data.userEmail, subject, html)

  // Send notification to admin
  await sendMail(ADMIN_EMAIL, `[Cancellation] ${data.tourName} — ${data.userFirstName} ${data.userLastName}`, `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,80,80,0.15);">
      <div style="padding: 32px 28px;">
        <h2 style="color: #ff5050; font-size: 18px; margin: 0 0 16px;">Reservation Cancelled</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Tour:</strong> ${data.tourName}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Date:</strong> ${data.tourDate}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Guest:</strong> ${data.userFirstName} ${data.userLastName} (${data.userEmail})</p>
        <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 8px 0 0;">Booking ID: ${data.bookingId}</p>
      </div>
    </div>
  `)
}

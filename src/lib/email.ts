import nodemailer from 'nodemailer'

// ─── Configuration ─────────────────────────────────────────────
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10)
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' // true for port 465, false for 587
const SMTP_USER = process.env.SMTP_USER || 'thebeautyofarmenia@gmail.com'
const SMTP_PASS = process.env.SMTP_PASS || ''

const FROM_EMAIL = `"The Beauty of Armenia" <${SMTP_USER}>`
const ADMIN_EMAILS = ['thebeautyofarmenia@gmail.com', 'incoming@onewaytour.com', 'caxkal22@gmail.com']

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
  luxuryTour?: boolean
  hotelCategory?: string
  singleSupplement?: boolean
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
            ${d.luxuryTour ? `
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: #c9a84c;">Tour Type:</strong> Luxury Tour (Premium)</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Hotel Category:</strong> ${d.hotelCategory === '4star' ? '4 Superior Hotel' : '3 and 4 Standard Hotel'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Single Supplement:</strong> ${d.singleSupplement ? 'Yes' : 'No'}</p>
            ` : ''}
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Total: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">YOUR DISCOUNT CODE</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">5% off when you pay in person at the office</p>
          </div>
          <!-- Contact Information Box -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left;">
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">OneWay Tour Contact Details</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">Phone:</strong> +374 41 362 131</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">Email:</strong> incoming@onewaytour.com</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;"><strong style="color: rgba(255,255,255,0.7);">Office Location:</strong> Parpetsi 16, Yerevan, Armenia</p>
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
            ${d.luxuryTour ? `
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: #c9a84c;">Тип тура:</strong> Люкс-тур (Премиум)</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Категория отеля:</strong> ${d.hotelCategory === '4star' ? '4 Superior Hotel' : '3 and 4 Standard Hotel'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Одноместное размещение:</strong> ${d.singleSupplement ? 'Да' : 'Нет'}</p>
            ` : ''}
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Итого: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">ВАШ СКИДОЧНЫЙ КОД</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">Скидка 5% при оплате в офисе</p>
          </div>
          <!-- Блок контактной информации -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left;">
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">Контакты OneWay Tour</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">Телефон:</strong> +374 41 362 131</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">Email:</strong> incoming@onewaytour.com</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;"><strong style="color: rgba(255,255,255,0.7);">Адрес офиса:</strong> ул. Парпеци 16, Ереван, Армения</p>
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
            ${d.luxuryTour ? `
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: #c9a84c;">Reisetyp:</strong> Luxusreise (Premium)</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Hotelkategorie:</strong> ${d.hotelCategory === '4star' ? '4 Superior Hotel' : '3 und 4 Standard Hotel'}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.7);">Einzelzimmerzuschlag:</strong> ${d.singleSupplement ? 'Ja' : 'Nein'}</p>
            ` : ''}
            <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Gesamt: €${d.totalPriceEUR}</p>
          </div>
          <div style="background: rgba(148,163,184,0.06); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
            <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 6px;">IHR RABATTCODE</p>
            <p style="color: #94A3B8; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 6px;">${d.discountCode}</p>
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">5% Rabatt bei Zahlung im Büro</p>
          </div>
          <!-- Kontaktinformationen-Box -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left;">
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">OneWay Tour Kontaktdaten</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">Telefon:</strong> +374 41 362 131</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 6px;"><strong style="color: rgba(255,255,255,0.7);">E-Mail:</strong> incoming@onewaytour.com</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;"><strong style="color: rgba(255,255,255,0.7);">Büro-Standort:</strong> Parpetsi 16, Jerevan, Armenien</p>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; margin: 0;">Zahlung vor Ort im OneWay Tour-Büro in Jerevan. Zeigen Sie diese E-Mail für den Rabatt. Kostenlose Stornierung innerhalb von 24 Stunden.</p>
        </div>
      </div>
    `,
  },
}

// ─── Send Confirmation Emails (to customer + admins) ────────────
export async function sendConfirmationEmails(
  data: BookingEmailData,
  lang: 'en' | 'ru' | 'de' = 'en'
): Promise<void> {
  const template = CONFIRMATION_TEMPLATES[lang] || CONFIRMATION_TEMPLATES.en

  // Send to customer
  await sendMail(data.userEmail, template.subject(data.tourName), template.body(data))

  // Send copy to ALL admin emails
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
        ${data.luxuryTour ? `
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: #c9a84c;">Tour Type:</strong> Luxury Tour (Premium)</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Hotel Category:</strong> ${data.hotelCategory === '4star' ? '4 Superior Hotel' : '3 and 4 Standard Hotel'}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Single Supplement:</strong> ${data.singleSupplement ? 'Yes' : 'No'}</p>
        ` : ''}
        <p style="color: #94A3B8; font-size: 16px; font-weight: 600; margin: 12px 0 0;">Total: €${data.totalPriceEUR}</p>
        <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 8px 0 0;">Booking ID: ${data.bookingId}</p>
      </div>
    </div>
  `
  // Send to ALL admin email addresses robustly
  await Promise.all(
    ADMIN_EMAILS.map(adminEmail =>
      sendMail(adminEmail, adminSubject, adminHtml).catch(err => {
        console.error(`Failed to send confirmation copy to admin ${adminEmail}:`, err)
      })
    )
  )
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

  // Send notification to ALL admin emails robustly
  await Promise.all(
    ADMIN_EMAILS.map(adminEmail => 
      sendMail(adminEmail, `[Cancellation] ${data.tourName} — ${data.userFirstName} ${data.userLastName}`, `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,80,80,0.15);">
        <div style="padding: 32px 28px;">
          <h2 style="color: #ff5050; font-size: 18px; margin: 0 0 16px;">Reservation Cancelled</h2>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Tour:</strong> ${data.tourName}</p>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Date:</strong> ${data.tourDate}</p>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 8px;"><strong style="color: rgba(255,255,255,0.8);">Guest:</strong> ${data.userFirstName} ${data.userLastName} (${data.userEmail})</p>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 8px 0 0;">Booking ID: ${data.bookingId}</p>
        </div>
      </div>
    `).catch(err => {
      console.error(`Failed to send cancellation notice to admin ${adminEmail}:`, err)
    })
  ))
}

// ─── Contact Form Emails ─────────────────────────────────────────
export async function sendContactEmail(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
): Promise<boolean> {
  const adminSubject = `[Contact Form] ${subject} — ${name}`
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
      <div style="padding: 32px 28px; background: #0c0c0c; border-bottom: 1px solid rgba(255,255,255,0.06); text-align: center;">
        <h1 style="color: #94A3B8; font-size: 20px; margin: 0 0 4px; letter-spacing: 0.05em;">THE BEAUTY OF ARMENIA</h1>
        <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">New Message from Contact Form</p>
      </div>
      <div style="padding: 28px;">
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 10px;"><strong style="color: rgba(255,255,255,0.8);">Name:</strong> ${name}</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 10px;"><strong style="color: rgba(255,255,255,0.8);">Email:</strong> ${email}</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 10px;"><strong style="color: rgba(255,255,255,0.8);">Phone:</strong> ${phone || 'N/A'}</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;"><strong style="color: rgba(255,255,255,0.8);">Subject:</strong> ${subject}</p>
        </div>
        <div style="background: rgba(148,163,184,0.05); border: 1px solid rgba(148,163,184,0.15); border-radius: 12px; padding: 20px;">
          <p style="color: rgba(148,163,184,0.7); font-size: 12px; margin: 0 0 8px; font-weight: 600; uppercase tracking-wider;">MESSAGE:</p>
          <div style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>
      </div>
    </div>
  `

  await Promise.all(
    ADMIN_EMAILS.map(adminEmail =>
      sendMail(adminEmail, adminSubject, adminHtml).catch(err => {
        console.error(`Failed to send contact copy to admin ${adminEmail}:`, err)
      })
    )
  )
  return true
}

// ─── Newsletter Confirmation Email ─────────────────────────────
export async function sendNewsletterSubscriptionEmail(
  email: string,
  lang: 'en' | 'ru' | 'de' = 'en'
): Promise<boolean> {
  const subjects: Record<string, string> = {
    en: 'Thank you for subscribing! — Armenia Tours',
    ru: 'Спасибо за подписку! — Armenia Tours',
    de: 'Danke für Ihr Abonnement! — Armenia Tours',
  }
  
  const bodies: Record<string, string> = {
    en: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 12px; letter-spacing: 0.05em;">THE BEAUTY OF ARMENIA</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0 0 16px;">Thank You for Subscribing!</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            You have successfully subscribed to the Armenia Tours newsletter. You will now receive the latest tour updates, travel tips, and exclusive offers delivered directly to your inbox.
          </p>
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">
            If you did not sign up for this newsletter, you can safely unsubscribe at any time.
          </p>
        </div>
      </div>
    `,
    ru: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 12px; letter-spacing: 0.05em;">КРАСОТА АРМЕНИИ</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0 0 16px;">Спасибо за подписку!</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            Вы успешно подписались на рассылку новостей Armenia Tours. Теперь вы будете получать последние обновления туров, советы путешественникам и эксклюзивные предложения прямо на ваш почтовый ящик.
          </p>
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">
            Если вы не подписывались на эту рассылку, вы можете отказаться от нее в любое время.
          </p>
        </div>
      </div>
    `,
    de: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(148,163,184,0.15);">
        <div style="padding: 32px 28px; text-align: center;">
          <h1 style="color: #94A3B8; font-size: 22px; margin: 0 0 12px; letter-spacing: 0.05em;">DIE SCHÖNHEIT ARMENIENS</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0 0 16px;">Vielen Dank für Ihr Abonnement!</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            Sie haben den Armenia Tours-Newsletter erfolgreich abonniert. Sie erhalten ab sofort die neuesten Informationen zu unseren Touren, Reisetipps und exklusive Angebote direkt in Ihr Postfach.
          </p>
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">
            Wenn Sie sich nicht für diesen Newsletter angemeldet haben, können Sie ihn jederzeit abbestellen.
          </p>
        </div>
      </div>
    `,
  }
  
  const subject = subjects[lang] || subjects.en
  const html = bodies[lang] || bodies.en
  
  await sendMail(email, subject, html)
  return true
}


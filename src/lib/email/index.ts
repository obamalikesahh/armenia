import nodemailer from 'nodemailer'

// Create reusable transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  })
}

const OWNER_EMAIL = 'armen.arakelyan@web.de'
const DISCOUNT_CODE = 'Armen5'
const DISCOUNT_PERCENT = 5

interface EmailBookingData {
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
  userPhone: string
  discountCode: string
}

// ─── Customer Confirmation Email ───
function getCustomerConfirmationHTML(data: EmailBookingData, lang: 'en' | 'ru' | 'de'): string {
  const templates = {
    en: {
      subject: `Reservation Confirmed — ${data.tourName}`,
      greeting: `Dear ${data.userFirstName} ${data.userLastName},`,
      title: 'Your Tour Reservation is Confirmed!',
      thankYou: 'Thank you for choosing OneWay Tour! Your reservation has been successfully confirmed.',
      details: 'Reservation Details:',
      tourLabel: 'Tour',
      dateLabel: 'Date',
      guideLabel: 'Guide Language',
      adultsLabel: 'Adults',
      childrenLabel: 'Children',
      totalPriceLabel: 'Total Price',
      payInPerson: 'You will pay in person when you arrive at the OneWay Tour office in Yerevan. Please show this confirmation email.',
      discountInfo: `🎉 Special Offer: Use code <strong style="color:#c9a84c;font-size:18px;">${data.discountCode}</strong> to get <strong>${DISCOUNT_PERCENT}% off</strong> your tour price when you pay in person! Show this email at the office to claim your discount.`,
      cancellation: 'You can cancel your reservation free of charge within 24 hours of booking. To cancel, reply to this email or contact us.',
      bookingId: 'Reservation ID',
      regards: 'Best regards,<br/>OneWay Tour Team',
      payAtOffice: 'PAY AT OFFICE',
    },
    ru: {
      subject: `Бронирование подтверждено — ${data.tourName}`,
      greeting: `Уважаемый(ая) ${data.userFirstName} ${data.userLastName},`,
      title: 'Ваше бронирование экскурсии подтверждено!',
      thankYou: 'Спасибо, что выбрали OneWay Tour! Ваше бронирование успешно подтверждено.',
      details: 'Детали бронирования:',
      tourLabel: 'Экскурсия',
      dateLabel: 'Дата',
      guideLabel: 'Язык гида',
      adultsLabel: 'Взрослые',
      childrenLabel: 'Дети',
      totalPriceLabel: 'Итого',
      payInPerson: 'Вы оплатите наличными по прибытии в офис OneWay Tour в Ереване. Пожалуйста, покажите это письмо с подтверждением.',
      discountInfo: `🎉 Специальное предложение: Используйте код <strong style="color:#c9a84c;font-size:18px;">${data.discountCode}</strong> и получите <strong>скидку ${DISCOUNT_PERCENT}%</strong> при оплате на месте! Покажите это письмо в офисе, чтобы получить скидку.`,
      cancellation: 'Вы можете отменить бронирование бесплатно в течение 24 часов после оформления. Для отмены ответьте на это письмо или свяжитесь с нами.',
      bookingId: 'Номер бронирования',
      regards: 'С уважением,<br/>Команда OneWay Tour',
      payAtOffice: 'ОПЛАТА В ОФИСЕ',
    },
    de: {
      subject: `Reservierung bestätigt — ${data.tourName}`,
      greeting: `Sehr geehrte/r ${data.userFirstName} ${data.userLastName},`,
      title: 'Ihre Tour-Reservierung ist bestätigt!',
      thankYou: 'Vielen Dank, dass Sie OneWay Tour gewählt haben! Ihre Reservierung wurde erfolgreich bestätigt.',
      details: 'Reservierungsdetails:',
      tourLabel: 'Tour',
      dateLabel: 'Datum',
      guideLabel: 'Führersprache',
      adultsLabel: 'Erwachsene',
      childrenLabel: 'Kinder',
      totalPriceLabel: 'Gesamtpreis',
      payInPerson: 'Sie bezahlen bei Ankunft im OneWay Tour-Büro in Eriwan bar. Bitte zeigen Sie diese Bestätigungs-E-Mail vor.',
      discountInfo: `🎉 Sonderangebot: Verwenden Sie den Code <strong style="color:#c9a84c;font-size:18px;">${data.discountCode}</strong> und erhalten Sie <strong>${DISCOUNT_PERCENT}% Rabatt</strong> bei Barzahlung vor Ort! Zeigen Sie diese E-Mail im Büro vor, um Ihren Rabatt einzulösen.`,
      cancellation: 'Sie können Ihre Reservierung innerhalb von 24 Stunden nach Buchung kostenlos stornieren. Zur Stornierung antworten Sie auf diese E-Mail oder kontaktieren Sie uns.',
      bookingId: 'Reservierungs-ID',
      regards: 'Mit freundlichen Grüßen,<br/>Ihr OneWay Tour-Team',
      payAtOffice: 'VOR ORT ZAHLEN',
    },
  }

  const t = templates[lang]

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e8e8e8;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <!-- Header -->
    <div style="text-align:center;padding:30px 0 20px;border-bottom:1px solid rgba(201,168,76,0.2);">
      <h1 style="margin:0;font-size:28px;color:#c9a84c;letter-spacing:2px;">ONEWAY TOUR</h1>
      <p style="margin:5px 0 0;font-size:12px;color:#888;letter-spacing:3px;">ARMENIA</p>
    </div>

    <!-- Title -->
    <div style="padding:30px 0 20px;text-align:center;">
      <div style="display:inline-block;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:4px;padding:6px 16px;font-size:11px;letter-spacing:2px;color:#c9a84c;margin-bottom:15px;">${t.payAtOffice}</div>
      <h2 style="margin:0;font-size:22px;color:#e8e8e8;">${t.title}</h2>
    </div>

    <!-- Greeting -->
    <p style="font-size:15px;line-height:1.6;color:#ccc;">${t.greeting}</p>
    <p style="font-size:14px;line-height:1.6;color:#999;">${t.thankYou}</p>

    <!-- Booking Details -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;letter-spacing:1px;color:#c9a84c;">${t.details}</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.bookingId}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-family:monospace;">${data.bookingId}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.tourLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-weight:bold;">${data.tourName}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.dateLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.tourDate}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.guideLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.guideLanguage}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.adultsLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.adults}</td>
        </tr>
        ${data.children > 0 ? `<tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.childrenLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.children}</td>
        </tr>` : ''}
        <tr>
          <td style="padding:8px 0;color:#888;font-weight:bold;">${t.totalPriceLabel}</td>
          <td style="padding:8px 0;text-align:right;">
            <span style="color:#c9a84c;font-size:18px;font-weight:bold;">€${data.totalPriceEUR}</span>
            <br/><span style="color:#666;font-size:12px;">${data.totalPriceAMD.toLocaleString()} AMD</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Discount -->
    <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:20px;margin:20px 0;text-align:center;">
      ${t.discountInfo}
    </div>

    <!-- Pay in person notice -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px;margin:20px 0;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#999;">${t.payInPerson}</p>
    </div>

    <!-- Cancellation -->
    <div style="padding:15px 0;border-top:1px solid rgba(255,255,255,0.04);font-size:12px;color:#666;line-height:1.5;">
      ${t.cancellation}
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0;border-top:1px solid rgba(201,168,76,0.1);font-size:13px;color:#888;">
      ${t.regards}
    </div>
  </div>
</body>
</html>`
}

// ─── Owner Notification Email ───
function getOwnerConfirmationHTML(data: EmailBookingData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e8e8e8;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="text-align:center;padding:20px 0;border-bottom:1px solid rgba(201,168,76,0.2);">
      <h1 style="margin:0;font-size:22px;color:#c9a84c;">NEW RESERVATION</h1>
    </div>

    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;color:#c9a84c;">Customer Information</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Name</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.userFirstName} ${data.userLastName}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Email</td>
          <td style="padding:8px 0;text-align:right;color:#c9a84c;">${data.userEmail}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Phone</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.userPhone}</td>
        </tr>
      </table>
    </div>

    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;color:#c9a84c;">Tour Details</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Reservation ID</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-family:monospace;">${data.bookingId}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Tour</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-weight:bold;">${data.tourName}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Date</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.tourDate}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Guide Language</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.guideLanguage}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Adults</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.adults}</td>
        </tr>
        ${data.children > 0 ? `<tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Children</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.children}</td>
        </tr>` : ''}
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Discount Code</td>
          <td style="padding:8px 0;text-align:right;color:#c9a84c;font-weight:bold;">${data.discountCode}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-weight:bold;">Total</td>
          <td style="padding:8px 0;text-align:right;">
            <span style="color:#c9a84c;font-size:18px;font-weight:bold;">€${data.totalPriceEUR}</span>
            <br/><span style="color:#666;font-size:12px;">${data.totalPriceAMD.toLocaleString()} AMD</span>
          </td>
        </tr>
      </table>
    </div>

    <p style="font-size:12px;color:#666;text-align:center;">This is an automated notification from the OneWay Tour booking system.</p>
  </div>
</body>
</html>`
}

// ─── Customer Cancellation Email ───
function getCustomerCancellationHTML(data: EmailBookingData, lang: 'en' | 'ru' | 'de'): string {
  const templates = {
    en: {
      subject: `Reservation Cancelled — ${data.tourName}`,
      greeting: `Dear ${data.userFirstName} ${data.userLastName},`,
      title: 'Your Reservation Has Been Cancelled',
      message: 'Your tour reservation has been successfully cancelled as requested. The discount code Armen5 is no longer valid for this booking.',
      details: 'Cancelled Reservation Details:',
      tourLabel: 'Tour',
      dateLabel: 'Date',
      bookingId: 'Reservation ID',
      regards: 'Best regards,<br/>OneWay Tour Team',
    },
    ru: {
      subject: `Бронирование отменено — ${data.tourName}`,
      greeting: `Уважаемый(ая) ${data.userFirstName} ${data.userLastName},`,
      title: 'Ваше бронирование отменено',
      message: 'Ваше бронирование экскурсии было успешно отменено по вашему запросу. Скидочный код Armen5 больше не действует для этого бронирования.',
      details: 'Детали отменённого бронирования:',
      tourLabel: 'Экскурсия',
      dateLabel: 'Дата',
      bookingId: 'Номер бронирования',
      regards: 'С уважением,<br/>Команда OneWay Tour',
    },
    de: {
      subject: `Reservierung storniert — ${data.tourName}`,
      greeting: `Sehr geehrte/r ${data.userFirstName} ${data.userLastName},`,
      title: 'Ihre Reservierung wurde storniert',
      message: 'Ihre Tour-Reservierung wurde wie gewünscht storniert. Der Rabattcode Armen5 ist für diese Buchung nicht mehr gültig.',
      details: 'Stornierte Reservierungsdetails:',
      tourLabel: 'Tour',
      dateLabel: 'Datum',
      bookingId: 'Reservierungs-ID',
      regards: 'Mit freundlichen Grüßen,<br/>Ihr OneWay Tour-Team',
    },
  }

  const t = templates[lang]

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e8e8e8;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="text-align:center;padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
      <h1 style="margin:0;font-size:22px;color:#e8e8e8;">ONEWAY TOUR</h1>
    </div>
    <div style="padding:30px 0;text-align:center;">
      <h2 style="margin:0;font-size:20px;color:#e8e8e8;">${t.title}</h2>
    </div>
    <p style="font-size:15px;line-height:1.6;color:#ccc;">${t.greeting}</p>
    <p style="font-size:14px;line-height:1.6;color:#999;">${t.message}</p>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;color:#888;">${t.details}</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.bookingId}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-family:monospace;">${data.bookingId}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">${t.tourLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.tourName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">${t.dateLabel}</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.tourDate}</td>
        </tr>
      </table>
    </div>
    <div style="text-align:center;padding:20px 0;border-top:1px solid rgba(255,255,255,0.04);font-size:13px;color:#888;">
      ${t.regards}
    </div>
  </div>
</body>
</html>`
}

// ─── Owner Cancellation Notification Email ───
function getOwnerCancellationHTML(data: EmailBookingData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e8e8e8;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="text-align:center;padding:20px 0;border-bottom:1px solid rgba(201,168,76,0.2);">
      <h1 style="margin:0;font-size:22px;color:#e8e8e8;">⚠️ RESERVATION CANCELLED</h1>
    </div>

    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;color:#888;">Customer Who Cancelled</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Name</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.userFirstName} ${data.userLastName}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Email</td>
          <td style="padding:8px 0;text-align:right;color:#c9a84c;">${data.userEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Phone</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.userPhone}</td>
        </tr>
      </table>
    </div>

    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 15px;font-size:14px;color:#888;">Cancelled Tour</h3>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Reservation ID</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-family:monospace;">${data.bookingId}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Tour</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;font-weight:bold;">${data.tourName}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
          <td style="padding:8px 0;color:#888;">Date</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.tourDate}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">People</td>
          <td style="padding:8px 0;text-align:right;color:#e8e8e8;">${data.adults} adults${data.children > 0 ? `, ${data.children} children` : ''}</td>
        </tr>
      </table>
    </div>

    <p style="font-size:12px;color:#666;text-align:center;">The seats have been released back to availability.</p>
  </div>
</body>
</html>`
}

// ─── Send Confirmation Emails ───
export async function sendConfirmationEmails(data: EmailBookingData, lang: 'en' | 'ru' | 'de' = 'en') {
  const transporter = getTransporter()

  // Send to customer
  await transporter.sendMail({
    from: `"OneWay Tour Armenia" <${process.env.SMTP_USER || 'noreply@onewaytour.com'}>`,
    to: data.userEmail,
    subject: getCustomerConfirmationHTML(data, lang).match(/<title>(.*?)<\/title>/)?.[1] || `Reservation Confirmed — ${data.tourName}`,
    html: getCustomerConfirmationHTML(data, lang),
  })

  // Send to owner
  await transporter.sendMail({
    from: `"OneWay Tour Booking" <${process.env.SMTP_USER || 'noreply@onewaytour.com'}>`,
    to: OWNER_EMAIL,
    subject: `[NEW RESERVATION] ${data.userFirstName} ${data.userLastName} — ${data.tourName}`,
    html: getOwnerConfirmationHTML(data),
  })
}

// ─── Send Cancellation Emails ───
export async function sendCancellationEmails(data: EmailBookingData, lang: 'en' | 'ru' | 'de' = 'en') {
  const transporter = getTransporter()

  // Send to customer
  await transporter.sendMail({
    from: `"OneWay Tour Armenia" <${process.env.SMTP_USER || 'noreply@onewaytour.com'}>`,
    to: data.userEmail,
    subject: `Reservation Cancelled — ${data.tourName}`,
    html: getCustomerCancellationHTML(data, lang),
  })

  // Send to owner
  await transporter.sendMail({
    from: `"OneWay Tour Booking" <${process.env.SMTP_USER || 'noreply@onewaytour.com'}>`,
    to: OWNER_EMAIL,
    subject: `[CANCELLED] ${data.userFirstName} ${data.userLastName} — ${data.tourName}`,
    html: getOwnerCancellationHTML(data),
  })
}

export { DISCOUNT_CODE, DISCOUNT_PERCENT, OWNER_EMAIL }

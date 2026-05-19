'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useLocale } from '@/hooks/use-locale'

const TRANSLATIONS = {
  en: {
    title: 'Contact Us',
    subtitle: 'Have questions or want to plan your perfect trip to Armenia? Send us a message and we will get back to you shortly.',
    name: 'Your Name',
    email: 'Your Email Address',
    phone: 'Phone Number (Optional)',
    subject: 'Subject',
    message: 'Your Message',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Thank you! Your message has been sent successfully. We will get in touch with you soon.',
    error: 'Failed to send message. Please try again or email us directly.',
  },
  de: {
    title: 'Kontaktieren Sie uns',
    subtitle: 'Haben Sie Fragen oder möchten Sie Ihre perfekte Reise nach Armenien planen? Schreiben Sie uns eine Nachricht und wir melden uns in Kürze.',
    name: 'Ihr Name',
    email: 'Ihre E-Mail-Adresse',
    phone: 'Telefonnummer (Optional)',
    subject: 'Betreff',
    message: 'Ihre Nachricht',
    submit: 'Nachricht senden',
    sending: 'Wird gesendet...',
    success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.',
    error: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
  },
  ru: {
    title: 'Связаться с нами',
    subtitle: 'Есть вопросы или хотите спланировать идеальную поездку в Армению? Напишите нам, и мы ответим вам в ближайшее время.',
    name: 'Ваше имя',
    email: 'Ваш адрес электронной почты',
    phone: 'Номер телефона (необязательно)',
    subject: 'Тема',
    message: 'Ваше сообщение',
    submit: 'Отправить сообщение',
    sending: 'Отправка...',
    success: 'Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
    error: 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз или напишите нам напрямую.',
  },
}

export function ContactForm() {
  const { locale } = useLocale()
  const t = TRANSLATIONS[locale as 'en' | 'de' | 'ru'] || TRANSLATIONS.en

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send')

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-8 shadow-2xl sm:p-12 border border-white/5 relative overflow-hidden backdrop-blur-2xl bg-black/40"
      >
        {/* Dynamic Armenian Painted Background Accent */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#E30A17]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name field */}
            <div className="relative">
              <User className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/30" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.name}
                required
                className="border-white/10 bg-white/5 py-3 pl-11 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/40 focus-visible:ring-primary/15 rounded-xl h-11"
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/30" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.email}
                required
                className="border-white/10 bg-white/5 py-3 pl-11 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/40 focus-visible:ring-primary/15 rounded-xl h-11"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Phone field */}
            <div className="relative">
              <Phone className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/30" />
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phone}
                className="border-white/10 bg-white/5 py-3 pl-11 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/40 focus-visible:ring-primary/15 rounded-xl h-11"
              />
            </div>

            {/* Subject field */}
            <div className="relative">
              <MessageSquare className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/30" />
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.subject}
                required
                className="border-white/10 bg-white/5 py-3 pl-11 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/40 focus-visible:ring-primary/15 rounded-xl h-11"
              />
            </div>
          </div>

          {/* Message field */}
          <div className="relative">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.message}
              required
              rows={4}
              className="border-white/10 bg-white/5 p-4 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/40 focus-visible:ring-primary/15 rounded-2xl resize-none text-sm leading-relaxed"
            />
          </div>

          {/* Submit/Feedback Area */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 flex items-start gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-xs text-emerald-400"
                >
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                  <span>{t.success}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 flex items-start gap-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-rose-400"
                >
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{t.error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary/80 text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-xl py-5 h-12 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {status === 'loading' ? (
                <>
                  <div className="size-4 border-2 border-primary-foreground/35 border-t-primary-foreground rounded-full animate-spin" />
                  <span>{t.sending}</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>{t.submit}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

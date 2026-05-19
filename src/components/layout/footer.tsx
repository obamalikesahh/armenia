'use client'

import { useState } from 'react'
import { Mountain, Mail, MapPin, Phone, Send, Info, Calendar, UserCheck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Locale, locales, localeFlags, localeNames } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { ArmeniaFlag } from '@/components/ui/armenia-flag'
import { regulationsData } from '@/lib/terms-translations'
import { ArmeniaToursLogo } from '@/components/ui/armenia-tours-logo'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

export function Footer() {
  const { locale, setLocale, t } = useLocale()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const activeRegulations = regulationsData[locale] || regulationsData.en

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      setSubscribed(true)
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: locale })
      })
      if (!res.ok) throw new Error('Subscription failed')
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    } catch (err) {
      console.error('Subscription error:', err)
      setSubscribed(false)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div>
            <div className="mb-4 flex items-center">
              <ArmeniaToursLogo useContrast={true} />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-foreground/40">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { key: 'nav.home', href: '#home' },
                { key: 'nav.tours', href: '#tours' },
                { key: 'nav.about', href: '#about' },
                { key: 'nav.contact', href: '#contact' },
                { key: 'tours.featured', href: '#tours' },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/40 transition-colors hover:text-primary"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {t('footer.support')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-left text-sm text-foreground/40 transition-colors hover:text-primary focus:outline-none"
                >
                  {t('footer.privacy')}
                </button>
              </li>
            </ul>
            <Separator className="my-4 bg-secondary" />
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-foreground/30">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-foreground/40">
                <MapPin className="size-3 shrink-0" />
                {t('footer.address')}
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {t('footer.newsletter')}
            </h3>
            <p className="mb-4 text-sm text-foreground/40">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/30" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  required
                  className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/30 focus-visible:border-primary/30"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium hover:bg-primary/80"
                size="sm"
              >
                <Send className="mr-2 size-3" />
                {subscribed ? t('footer.subscribed') : t('footer.subscribe')}
              </Button>
            </form>

            <Separator className="my-4 bg-secondary" />

            {/* Language selector */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/30">
                {t('common.language')}
              </p>
              <div className="flex gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      locale === loc
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary text-foreground/40 hover:bg-secondary hover:text-foreground/70'
                    }`}
                  >
                    {localeFlags[loc]} {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-secondary" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-foreground/25">
            &copy; {currentYear} Armenia Tours. {t('footer.rights')}
          </p>
          <p className="flex items-center gap-1 text-xs text-foreground/25">
            {t('footer.madeWith')}{' '}
            <span className="text-red-400">&#9829;</span>{' '}
            {t('footer.inArmenia')}
          </p>
        </div>
      </div>
    </footer>

      {/* Privacy Policy & Tour Regulations Modal */}
      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col border border-border/80 bg-background/95 backdrop-blur-md shadow-2xl p-6 rounded-xl">
          <DialogHeader className="pb-4 border-b border-border/50">
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Shield className="size-5 text-primary animate-pulse" />
              {locale === 'de' ? 'Reisebestimmungen' : locale === 'ru' ? 'Правила проведения туров' : 'Tour Regulations'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="group" className="flex-1 flex flex-col min-h-0 mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/80 p-1 rounded-lg">
              <TabsTrigger value="group" className="text-sm font-medium py-2 rounded-md transition-all">{activeRegulations.group.title}</TabsTrigger>
              <TabsTrigger value="private" className="text-sm font-medium py-2 rounded-md transition-all">{activeRegulations.private.title}</TabsTrigger>
              <TabsTrigger value="outgoing" className="text-sm font-medium py-2 rounded-md transition-all">{activeRegulations.outgoing.title}</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 min-h-0 mt-4 pr-3">
              <div className="space-y-6 pb-6 text-foreground/80 leading-relaxed text-sm">
                
                {/* GROUP TOURS CONTENT */}
                <TabsContent value="group" className="mt-0 outline-none space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <UserCheck className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.group.bookingConditionsTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.group.bookingConditions.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <Calendar className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.group.cancellationTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.group.cancellation.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {/* PRIVATE TOURS CONTENT */}
                <TabsContent value="private" className="mt-0 outline-none space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <UserCheck className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.private.bookingConditionsTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.private.bookingConditions.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <Calendar className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.private.cancellationTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.private.cancellation.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {/* OUTGOING TOURS CONTENT */}
                <TabsContent value="outgoing" className="mt-0 outline-none space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <UserCheck className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.outgoing.bookingConditionsTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.outgoing.bookingConditions.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                      <Calendar className="size-4 shrink-0 text-primary/80" />
                      {activeRegulations.outgoing.cancellationTitle}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/75">
                      {activeRegulations.outgoing.cancellation.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              {item.text}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-foreground/60">
                                {item.subItems.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

              </div>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}

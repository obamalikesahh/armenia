'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { useLocale } from '@/hooks/use-locale'
import { signIn } from 'next-auth/react'

interface UserInfo {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string | null
  token: string
}

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: 'login' | 'register'
  onLoginSuccess?: (user: UserInfo) => void
}

const COUNTDOWN_SECONDS = 600 // 10 minutes

export function AuthModal({ open, onOpenChange, defaultTab = 'login', onLoginSuccess }: AuthModalProps) {
  const { t, locale } = useLocale()

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Register state
  const [regFirstName, setRegFirstName] = useState('')
  const [regLastName, setRegLastName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [regTerms, setRegTerms] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState('')
  const [regSuccess, setRegSuccess] = useState(false)

  // Register step flow
  const [regStep, setRegStep] = useState(1) // 1: email, 2: verify code, 3: profile
  const [otpValue, setOtpValue] = useState('')
  const [sendCodeLoading, setSendCodeLoading] = useState(false)
  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [codeSentAt, setCodeSentAt] = useState<number | null>(null)
  const [regInfoMessage, setRegInfoMessage] = useState('')

  const [activeTab, setActiveTab] = useState(defaultTab)

  // Sync activeTab when defaultTab changes (e.g., clicking "Register" in navbar)
  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  // Countdown timer for verification code expiry
  useEffect(() => {
    if (!codeSentAt) return

    const tick = () => {
      const elapsed = Math.floor((Date.now() - codeSentAt) / 1000)
      const remaining = COUNTDOWN_SECONDS - elapsed
      if (remaining <= 0) {
        setCountdown(0)
        setCodeSentAt(null)
      } else {
        setCountdown(remaining)
      }
    }

    tick() // initial tick
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [codeSentAt])

  // Format countdown as MM:SS
  const formatCountdown = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!loginEmail || !loginPassword) {
      setLoginError(t('auth.fillFields'))
      return
    }
    setLoginLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('auth.loginFailed'))
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
      }

      // Store user info in localStorage
      if (data.user) {
        localStorage.setItem('user_info', JSON.stringify(data.user))
      }

      // Call the onLoginSuccess callback with user info + token
      if (onLoginSuccess) {
        onLoginSuccess({
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phone: data.user.phone,
          token: data.token,
        })
      }

      onOpenChange(false)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : t('auth.invalidCredentials'))
    } finally {
      setLoginLoading(false)
    }
  }

  // Step 1: Send verification code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegError('')
    setRegInfoMessage('')

    if (!regEmail) {
      setRegError(t('auth.fillFields'))
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(regEmail)) {
      setRegError(t('auth.invalidEmail'))
      return
    }

    setSendCodeLoading(true)
    try {
      const res = await fetch('/api/auth/verify-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, lang: locale }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('auth.sendCodeFailed'))
      }

      // Start countdown and move to step 2
      setCodeSentAt(Date.now())
      setCountdown(COUNTDOWN_SECONDS)
      setOtpValue('')
      // SECURITY: Never display the verification code on the website
      // The code is sent ONLY to the user's email
      setRegInfoMessage(t('auth.codeSent'))
      setRegStep(2)
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('auth.sendCodeFailed'))
    } finally {
      setSendCodeLoading(false)
    }
  }

  // Step 2: Verify the code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegError('')
    setRegInfoMessage('')

    if (otpValue.length !== 6) {
      setRegError(t('auth.invalidCode'))
      return
    }

    setVerifyCodeLoading(true)
    try {
      const res = await fetch('/api/auth/verify-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, code: otpValue }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('auth.invalidCode'))
      }

      // Move to step 3
      setRegStep(3)
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('auth.invalidCode'))
    } finally {
      setVerifyCodeLoading(false)
    }
  }

  // Resend verification code
  const handleResendCode = async () => {
    setRegError('')
    setRegInfoMessage('')
    setSendCodeLoading(true)
    try {
      const res = await fetch('/api/auth/verify-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, lang: locale }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('auth.sendCodeFailed'))
      }

      setCodeSentAt(Date.now())
      setCountdown(COUNTDOWN_SECONDS)
      setOtpValue('')
      setRegInfoMessage(t('auth.codeSent'))
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('auth.sendCodeFailed'))
    } finally {
      setSendCodeLoading(false)
    }
  }

  // Step 3: Complete profile & register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegError('')
    if (!regFirstName || !regLastName || !regPhone || !regPassword) {
      setRegError(t('auth.fillRequiredFields'))
      return
    }
    if (regPassword !== regConfirmPassword) {
      setRegError(t('auth.passwordsNoMatch'))
      return
    }
    if (!regTerms) {
      setRegError(t('auth.acceptTerms'))
      return
    }
    setRegLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone,
          emailVerified: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('auth.registrationFailed'))
      }

      // Show success message, then switch to login tab
      setRegSuccess(true)

      // Pre-fill login email
      setLoginEmail(regEmail)
      setLoginPassword('')

      // After 2 seconds, switch to login tab
      setTimeout(() => {
        setRegSuccess(false)
        setActiveTab('login')
      }, 2000)
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('auth.registrationFailed'))
    } finally {
      setRegLoading(false)
    }
  }

  const resetForm = () => {
    setLoginEmail('')
    setLoginPassword('')
    setLoginError('')
    setRegFirstName('')
    setRegLastName('')
    setRegEmail('')
    setRegPhone('')
    setRegPassword('')
    setRegConfirmPassword('')
    setRegTerms(false)
    setRegError('')
    setRegSuccess(false)
    setRegStep(1)
    setOtpValue('')
    setSendCodeLoading(false)
    setVerifyCodeLoading(false)
    setCountdown(0)
    setCodeSentAt(null)
    setRegInfoMessage('')
    setActiveTab(defaultTab)
  }

  const handleClose = (open: boolean) => {
    if (!open) resetForm()
    onOpenChange(open)
  }

  // Step indicator component
  const StepIndicator = () => (
    <div className="mb-6 flex items-center justify-center gap-2">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
              regStep === step
                ? 'bg-primary text-primary-foreground'
                : regStep > step
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary text-foreground/25'
            }`}
          >
            {regStep > step ? (
              <CheckCircle2 className="size-4" />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div
              className={`h-px w-8 transition-all ${
                regStep > step ? 'bg-primary/40' : 'bg-secondary'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const SocialDivider = () => (
    <div className="relative my-4">
      <Separator className="bg-secondary" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 px-3 text-xs text-foreground/25">
        {t('auth.orContinueWith')}
      </span>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-md"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">
          {activeTab === 'login' ? t('auth.login') : t('auth.register')}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {activeTab === 'login'
            ? t('auth.signInDescription')
            : t('auth.createAccountDescription')}
        </DialogDescription>

        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val as 'login' | 'register')
            // Reset step when switching to register tab
            if (val === 'register') {
              setRegStep(1)
              setOtpValue('')
              setRegError('')
              setRegInfoMessage('')
              setCodeSentAt(null)
              setCountdown(0)
            }
          }}
          className="w-full"
        >
          <div className="border-b border-border px-6 pt-6">
            <TabsList className="h-10 w-full bg-secondary">
              <TabsTrigger
                value="login"
                className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {t('auth.login')}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {t('auth.register')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Login Tab */}
          <TabsContent value="login" className="px-6 pb-6 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-foreground/45">
                      {t('auth.email')}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                        placeholder={t('auth.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="text-foreground/45">
                        {t('auth.password')}
                      </Label>
                      <button
                        type="button"
                        className="text-xs text-primary/70 transition-colors hover:text-primary"
                      >
                        {t('auth.forgotPassword')}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="border-border bg-secondary pl-10 pr-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground/25 transition-colors hover:text-white/60"
                      >
                        {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/80 disabled:opacity-50"
                    size="lg"
                  >
                    {loginLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-primary-foreground" />
                        {t('common.loading')}
                      </span>
                    ) : (
                      t('auth.login')
                    )}
                  </Button>
                </form>

                <SocialDivider />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-border bg-secondary text-foreground/50 hover:bg-white/5 hover:text-white/70"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                  >
                    <svg className="mr-2 size-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {t('auth.google')}
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-foreground/25">
                  {t('auth.noAccount')}{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-primary/70 underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {t('auth.register')}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="px-6 pb-6 pt-4">
            <AnimatePresence mode="wait">
              {regSuccess ? (
                <motion.div
                  key="reg-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <CheckCircle2 className="mb-3 size-12 text-primary" />
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{t('auth.registrationSuccess')}</h3>
                  <p className="text-sm text-muted-foreground">{t('auth.switchingToLogin')}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`register-step-${regStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepIndicator />

                  {/* Step 1: Enter Email */}
                  {regStep === 1 && (
                    <form onSubmit={handleSendCode} className="space-y-4">
                      {regError && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                          {regError}
                        </div>
                      )}

                      <div className="text-center">
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                          {t('auth.step1Title')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('auth.step1Description')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-email" className="text-foreground/45">
                          {t('auth.email')}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                          <Input
                            id="reg-email"
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            placeholder={t('auth.emailPlaceholder')}
                            autoFocus
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={sendCodeLoading}
                        className="w-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/80 disabled:opacity-50"
                        size="lg"
                      >
                        {sendCodeLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-primary-foreground" />
                            {t('common.loading')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Mail className="size-4" />
                            {t('auth.sendCode')}
                          </span>
                        )}
                      </Button>

                      <SocialDivider />

                      <Button
                        variant="outline"
                        className="w-full border-border bg-secondary text-foreground/50 hover:bg-white/5 hover:text-white/70"
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                      >
                        <svg className="mr-2 size-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        {t('auth.google')}
                      </Button>

                      <p className="mt-4 text-center text-xs text-foreground/25">
                        {t('auth.hasAccount')}{' '}
                        <button
                          onClick={() => setActiveTab('login')}
                          className="text-primary/70 underline underline-offset-2 transition-colors hover:text-primary"
                        >
                          {t('auth.login')}
                        </button>
                      </p>
                    </form>
                  )}

                  {/* Step 2: Enter Verification Code */}
                  {regStep === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                      {regError && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                          {regError}
                        </div>
                      )}

                      {regInfoMessage && (
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
                          {regInfoMessage}
                        </div>
                      )}

                      <div className="text-center">
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                          {t('auth.step2Title')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('auth.step2Description')}
                        </p>
                        <p className="mt-1 text-sm text-primary/70">
                          {regEmail}
                        </p>
                      </div>

                      <div className="flex justify-center py-2">
                        <InputOTP
                          maxLength={6}
                          value={otpValue}
                          onChange={setOtpValue}
                          containerClassName="gap-2"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                            <InputOTPSlot
                              index={1}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                            <InputOTPSlot
                              index={2}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                          </InputOTPGroup>
                          <InputOTPSeparator className="text-foreground/20" />
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                            <InputOTPSlot
                              index={4}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                            <InputOTPSlot
                              index={5}
                              className="border-foreground/15 bg-secondary size-12 text-base text-foreground data-[active=true]:border-primary/40 data-[active=true]:ring-primary/20 first:rounded-l-lg last:rounded-r-lg"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      {/* Countdown timer */}
                      {countdown > 0 ? (
                        <p className="text-center text-sm text-foreground/30">
                          {t('auth.resendIn')} {formatCountdown(countdown)}
                        </p>
                      ) : (
                        <p className="text-center text-sm">
                          <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={sendCodeLoading}
                            className="text-primary/70 transition-colors hover:text-primary disabled:opacity-50"
                          >
                            {sendCodeLoading ? t('common.loading') : t('auth.resendCode')}
                          </button>
                          <span className="ml-1 text-foreground/25">{t('auth.codeExpired')}</span>
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={verifyCodeLoading || otpValue.length !== 6}
                        className="w-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/80 disabled:opacity-50"
                        size="lg"
                      >
                        {verifyCodeLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-primary-foreground" />
                            {t('common.loading')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4" />
                            {t('auth.verifyCode')}
                          </span>
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={() => {
                          setRegStep(1)
                          setRegError('')
                          setRegInfoMessage('')
                          setOtpValue('')
                        }}
                        className="flex w-full items-center justify-center gap-1 text-sm text-foreground/30 transition-colors hover:text-foreground/50"
                      >
                        <ArrowLeft className="size-3" />
                        {t('auth.step1Title')}
                      </button>
                    </form>
                  )}

                  {/* Step 3: Complete Profile */}
                  {regStep === 3 && (
                    <form onSubmit={handleRegister} className="space-y-4">
                      {regError && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                          {regError}
                        </div>
                      )}

                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm text-primary">
                        {t('auth.emailVerified')}
                      </div>

                      <div className="text-center">
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                          {t('auth.step3Title')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('auth.step3Description')}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="reg-first" className="text-foreground/45">
                            {t('auth.firstName')}
                          </Label>
                          <div className="relative">
                            <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                            <Input
                              id="reg-first"
                              value={regFirstName}
                              onChange={(e) => setRegFirstName(e.target.value)}
                              className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-last" className="text-foreground/45">
                            {t('auth.lastName')}
                          </Label>
                          <div className="relative">
                            <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                            <Input
                              id="reg-last"
                              value={regLastName}
                              onChange={(e) => setRegLastName(e.target.value)}
                              className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-phone" className="text-foreground/45">
                          {t('auth.phone')} <span className="text-primary/60">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                          <Input
                            id="reg-phone"
                            type="tel"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            placeholder="+374 XX XXX XXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-password" className="text-foreground/45">
                          {t('auth.password')}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                          <Input
                            id="reg-password"
                            type={showRegPassword ? 'text' : 'password'}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="border-border bg-secondary pl-10 pr-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground/25 transition-colors hover:text-white/60"
                          >
                            {showRegPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-confirm" className="text-foreground/45">
                          {t('auth.confirmPassword')}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/25" />
                          <Input
                            id="reg-confirm"
                            type="password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="border-border bg-secondary pl-10 text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="reg-terms"
                          checked={regTerms}
                          onCheckedChange={(checked) => setRegTerms(checked === true)}
                          className="mt-0.5 border-foreground/15 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor="reg-terms"
                          className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
                        >
                          {t('auth.iAgreeTo')}{' '}
                          <span className="text-primary/70 underline">{t('auth.termsOfService')}</span>{' '}
                          {t('auth.and')}{' '}
                          <span className="text-primary/70 underline">{t('auth.privacyPolicy')}</span>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={regLoading}
                        className="w-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/80 disabled:opacity-50"
                        size="lg"
                      >
                        {regLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-primary-foreground" />
                            {t('common.loading')}
                          </span>
                        ) : (
                          t('auth.register')
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={() => {
                          setRegStep(2)
                          setRegError('')
                        }}
                        className="flex w-full items-center justify-center gap-1 text-sm text-foreground/30 transition-colors hover:text-foreground/50"
                      >
                        <ArrowLeft className="size-3" />
                        {t('auth.step2Title')}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

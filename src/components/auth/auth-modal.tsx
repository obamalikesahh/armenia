'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'
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
import { useLocale } from '@/hooks/use-locale'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: 'login' | 'register'
}

export function AuthModal({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const { t } = useLocale()

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

  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields')
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
        throw new Error(data.error || 'Login failed')
      }
      onOpenChange(false)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegError('')
    if (!regFirstName || !regLastName || !regEmail || !regPassword) {
      setRegError('Please fill in all required fields')
      return
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match')
      return
    }
    if (!regTerms) {
      setRegError('Please accept the terms and conditions')
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
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      onOpenChange(false)
    } catch (err) {
      setRegError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
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
  }

  const handleClose = (open: boolean) => {
    if (!open) resetForm()
    onOpenChange(open)
  }

  const SocialDivider = () => (
    <div className="relative my-4">
      <Separator className="bg-white/10" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950/95 px-3 text-xs text-white/30">
        {t('auth.orContinueWith')}
      </span>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="border-white/15 bg-gray-950/95 p-0 text-white backdrop-blur-2xl sm:max-w-md"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">
          {activeTab === 'login' ? t('auth.login') : t('auth.register')}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {activeTab === 'login'
            ? 'Sign in to your account'
            : 'Create a new account'}
        </DialogDescription>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as 'login' | 'register')}
          className="w-full"
        >
          <div className="border-b border-white/10 px-6 pt-6">
            <TabsList className="h-10 w-full bg-white/5">
              <TabsTrigger
                value="login"
                className="flex-1 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400"
              >
                {t('auth.login')}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400"
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
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white/60">
                      {t('auth.email')}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="text-white/60">
                        {t('auth.password')}
                      </Label>
                      <button
                        type="button"
                        className="text-xs text-amber-400 transition-colors hover:text-amber-300"
                      >
                        {t('auth.forgotPassword')}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-white/30 transition-colors hover:text-white"
                      >
                        {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600 disabled:opacity-50"
                    size="lg"
                  >
                    {loginLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
                    className="flex-1 border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      // Google OAuth would go here
                    }}
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
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    disabled
                  >
                    <svg className="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {t('auth.facebook')}
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-white/30">
                  {t('auth.noAccount')}{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-amber-400 underline underline-offset-2 transition-colors hover:text-amber-300"
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
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleRegister} className="space-y-4">
                  {regError && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                      {regError}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="reg-first" className="text-white/60">
                        {t('auth.firstName')}
                      </Label>
                      <div className="relative">
                        <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                        <Input
                          id="reg-first"
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-last" className="text-white/60">
                        {t('auth.lastName')}
                      </Label>
                      <div className="relative">
                        <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                        <Input
                          id="reg-last"
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-white/60">
                      {t('auth.email')}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="reg-email"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone" className="text-white/60">
                      {t('auth.phone')}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="+374 XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-white/60">
                      {t('auth.password')}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="reg-password"
                        type={showRegPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-white/30 transition-colors hover:text-white"
                      >
                        {showRegPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm" className="text-white/60">
                      {t('auth.confirmPassword')}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="reg-terms"
                      checked={regTerms}
                      onCheckedChange={(checked) => setRegTerms(checked === true)}
                      className="mt-0.5 border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label
                      htmlFor="reg-terms"
                      className="cursor-pointer text-xs leading-relaxed text-white/50"
                    >
                      I agree to the{' '}
                      <span className="text-amber-400 underline">Terms of Service</span>{' '}
                      and{' '}
                      <span className="text-amber-400 underline">Privacy Policy</span>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={regLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600 disabled:opacity-50"
                    size="lg"
                  >
                    {regLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t('common.loading')}
                      </span>
                    ) : (
                      t('auth.register')
                    )}
                  </Button>
                </form>

                <SocialDivider />

                <Button
                  variant="outline"
                  className="w-full border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    // Google OAuth would go here
                  }}
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

                <p className="mt-4 text-center text-xs text-white/30">
                  {t('auth.hasAccount')}{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-amber-400 underline underline-offset-2 transition-colors hover:text-amber-300"
                  >
                    {t('auth.login')}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

# Task 6: Auth Modal + Components Fix

## Summary
Replaced all hardcoded English strings in auth-modal.tsx and footer.tsx with i18n translation function `t()` calls. Tour-card.tsx was already fully translated and required no changes.

## Changes Made

### `/home/z/my-project/src/components/auth/auth-modal.tsx`
Replaced 13 hardcoded English strings with `t()` calls:

| Line (approx) | Old String | New Translation Key |
|---|---|---|
| 65 | `'Please fill in all fields'` | `t('auth.fillFields')` |
| 77 | `'Login failed'` | `t('auth.loginFailed')` |
| 104 | `'Invalid email or password'` | `t('auth.invalidCredentials')` |
| 114 | `'Please fill in all required fields'` | `t('auth.fillRequiredFields')` |
| 118 | `'Passwords do not match'` | `t('auth.passwordsNoMatch')` |
| 122 | `'Please accept the terms and conditions'` | `t('auth.acceptTerms')` |
| 140 | `'Registration failed'` | `t('auth.registrationFailed')` |
| 156 | `'Registration failed. Please try again.'` | `t('auth.registrationFailed')` |
| 201-203 | `'Sign in to your account'` / `'Create a new account'` | `t('auth.signInDescription')` / `t('auth.createAccountDescription')` |
| 257, 439 | `placeholder="your@email.com"` | `placeholder={t('auth.emailPlaceholder')}` |
| 378 | `Registration Successful!` | `{t('auth.registrationSuccess')}` |
| 379 | `Switching to login...` | `{t('auth.switchingToLogin')}` |
| 513-516 | `I agree to the` / `Terms of Service` / `and` / `Privacy Policy` | `t('auth.iAgreeTo')` / `t('auth.termsOfService')` / `t('auth.and')` / `t('auth.privacyPolicy')` |

The component already had `useLocale` imported and `const { t } = useLocale()` declared, so no import changes were needed.

### `/home/z/my-project/src/components/layout/footer.tsx`
Replaced 4 hardcoded English strings with `t()` calls:

| Line (approx) | Old String | New Translation Key |
|---|---|---|
| 130 | `Yerevan, Armenia` | `{t('footer.address')}` |
| 158 | `placeholder="your@email.com"` | `placeholder={t('footer.emailPlaceholder')}` |
| 169 | `'✓ Subscribed!'` | `t('footer.subscribed')` |
| 206-208 | `Made with` / `in Armenia` | `t('footer.madeWith')` / `t('footer.inArmenia')` |

The component already had `useLocale` imported and used.

### `/home/z/my-project/src/components/tours/tour-card.tsx`
**No changes needed** - this component already uses `t()` calls for all user-facing strings (featured, duration labels, guide labels, from, book now). The `tour.category` and `tour.region` values come from data and are not hardcoded English.

## Verification
- Lint passed with no errors
- Dev server compiled successfully
- All translation keys used are defined in i18n.ts for all 3 locales (en, ru, de)

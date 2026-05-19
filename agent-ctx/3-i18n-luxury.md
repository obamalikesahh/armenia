# Task 3: i18n Translation for Luxury Tours Section

## Summary
Added i18n translation keys for the luxury tours section and replaced all hardcoded English text with `t('luxury.keyName')` calls.

## Changes Made

### 1. `/home/z/my-project/src/lib/i18n.ts`
Added 35 `luxury.*` translation keys to all three language sections (en, ru, de):
- Section headers: title, subtitle, dayByDay, accommodation, pricing, includedExcluded, policies
- Policy section: paymentPolicy, cancellationPolicy
- CTA section: readyToEmbark, readyDescription, requestQuote, downloadBrochure
- Pricing table: groupSize, superior, standard, singleSupplement, persons, person, fromPrice, pricePerPerson
- Itinerary day details: highlights, meals, specialInclusions
- Duration badges: arrival, departure, halfDay, fullDay
- Expand/collapse: expandAll, collapseAll, more
- Inclusion lists: included, excluded

### 2. `/home/z/my-project/src/components/luxury/luxury-tours-section.tsx`
- Imported `useLocale` from `@/hooks/use-locale`
- Added `const { t } = useLocale()` to 7 components:
  - `DurationBadge` - arrival/departure/halfDay/fullDay labels
  - `ItineraryDay` - highlights, meals, accommodation, specialInclusions, more
  - `PricingTable` - groupSize, superior, standard, person/persons, singleSupplement
  - `InclusionLists` - included, excluded
  - `PolicyAccordion` - paymentPolicy, cancellationPolicy
  - `LuxuryToursSection` (main) - title, subtitle, dayByDay, accommodation, pricing, pricePerPerson, includedExcluded, policies, readyToEmbark, readyDescription, requestQuote, downloadBrochure, persons, fromPrice
  - `ExpandAllButton` - expandAll, collapseAll
- All hardcoded English strings replaced with `t('luxury.keyName')` calls

## Verification
- `bun run lint` passes with no errors
- Dev server compiles and serves pages successfully
- No TypeScript errors

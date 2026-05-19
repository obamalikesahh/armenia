# Task 5: Ultra-Detailed Luxury Tour Itineraries with Tiered Pricing

## Agent
Luxury Tour Data Agent

## Task
Replace the two luxury tour objects in `/home/z/my-project/src/lib/tours-data.ts` with new 7-day and 8-day itineraries, complete with tiered pricing, rich descriptions, and comprehensive translations.

## Changes Made

### File Modified
- `/home/z/my-project/src/lib/tours-data.ts`

### Tour 1: Armenia-Georgia Luxury Tour (id: 16, was 101)
- **Duration**: 7 days (was 14 days)
- **Route**: Tbilisi → Kakheti → Sadakhlo Border → Haghpat/Sanahin → Yerevan → Sevan → Dilijan → Khor Virap → Noravank → Areni → Tatev → Goris → Garni → Geghard → Yerevan Airport
- **7-day itinerary** with detailed EN/RU/DE descriptions including:
  - Day 1: Arrival in Tbilisi — private transfer, 4★ hotel, welcome dinner
  - Day 2: Tbilisi City Tour — Metekhi, Narikala, sulfur baths, Shardeni, Bridge of Peace, National Museum
  - Day 3: Kakheti Wine Region — Bodbe, Sighnaghi, Tsinandali Estate, wine tasting, supra feast
  - Day 4: Drive to Armenia — Sadakhlo border, Haghpat & Sanahin UNESCO, Lori region
  - Day 5: Yerevan → Sevan → Dilijan — Lake Sevan, Sevanavank, Dilijan Old Town, Haghartsin/Goshavank
  - Day 6: Khor Virap → Noravank → Tatev — dungeon, red cliffs, Areni wine, Wings of Tatev, Devil's Bridge
  - Day 7: Garni → Geghard → Departure — pagan temple, Lavash masterclass, UNESCO monastery, airport

### Tour 2: Armenia Luxury Discovery Tour (id: 17, was 102)
- **Duration**: 8 days (was 10 days)
- **Route**: Yerevan → Khor Virap → Noravank → Areni → Goris → Tatev → Carahunge → Selim Pass → Noratus → Sevan → Dilijan → Haghartsin → Goshavank → Sanahin → Haghpat → Akhtala → Garni → Geghard → Yerevan
- **8-day itinerary** with detailed EN/RU/DE descriptions including:
  - Day 1: Arrival – Yerevan City Tour — Tsitsernakaberd, ARARAT brandy, Republic Square, Cascade, folk music dinner
  - Day 2: Khor Virap – Noravank – Areni – Goris — dungeon, Mt Ararat, crimson cliffs, Areni Cave, Matevosyan House lunch
  - Day 3: Wings of Tatev – Carahunge – Goris — Guinness ropeway, Tatev, Devil's Bridge, Armenian Stonehenge, cave village
  - Day 4: Goris → Selim Pass → Sevan — mountain pass, caravanserai, Noratus khachkars, lakeside overnight
  - Day 5: Sevan → Dilijan → Haghartsin → Goshavank — Lake Parz, Old Town, forest monastery, khachkars
  - Day 6: Dilijan → Sanahin → Haghpat → Yerevan — 2 UNESCO sites, Akhtala frescoes
  - Day 7: Garni → Geghard → Yerevan — pagan temple, Lavash masterclass, UNESCO rock-carved church, carpet workshop, farewell dinner
  - Day 8: Departure — Vernissage market, airport transfer

### Pricing (Tour 16 — 7 days)
| Pax | Superior | Standard |
|-----|----------|----------|
| 2   | €3,200   | €2,600   |
| 3   | €2,800   | €2,300   |
| 4   | €2,400   | €2,000   |
| 5   | €2,100   | €1,750   |
| 6   | €1,900   | €1,550   |
Single supplement: €650 / €420

### Pricing (Tour 17 — 8 days)
| Pax | Superior | Standard |
|-----|----------|----------|
| 2   | €3,800   | €3,100   |
| 3   | €3,300   | €2,700   |
| 4   | €2,900   | €2,350   |
| 5   | €2,500   | €2,050   |
| 6   | €2,200   | €1,800   |
Single supplement: €720 / €480

### Included/Excluded (both tours)
- **Included**: Private guide (DE/EN/RU), private luxury vehicle, 4★/3★ hotel, full board, all entrance fees, airport transfers, bottled water, Wi-Fi, wine tasting experiences
- **Excluded**: International flights, travel insurance, personal expenses, alcoholic beverages (except tastings), tips & gratuities

### Translations
- All translations are natural, grammatically correct EN/RU/DE
- Russian uses proper cases and natural phrasing
- German uses proper noun capitalization and correct grammar

## Verification
- `bun run lint` passes with zero errors
- Dev server compiles successfully

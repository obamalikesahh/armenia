# Task 5-a: Tour Data Street View - Work Record

## Summary
Added `streetViewUrl` and `streetViewLocations` fields to the Tour interface and data for all 29 tours in `/home/z/my-project/src/lib/tours-data.ts`.

## Changes Made

### 1. New Interface: `StreetViewLocation`
```typescript
export interface StreetViewLocation {
  name: string;
  lat: number;
  lng: number;
  heading?: number;
  pitch?: number;
}
```

### 2. Updated Tour Interface
Added two new fields:
- `streetViewUrl: string` - Google Maps embed URL for the tour's primary location
- `streetViewLocations: StreetViewLocation[]` - Multiple locations along the tour route

### 3. Data Added for All 29 Tours
Each tour now has:
- A `streetViewUrl` using the format: `https://maps.google.com/maps?q=LAT,LNG&t=k&z=15&ie=UTF8&iwloc=&output=embed`
- A `streetViewLocations` array with 2-6 GPS coordinate locations per tour

### Key Coordinates Used
- Lake Sevan: 40.3495, 45.3315
- Dilijan: 40.7403, 44.8615
- Haghartsin: 40.7767, 44.8792
- Khor Virap: 39.8842, 44.5767
- Noravank: 39.6850, 45.2317
- Garni Temple: 40.1150, 44.7250
- Geghard: 40.1417, 44.7975
- Tatev Monastery: 39.3928, 46.2475
- Haghpat: 41.0947, 44.7217
- Echmiadzin: 40.1653, 44.3417
- Amberd Fortress: 40.3875, 44.2583
- Tsaghkadzor: 40.5317, 44.7017
- Gyumri: 40.7925, 43.8450
- Tbilisi: 41.6938, 44.8014
- Jvari: 41.8386, 44.7269
- Borjomi: 41.8425, 43.3864
- Vardzia: 41.3758, 43.2831
- Mount Aragats: 40.4167, 44.2167
- And many more...

## Verification
- TypeScript compilation passes with no errors in tours-data.ts
- ESLint passes with no errors
- All 29 tours have both `streetViewUrl` and `streetViewLocations` fields
- All existing data preserved unchanged

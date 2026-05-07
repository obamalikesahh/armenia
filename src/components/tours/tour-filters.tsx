'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TOUR_CATEGORIES, TOUR_REGIONS } from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

export interface TourFiltersState {
  category: string
  region: string
  duration: string
  search: string
}

interface TourFiltersProps {
  filters: TourFiltersState
  onFiltersChange: (filters: TourFiltersState) => void
}

const DURATION_OPTIONS = ['all', 'half day', 'full day', 'multi-day'] as const

export function TourFilters({ filters, onFiltersChange }: TourFiltersProps) {
  const { t } = useLocale()

  const updateFilter = <K extends keyof TourFiltersState>(
    key: K,
    value: TourFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearAll = () => {
    onFiltersChange({ category: 'all', region: 'all', duration: 'all', search: '' })
  }

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.region !== 'all' ||
    filters.duration !== 'all' ||
    filters.search !== ''

  const getCategoryLabel = (cat: string) => {
    const key = cat === 'all' ? 'categories.all' : `categories.${cat.toLowerCase()}`
    return t(key)
  }

  const getRegionKey = (region: string): string => {
    const regionMap: Record<string, string> = {
      Yerevan: 'regions.yerevan',
      Gegharkunik: 'regions.gegharkunik',
      'Vayots Dzor': 'regions.vayotsDzor',
      Tavush: 'regions.tavush',
      Lori: 'regions.lori',
      Aragatsotn: 'regions.aragatsotn',
      Kotayk: 'regions.kotayk',
      Armavir: 'regions.armavir',
      Syunik: 'regions.syunik',
      Ararat: 'regions.ararat',
      Shirak: 'regions.shirak',
      Georgia: 'regions.georgia',
    }
    return regionMap[region] || `regions.${region.toLowerCase()}`
  }

  const getDurationLabel = (dur: string) => {
    switch (dur) {
      case 'all':
        return t('categories.all')
      case 'half day':
        return t('tours.halfDay')
      case 'full day':
        return t('tours.fullDay')
      case 'multi-day':
        return t('tours.multiDay')
      default:
        return dur
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6"
      style={{
        backgroundImage:
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      }}
    >
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
        <Input
          placeholder={t('tours.search')}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/20"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter('search', '')}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
          {t('tours.category')}
        </p>
        <div className="flex flex-wrap gap-2">
          {['all', ...TOUR_CATEGORIES].map((cat) => {
            const isActive = filters.category === cat
            return (
              <button
                key={cat}
                onClick={() => updateFilter('category', cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Duration pills */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
          {t('tours.duration')}
        </p>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((dur) => {
            const isActive = filters.duration === dur
            return (
              <button
                key={dur}
                onClick={() => updateFilter('duration', dur)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                {getDurationLabel(dur)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Region filter and clear button row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 sm:min-w-[200px]">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            {t('tours.region')}
          </p>
          <Select
            value={filters.region}
            onValueChange={(value) => updateFilter('region', value)}
          >
            <SelectTrigger className="w-full border-white/10 bg-white/5 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('regions.all')}</SelectItem>
              {TOUR_REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {t(getRegionKey(region))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="mt-5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="mr-1 size-3" />
            {t('tours.clearFilters')}
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.category !== 'all' && (
            <Badge
              variant="secondary"
              className="cursor-pointer border-white/10 bg-white/10 text-white/70 hover:bg-white/20"
              onClick={() => updateFilter('category', 'all')}
            >
              {getCategoryLabel(filters.category)}
              <X className="ml-1 size-3" />
            </Badge>
          )}
          {filters.region !== 'all' && (
            <Badge
              variant="secondary"
              className="cursor-pointer border-white/10 bg-white/10 text-white/70 hover:bg-white/20"
              onClick={() => updateFilter('region', 'all')}
            >
              {t(getRegionKey(filters.region))}
              <X className="ml-1 size-3" />
            </Badge>
          )}
          {filters.duration !== 'all' && (
            <Badge
              variant="secondary"
              className="cursor-pointer border-white/10 bg-white/10 text-white/70 hover:bg-white/20"
              onClick={() => updateFilter('duration', 'all')}
            >
              {getDurationLabel(filters.duration)}
              <X className="ml-1 size-3" />
            </Badge>
          )}
          {filters.search && (
            <Badge
              variant="secondary"
              className="cursor-pointer border-white/10 bg-white/10 text-white/70 hover:bg-white/20"
              onClick={() => updateFilter('search', '')}
            >
              &quot;{filters.search}&quot;
              <X className="ml-1 size-3" />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

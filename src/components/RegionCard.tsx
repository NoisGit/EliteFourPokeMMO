import type { Region } from '../interfaces/Region'

const regionAccent: Record<string, string> = {
  kanto: 'from-red-400/35 to-amber-300/10',
  johto: 'from-yellow-300/35 to-orange-400/10',
  hoenn: 'from-emerald-300/35 to-cyan-400/10',
  sinnoh: 'from-indigo-300/35 to-sky-400/10',
  teselia: 'from-violet-300/35 to-rose-400/10',
}

interface RegionCardProps {
  region: Region
  isExpanded: boolean
  onClick: (regionId: string) => void
}

export const RegionCard = ({ region, isExpanded, onClick }: RegionCardProps) => {
  return (
    <button
      type="button"
      className={`group relative min-w-0 overflow-hidden rounded-xl border p-3 text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-4 ${
        isExpanded
          ? 'border-cyan-200/80 bg-slate-900/95 ring-2 ring-cyan-300/70'
          : 'border-white/10 bg-slate-950/65 hover:border-white/25 hover:bg-slate-900/90'
      }`}
      onClick={() => onClick(region.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${regionAccent[region.id] || 'from-cyan-300/25 to-rose-400/10'} opacity-95`} />
      <div className="relative flex h-16 items-end sm:h-20 lg:h-24">
        <div className="min-w-0">
          <span className="mb-2 block h-1 w-8 rounded-full bg-cyan-200 transition-all duration-300 group-hover:w-14 sm:w-10 sm:group-hover:w-16" />
          <span className="block truncate text-base font-black text-white min-[390px]:text-lg sm:text-xl lg:text-2xl">{region.name}</span>
        </div>
      </div>
    </button>
  )
}

import type { Region } from '../interfaces/Region'

const regionAccent: Record<string, string> = {
  kanto: 'from-red-400/25 to-amber-300/10',
  johto: 'from-yellow-300/25 to-orange-400/10',
  hoenn: 'from-emerald-300/25 to-cyan-400/10',
  sinnoh: 'from-indigo-300/25 to-sky-400/10',
  teselia: 'from-violet-300/25 to-rose-400/10',
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
      className={`group relative min-w-0 overflow-hidden rounded-2xl border p-3 text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-4 ${
        isExpanded
          ? 'border-cyan-200/70 bg-slate-900/90 ring-2 ring-cyan-300/70'
          : 'border-white/10 bg-slate-950/55 hover:border-white/25 hover:bg-slate-900/80'
      }`}
      onClick={() => onClick(region.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${regionAccent[region.id] || 'from-cyan-300/20 to-rose-400/10'} opacity-80`} />
      <div className="relative flex h-14 items-end sm:h-20 lg:h-24">
        <div className="min-w-0">
          <span className="mb-2 block h-1 w-8 rounded-full bg-cyan-200 transition-all duration-300 group-hover:w-14 sm:w-10 sm:group-hover:w-16" />
          <span className="block truncate text-lg font-black text-white sm:text-xl lg:text-2xl">{region.name}</span>
        </div>
      </div>
    </button>
  )
}

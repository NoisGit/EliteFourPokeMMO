import type { ConfigLeader } from '../interfaces/Region'
import { getLocalTrainerSpriteUrl } from '../utils/trainerSprites'

interface LeaderCardProps {
  leader: ConfigLeader
  isExpanded: boolean
  onClick: (leaderId: string) => void
}

export const LeaderCard = ({ leader, isExpanded, onClick }: LeaderCardProps) => {
  const leaderImage = getLocalTrainerSpriteUrl(leader.name)

  return (
    <button
      type="button"
      className={`group relative min-w-0 overflow-hidden rounded-xl border bg-slate-950/75 p-2 text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200/50 hover:bg-slate-900/95 sm:rounded-3xl sm:p-3 ${
        isExpanded
          ? 'border-rose-200/80 ring-2 ring-rose-300/70'
          : 'border-white/10'
      }`}
      onClick={() => onClick(leader.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400/25 via-transparent to-cyan-300/15 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-black/20 min-[420px]:h-28 sm:h-32 lg:h-36">
        <img
          src={leaderImage}
          alt={leader.name}
          className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span className="relative mt-2 block truncate rounded-lg bg-black/55 px-2 py-1.5 text-center text-xs font-black text-white sm:rounded-xl sm:text-sm lg:text-base">
        {leader.name}
      </span>
    </button>
  )
}

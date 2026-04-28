import type { ConfigLeader } from '../interfaces/Region'

interface LeaderCardProps {
  leader: ConfigLeader
  isExpanded: boolean
  onClick: (leaderId: string) => void
  trimWhiteFrame?: boolean
}

export const LeaderCard = ({ leader, isExpanded, onClick, trimWhiteFrame = false }: LeaderCardProps) => {
  const leaderImage = `${import.meta.env.BASE_URL}images/lideres/${leader.name.toLowerCase().replace(/ /g, '_')}.png`

  return (
    <button
      type="button"
      className={`group relative min-w-0 overflow-hidden rounded-3xl border bg-slate-950/60 p-3 text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200/40 hover:bg-slate-900/90 ${
        isExpanded
          ? 'scale-[1.03] border-rose-200/70 ring-2 ring-rose-300/70'
          : 'border-white/10'
      }`}
      onClick={() => onClick(leader.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400/15 via-transparent to-cyan-300/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl sm:h-28">
        <img
          src={leaderImage}
          alt={leader.name}
          className={`max-h-24 w-full object-contain drop-shadow-lg transition-transform duration-300 sm:max-h-28 ${
            trimWhiteFrame
              ? 'scale-[1.1] group-hover:scale-[1.16]'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
      </div>
      <span className="relative mt-2 block truncate rounded-xl bg-black/35 px-2 py-1 text-center text-sm font-black text-white sm:text-base">
        {leader.name}
      </span>
    </button>
  )
}

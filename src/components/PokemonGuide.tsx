import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

import type { Pokemon } from "../interfaces/Pokemon"
import type { Region } from "../interfaces/Region"
import type { Language } from "../i18n/translations"

import { languages, translations } from "../i18n/translations"
import { validatePokemonStrategy } from "../utils/strategyValidation"
import { useDynamicImports } from "../hooks/useDynamicImports"
import { RegionCard } from "./RegionCard"
import { LeaderCard } from "./LeaderCard"
import { PokemonCard } from "./PokemonCard"
import { PokemonDetails } from "./PokemonDetails"

const TEAM_PASTE_URL = 'https://pokepast.es/e356ee22f26cf6dc'

export default function PokemonGuide() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [showTips, setShowTips] = useState(false)
  const [language, setLanguage] = useState<Language>('es')
  const [regions, setRegions] = useState<Region[]>([])
  const [pokemonDataLoaded, setPokemonDataLoaded] = useState(false)
  const { getPokemonFiles } = useDynamicImports()
  const t = translations[language]

  useEffect(() => {
    const loadRegionConfig = async () => {
      try {
        const regionConfigModule = await import('../data/config-region.json')
        setRegions(regionConfigModule.regions || [])
      } catch (error) {
        console.error('Error loading region config:', error)
      }
    }

    loadRegionConfig()
  }, [])

  useEffect(() => {
    const loadPokemonData = async () => {
      if (regions.length === 0 || pokemonDataLoaded) return

      const updatedRegions = []

      for (const region of regions) {
        const updatedLeaders = []

        for (const leader of region.leaders) {
          try {
            const pokemonFiles = await getPokemonFiles(region.id, leader.id)
            const pokemons = []

            for (const file of pokemonFiles) {
              try {
                const module = await import(`../data/${region.id}/${leader.id}/${file.replace('.json', '')}.json`)
                const data = module.default || module

                pokemons.push(validatePokemonStrategy(data, {
                  regionId: region.id,
                  leaderId: leader.id,
                  fileName: file,
                }))
              } catch (error) {
                console.error(`Error importing ${file}:`, error)
              }
            }

            updatedLeaders.push({
              ...leader,
              pokemons,
            })
          } catch (error) {
            console.error(`Error loading pokemon data for ${leader.name}:`, error)
            updatedLeaders.push({
              ...leader,
              pokemons: [],
            })
          }
        }

        updatedRegions.push({
          ...region,
          leaders: updatedLeaders,
        })
      }

      setRegions(updatedRegions)
      setPokemonDataLoaded(true)
    }

    loadPokemonData()
  }, [regions, pokemonDataLoaded])

  const handleRegionClick = (regionId: string) => {
    if (expandedRegion === regionId) {
      setExpandedRegion(null)
      setExpandedLeader(null)
      setSelectedPokemon(null)
      return
    }

    setExpandedRegion(regionId)
    setExpandedLeader(null)
    setSelectedPokemon(null)
  }

  const handleLeaderClick = (leaderId: string) => {
    if (expandedLeader === leaderId) {
      setExpandedLeader(null)
      setSelectedPokemon(null)
      return
    }

    setExpandedLeader(leaderId)
    setSelectedPokemon(null)
  }

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(selectedPokemon?.id === pokemon.id ? null : pokemon)
  }

  const currentRegion = regions.find((region) => region.id === expandedRegion)
  const currentLeader = currentRegion?.leaders.find((leader) => leader.id === expandedLeader)
  const currentLeaderPokemons = currentLeader?.pokemons || []

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b1020] text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.22),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_28%),linear-gradient(135deg,_#0b1020_0%,_#111827_45%,_#1e1b4b_100%)]" />

      <main className="relative mx-auto min-h-screen w-full max-w-7xl px-2 py-3 sm:px-5 sm:py-6 lg:px-8">
        <section className="mb-4 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.08] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:mb-8 sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <span className="mb-3 inline-flex max-w-full rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-rose-100 sm:text-xs sm:tracking-[0.24em]">
                PokeMMO Elite Four
              </span>
              <h1 className="break-words text-2xl font-black leading-tight tracking-tight text-white min-[380px]:text-3xl sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3 sm:w-auto sm:min-w-48">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.2em]">{t.languageLabel}</span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(languages) as Language[]).map((currentLanguage) => (
                  <button
                    key={currentLanguage}
                    type="button"
                    onClick={() => setLanguage(currentLanguage)}
                    className={`rounded-xl px-3 py-2 text-sm font-bold transition-all duration-300 sm:px-4 ${
                      language === currentLanguage
                        ? 'bg-rose-400 text-slate-950 shadow-lg shadow-rose-500/25'
                        : 'bg-white/10 text-slate-200 hover:bg-white/15'
                    }`}
                  >
                    {languages[currentLanguage]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:mt-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 sm:p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs sm:tracking-[0.2em]">{t.routeLabel}</p>
              <p className="mt-2 break-words text-base font-black text-white sm:text-lg">{t.route}</p>
            </div>
            <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-3 sm:p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-rose-100 sm:text-xs sm:tracking-[0.2em]">{t.teamLabel}</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-base font-black text-white sm:text-lg">{t.teamTitle}</p>
                  <p className="mt-1 text-sm leading-5 text-rose-50/80">{t.teamDescription}</p>
                </div>
                <a
                  href={TEAM_PASTE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full flex-none items-center justify-center gap-2 rounded-xl bg-rose-300 px-4 py-2 text-sm font-black text-slate-950 transition-all duration-300 hover:bg-rose-200 sm:w-auto"
                >
                  {t.teamButton}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-2xl border border-white/10 bg-slate-950/45 p-2.5 backdrop-blur-xl sm:mb-6 sm:rounded-3xl sm:p-4">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-white/5"
          >
            <span className="min-w-0">
              <span className="block text-xs font-black uppercase tracking-[0.16em] text-rose-100 sm:tracking-[0.18em]">{t.tipsTitle}</span>
              <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-xs sm:tracking-[0.16em]">{t.tipsBadge}</span>
            </span>
            {showTips ? <ChevronUp className="h-5 w-5 flex-none text-rose-200" /> : <ChevronDown className="h-5 w-5 flex-none text-rose-200" />}
          </button>

          {showTips && (
            <div className="grid gap-3 pt-3 md:grid-cols-[1.2fr_0.8fr] md:gap-4 md:pt-4 animate-in slide-in-from-top duration-300">
              <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-slate-200 sm:p-4">
                {t.tips.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-rose-300" />
                    <span className="min-w-0 break-words">{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 sm:p-4">
                <h2 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-amber-100 sm:text-sm sm:tracking-[0.18em]">{t.boostLegendTitle}</h2>
                <ul className="space-y-2 text-sm leading-6 text-amber-50">
                  {t.boostLegend.map((item) => (
                    <li key={item} className="break-words">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className="mb-5 sm:mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectRegion}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-2.5 sm:gap-3">
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isExpanded={expandedRegion === region.id}
                onClick={handleRegionClick}
              />
            ))}
          </div>
        </section>

        {expandedRegion && currentRegion && currentRegion.leaders.length > 0 && (
          <section className="mb-5 animate-in slide-in-from-top duration-300 sm:mb-6">
            <h2 className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectLeader}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:gap-3">
              {currentRegion.leaders.map((leader) => (
                <LeaderCard
                  key={leader.id}
                  leader={leader}
                  isExpanded={expandedLeader === leader.id}
                  onClick={handleLeaderClick}
                />
              ))}
            </div>
          </section>
        )}

        {expandedLeader && (
          <section className="mb-5 animate-in slide-in-from-top duration-300 sm:mb-6">
            <h2 className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectPokemon}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(86px,1fr))] gap-2 sm:grid-cols-[repeat(auto-fit,minmax(105px,1fr))] sm:gap-3 lg:grid-cols-[repeat(auto-fit,minmax(115px,1fr))]">
              {currentLeaderPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id || pokemon.name}
                  pokemon={pokemon}
                  isSelected={selectedPokemon?.id === pokemon.id}
                  onClick={handlePokemonClick}
                />
              ))}
            </div>
          </section>
        )}

        {selectedPokemon && (
          <PokemonDetails pokemon={selectedPokemon} language={language} labels={t} />
        )}
      </main>
    </div>
  )
}

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { gsap } from "gsap"

import type { Pokemon } from "../interfaces/Pokemon"
import type { Region } from "../interfaces/Region"
import type { Language } from "../i18n/translations"

import { translations } from "../i18n/translations"
import leagueFarmBanner from "../assets/league-farm-banner.png"
import { validatePokemonStrategy } from "../utils/strategyValidation"
import { useDynamicImports } from "../hooks/useDynamicImports"
import { RegionCard } from "./RegionCard"
import { LeaderCard } from "./LeaderCard"
import { PokemonCard } from "./PokemonCard"
import { PokemonDetails } from "./PokemonDetails"

const TEAM_PASTE_URL = 'https://pokepast.es/e356ee22f26cf6dc'
const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]

const prefersReducedMotion = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

export default function PokemonGuide() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [showTips, setShowTips] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [language, setLanguage] = useState<Language>('es')
  const [regions, setRegions] = useState<Region[]>([])
  const [pokemonDataLoaded, setPokemonDataLoaded] = useState(false)
  const pageRef = useRef<HTMLDivElement | null>(null)
  const strategyDetailsRef = useRef<HTMLDivElement | null>(null)
  const teamModalRef = useRef<HTMLDivElement | null>(null)
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

  useEffect(() => {
    if (!pokemonDataLoaded || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-orb',
        { autoAlpha: 0, scale: 0.45 },
        { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power3.out', stagger: 0.16 },
      )

      gsap.to('.gsap-orb-primary', {
        x: 44,
        y: -32,
        scale: 1.14,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.gsap-orb-secondary', {
        x: -38,
        y: 34,
        scale: 1.1,
        duration: 6.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.gsap-orb-tertiary', {
        x: 28,
        y: 42,
        scale: 1.18,
        duration: 7.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.fromTo(
        '.gsap-hero',
        { autoAlpha: 0, y: 72, scale: 0.9, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      )

      gsap.to('.gsap-banner-image', {
        y: -10,
        scale: 1.018,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      })

      gsap.fromTo(
        '.gsap-tips',
        { autoAlpha: 0, y: 38, scale: 0.94, filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out', delay: 0.18 },
      )

      gsap.fromTo(
        '.gsap-section-title',
        { autoAlpha: 0, x: -18 },
        { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power2.out', delay: 0.36 },
      )

      gsap.fromTo(
        '.gsap-region-card',
        { autoAlpha: 0, y: 64, scale: 0.74, rotation: -4, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.72,
          ease: 'back.out(1.85)',
          stagger: 0.09,
          delay: 0.42,
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [pokemonDataLoaded])

  useEffect(() => {
    if (!expandedRegion || prefersReducedMotion()) return

    const animationTimeout = window.setTimeout(() => {
      const leaderCards = pageRef.current?.querySelectorAll('.gsap-leader-card')
      if (!leaderCards?.length) return

      gsap.fromTo(
        leaderCards,
        { autoAlpha: 0, y: 62, scale: 0.72, rotation: 3, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.62,
          ease: 'back.out(1.7)',
          stagger: 0.07,
        },
      )
    }, 80)

    return () => window.clearTimeout(animationTimeout)
  }, [expandedRegion])

  useEffect(() => {
    if (!expandedLeader || prefersReducedMotion()) return

    const animationTimeout = window.setTimeout(() => {
      const pokemonCards = pageRef.current?.querySelectorAll('.gsap-pokemon-card')
      if (!pokemonCards?.length) return

      gsap.fromTo(
        pokemonCards,
        { autoAlpha: 0, y: 44, scale: 0.68, rotation: -5, filter: 'blur(6px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.48,
          ease: 'back.out(1.9)',
          stagger: 0.032,
        },
      )
    }, 80)

    return () => window.clearTimeout(animationTimeout)
  }, [expandedLeader])

  useEffect(() => {
    if (!selectedPokemon) return

    const scrollTimeout = window.setTimeout(() => {
      strategyDetailsRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      })

      if (!prefersReducedMotion() && strategyDetailsRef.current) {
        gsap.fromTo(
          strategyDetailsRef.current,
          { autoAlpha: 0, y: 48, scale: 0.92, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.58, ease: 'back.out(1.45)' },
        )
      }
    }, 80)

    return () => window.clearTimeout(scrollTimeout)
  }, [selectedPokemon])

  useEffect(() => {
    if (!showTeamModal) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTeamModal(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    if (!prefersReducedMotion()) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.gsap-modal-backdrop',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.28, ease: 'power2.out' },
        )

        gsap.fromTo(
          '.gsap-team-modal',
          { autoAlpha: 0, y: 52, scale: 0.86, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.46, ease: 'back.out(1.65)' },
        )
      }, teamModalRef)

      return () => {
        ctx.revert()
        document.body.style.overflow = previousOverflow
        document.removeEventListener('keydown', handleKeyDown)
      }
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showTeamModal])

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
    <div ref={pageRef} className="min-h-screen overflow-x-hidden bg-[#0b1020] text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.28),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.22),_transparent_30%),linear-gradient(135deg,_#070b18_0%,_#111827_45%,_#21174c_100%)]" />
      <div className="gsap-orb gsap-orb-primary pointer-events-none fixed -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="gsap-orb gsap-orb-secondary pointer-events-none fixed -right-20 top-56 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
      <div className="gsap-orb gsap-orb-tertiary pointer-events-none fixed bottom-8 left-1/3 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl" />

      <main className="relative mx-auto min-h-screen w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-6 lg:px-8">
        <section className="gsap-hero mb-4 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:mb-7 sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <span className="mb-3 inline-flex max-w-full rounded-full border border-cyan-200/40 bg-cyan-300/15 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100 sm:text-xs sm:tracking-[0.24em]">
                PokeMMO Elite Four
              </span>
              <h1 className="sr-only">{t.title}</h1>
              <div className="flex w-full justify-start">
                <img
                  src={leagueFarmBanner}
                  alt={t.title}
                  className="gsap-banner-image h-auto w-full max-w-[34rem] object-contain drop-shadow-[0_18px_35px_rgba(8,13,31,0.55)] sm:max-w-[40rem]"
                />
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <div className="flex w-full max-w-[12.5rem] items-center justify-between gap-2 self-start rounded-full border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-md sm:w-auto sm:max-w-none">
              <span className="pl-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-slate-300 sm:text-[0.68rem]">
                {t.languageLabel}
              </span>
              <div className="flex rounded-full bg-slate-950/65 p-0.5">
                {LANGUAGE_OPTIONS.map((currentLanguage) => (
                  <button
                    key={currentLanguage.value}
                    type="button"
                    onClick={() => setLanguage(currentLanguage.value)}
                    aria-label={`Change language to ${currentLanguage.label}`}
                    className={`rounded-full px-2.5 py-1 text-[0.7rem] font-black leading-none transition-all duration-300 sm:px-3 sm:text-xs ${
                      language === currentLanguage.value
                        ? 'bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/25'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {currentLanguage.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
            <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 sm:p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-xs sm:tracking-[0.2em]">{t.routeLabel}</p>
              <p className="mt-2 break-words text-base font-black text-white sm:text-lg">{t.route}</p>
            </div>
            <div className="rounded-2xl border border-rose-300/30 bg-rose-300/10 p-3 sm:p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-rose-100 sm:text-xs sm:tracking-[0.2em]">{t.teamLabel}</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-base font-black text-white sm:text-lg">{t.teamTitle}</p>
                  <p className="mt-1 text-sm leading-5 text-rose-50/80">{t.teamDescription}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTeamModal(true)}
                  className="inline-flex w-full flex-none items-center justify-center gap-2 rounded-xl bg-rose-300 px-4 py-2 text-sm font-black text-slate-950 transition-all duration-300 hover:bg-rose-200 sm:w-auto"
                >
                  {t.teamButton}
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="gsap-tips mb-4 rounded-2xl border border-white/15 bg-slate-950/60 p-2.5 backdrop-blur-xl sm:mb-6 sm:rounded-3xl sm:p-4">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/5 sm:rounded-2xl"
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

        <section className="mb-4 sm:mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="gsap-section-title text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectRegion}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
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
          <section className="mb-4 animate-in slide-in-from-top duration-300 sm:mb-6">
            <h2 className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectLeader}</h2>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
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
          <section className="mb-4 animate-in slide-in-from-top duration-300 sm:mb-6">
            <h2 className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">{t.selectPokemon}</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 xl:grid-cols-8">
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
          <div ref={strategyDetailsRef} className="scroll-mt-4 sm:scroll-mt-6">
            <PokemonDetails pokemon={selectedPokemon} language={language} labels={t} />
          </div>
        )}
      </main>

      {showTeamModal && (
        <div ref={teamModalRef} className="gsap-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-md sm:p-5">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setShowTeamModal(false)}
          />

          <section className="gsap-team-modal relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-slate-950 shadow-2xl shadow-black/60 sm:rounded-[2rem]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="truncate text-base font-black text-white sm:text-lg">{t.teamTitle}</p>
                <p className="mt-0.5 truncate text-xs font-bold text-slate-400">{TEAM_PASTE_URL}</p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <a
                  href={TEAM_PASTE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center justify-center gap-2 rounded-xl bg-rose-300 px-3 py-2 text-xs font-black text-slate-950 transition-all duration-300 hover:bg-rose-200 sm:inline-flex"
                >
                  {t.teamButton}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl font-black leading-none text-white transition-all duration-300 hover:bg-white/20"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="h-[72vh] min-h-[26rem] bg-white">
              <iframe
                src={TEAM_PASTE_URL}
                title={t.teamTitle}
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

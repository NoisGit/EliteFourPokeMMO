import { useEffect, useState } from 'react'

const ENTRY_INTRO_SESSION_KEY = 'elitefour-entry-intro-seen'

export const EntryIntro = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeenIntro = window.sessionStorage.getItem(ENTRY_INTRO_SESSION_KEY)

    if (shouldReduceMotion || hasSeenIntro === 'true') return

    setIsVisible(true)
    window.sessionStorage.setItem(ENTRY_INTRO_SESSION_KEY, 'true')

    const timeout = window.setTimeout(() => setIsVisible(false), 2800)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) return null

  return (
    <div className="entry-intro fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="entry-intro__aura" />
      <div className="entry-intro__burst" />
      <div className="entry-intro__rays">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} style={{ transform: `rotate(${index * 45}deg)` }} />
        ))}
      </div>

      <div className="entry-intro__ball" aria-hidden="true">
        <div className="entry-intro__shell entry-intro__shell--top" />
        <div className="entry-intro__shell entry-intro__shell--bottom" />
        <div className="entry-intro__line" />
        <div className="entry-intro__button" />
      </div>

      <style>{`
        .entry-intro { animation: entryIntroFade .35s ease 2.45s forwards; }
        .entry-intro__aura,
        .entry-intro__burst,
        .entry-intro__rays { position: absolute; border-radius: 9999px; }
        .entry-intro__aura {
          width: min(76vw, 28rem); height: min(76vw, 28rem);
          background: radial-gradient(circle, rgba(34,211,238,.22), rgba(244,63,94,.1) 42%, transparent 68%);
          filter: blur(.42rem); animation: entryAura 2.6s ease-out forwards;
        }
        .entry-intro__burst {
          width: min(48vw, 13rem); height: min(48vw, 13rem); opacity: 0; transform: scale(.18);
          background: radial-gradient(circle, rgba(255,255,255,.94), rgba(125,211,252,.38) 30%, transparent 70%);
          animation: entryBurst 2.6s ease-out forwards;
        }
        .entry-intro__rays { width: min(58vw, 16rem); height: min(58vw, 16rem); opacity: 0; animation: entryRays 2.6s ease-out forwards; }
        .entry-intro__rays span {
          position: absolute; left: 50%; top: 50%; width: .12rem; height: 44%; transform-origin: 50% 0;
          border-radius: 9999px; background: linear-gradient(to bottom, rgba(255,255,255,.88), rgba(34,211,238,.24), transparent);
        }
        .entry-intro__ball {
          position: relative; width: clamp(6.5rem, 24vw, 8.8rem); height: clamp(6.5rem, 24vw, 8.8rem);
          filter: drop-shadow(0 1.25rem 2rem rgba(0,0,0,.55)); animation: entryBall 2.6s cubic-bezier(.22,1,.36,1) forwards;
        }
        .entry-intro__shell {
          position: absolute; left: 0; width: 100%; height: 50%; overflow: hidden; border: .34rem solid #0f172a;
        }
        .entry-intro__shell--top {
          top: 0; border-bottom: .2rem solid #0f172a; border-radius: 9999px 9999px 0 0;
          background: radial-gradient(circle at 30% 22%, rgba(255,255,255,.78), transparent 17%), linear-gradient(145deg, #ff7777 0%, #ef4444 52%, #b91c1c 100%);
          animation: entryTopOpen 2.6s cubic-bezier(.22,1,.36,1) forwards;
        }
        .entry-intro__shell--bottom {
          bottom: 0; border-top: .2rem solid #0f172a; border-radius: 0 0 9999px 9999px;
          background: radial-gradient(circle at 34% 28%, rgba(255,255,255,.86), transparent 18%), linear-gradient(145deg, #fff 0%, #f3f4f6 48%, #cbd5e1 100%);
          animation: entryBottomOpen 2.6s cubic-bezier(.22,1,.36,1) forwards;
        }
        .entry-intro__line {
          position: absolute; left: 2.5%; top: 44%; z-index: 3; width: 95%; height: 12%; border-radius: 9999px;
          background: #0f172a; animation: entryLineFade 2.6s ease-out forwards;
        }
        .entry-intro__button {
          position: absolute; left: 50%; top: 50%; z-index: 4; width: 29%; height: 29%; border: .32rem solid #0f172a;
          border-radius: 9999px; background: radial-gradient(circle, #fff 0 42%, #dbeafe 43% 100%);
          transform: translate(-50%, -50%); animation: entryButton 2.6s ease-out forwards;
        }
        @keyframes entryBall {
          0% { opacity: 0; transform: translateY(-9rem) scale(.6) rotate(-20deg); }
          18% { opacity: 1; transform: translateY(.75rem) scale(1.02) rotate(10deg); }
          27% { transform: translateY(-.55rem) scale(.98) rotate(-7deg); }
          36% { transform: translateY(.28rem) scale(1.01) rotate(5deg); }
          45%, 62% { transform: translateY(0) scale(1) rotate(0deg); }
          78% { transform: translateY(0) scale(1.04) rotate(0deg); }
          100% { opacity: 0; transform: translateY(0) scale(1.45) rotate(0deg); }
        }
        @keyframes entryTopOpen {
          0%, 64% { transform: translateY(0) rotate(0deg); opacity: 1; }
          78% { transform: translateY(-1.35rem) rotate(-13deg); opacity: 1; }
          100% { transform: translateY(-3.8rem) rotate(-22deg); opacity: 0; }
        }
        @keyframes entryBottomOpen {
          0%, 64% { transform: translateY(0) rotate(0deg); opacity: 1; }
          78% { transform: translateY(1.35rem) rotate(13deg); opacity: 1; }
          100% { transform: translateY(3.8rem) rotate(22deg); opacity: 0; }
        }
        @keyframes entryLineFade { 0%, 66% { opacity: 1; transform: scaleX(1); } 84%, 100% { opacity: 0; transform: scaleX(.45); } }
        @keyframes entryButton {
          0%, 50% { box-shadow: 0 0 0 rgba(255,255,255,0); transform: translate(-50%,-50%) scale(1); opacity: 1; }
          61% { box-shadow: 0 0 1rem rgba(255,255,255,.75); transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
          78% { box-shadow: 0 0 1.1rem rgba(255,255,255,.8); transform: translate(-50%,-50%) scale(1.22); opacity: 1; }
          100% { box-shadow: 0 0 0 rgba(255,255,255,0); transform: translate(-50%,-50%) scale(.35); opacity: 0; }
        }
        @keyframes entryBurst { 0%, 62% { opacity: 0; transform: scale(.18); } 78% { opacity: .72; transform: scale(.72); } 100% { opacity: 0; transform: scale(1.32); } }
        @keyframes entryRays { 0%, 66% { opacity: 0; transform: scale(.55) rotate(0deg); } 82% { opacity: .5; transform: scale(.9) rotate(8deg); } 100% { opacity: 0; transform: scale(1.14) rotate(14deg); } }
        @keyframes entryAura { 0% { opacity: 0; transform: scale(.6); } 24% { opacity: .58; transform: scale(.9); } 70% { opacity: .62; transform: scale(1); } 100% { opacity: 0; transform: scale(1.12); } }
        @keyframes entryIntroFade { to { opacity: 0; visibility: hidden; } }
        @media (prefers-reduced-motion: reduce) { .entry-intro { display: none; } }
      `}</style>
    </div>
  )
}

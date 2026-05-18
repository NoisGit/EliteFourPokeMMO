import { useEffect, useState } from 'react'

export const EntryIntro = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 2550)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) return null

  return (
    <div className="entry-intro fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="entry-intro__aura" />
      <div className="entry-intro__burst" />
      <div className="entry-intro__rays">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} style={{ transform: `rotate(${index * 30}deg)` }} />
        ))}
      </div>

      <div className="entry-intro__ball" aria-hidden="true">
        <div className="entry-intro__shell entry-intro__shell--top" />
        <div className="entry-intro__shell entry-intro__shell--bottom" />
        <div className="entry-intro__line" />
        <div className="entry-intro__button" />
      </div>

      <style>{`
        .entry-intro {
          animation: entryIntroFade 0.35s ease 2.18s forwards;
        }

        .entry-intro__aura {
          position: absolute;
          width: min(84vw, 30rem);
          height: min(84vw, 30rem);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.3), rgba(244, 63, 94, 0.14) 42%, transparent 68%);
          filter: blur(0.45rem);
          animation: entryAura 2.35s ease-out forwards;
        }

        .entry-intro__burst {
          position: absolute;
          width: min(64vw, 18rem);
          height: min(64vw, 18rem);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.98), rgba(125, 211, 252, 0.55) 26%, rgba(244, 63, 94, 0.18) 55%, transparent 72%);
          opacity: 0;
          transform: scale(0.18);
          animation: entryBurst 2.35s ease-out forwards;
        }

        .entry-intro__rays {
          position: absolute;
          width: min(86vw, 26rem);
          height: min(86vw, 26rem);
          opacity: 0;
          animation: entryRays 2.35s ease-out forwards;
        }

        .entry-intro__rays span {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0.16rem;
          height: 50%;
          transform-origin: 50% 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.96), rgba(34,211,238,0.38), transparent);
          border-radius: 9999px;
        }

        .entry-intro__ball {
          position: relative;
          width: clamp(6rem, 24vw, 8.5rem);
          height: clamp(6rem, 24vw, 8.5rem);
          filter: drop-shadow(0 1.5rem 2.5rem rgba(0, 0, 0, 0.55));
          animation: entryBall 2.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .entry-intro__shell {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          overflow: hidden;
          border: 0.34rem solid #0f172a;
          background-repeat: no-repeat;
        }

        .entry-intro__shell--top {
          top: 0;
          border-bottom: 0.2rem solid #0f172a;
          border-radius: 9999px 9999px 0 0;
          background: radial-gradient(circle at 32% 24%, rgba(255,255,255,0.78), transparent 18%), linear-gradient(145deg, #fb7185 0%, #ef4444 48%, #b91c1c 100%);
          animation: entryTopOpen 2.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .entry-intro__shell--bottom {
          bottom: 0;
          border-top: 0.2rem solid #0f172a;
          border-radius: 0 0 9999px 9999px;
          background: radial-gradient(circle at 34% 30%, rgba(255,255,255,0.88), transparent 18%), linear-gradient(145deg, #ffffff 0%, #e5e7eb 52%, #cbd5e1 100%);
          animation: entryBottomOpen 2.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .entry-intro__line {
          position: absolute;
          left: 2.5%;
          top: 44%;
          z-index: 3;
          width: 95%;
          height: 12%;
          border-radius: 9999px;
          background: #0f172a;
          animation: entryLineFade 2.35s ease-out forwards;
        }

        .entry-intro__button {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 4;
          width: 28%;
          height: 28%;
          border: 0.32rem solid #0f172a;
          border-radius: 9999px;
          background: radial-gradient(circle, #ffffff 0 42%, #dbeafe 43% 100%);
          transform: translate(-50%, -50%);
          animation: entryButton 2.35s ease-out forwards;
        }

        @keyframes entryBall {
          0% { opacity: 0; transform: translateY(-3rem) scale(0.55) rotate(-22deg); }
          18% { opacity: 1; transform: translateY(0) scale(1) rotate(10deg); }
          34% { transform: translateY(0) scale(0.95) rotate(-8deg); }
          48% { transform: translateY(0) scale(1.04) rotate(5deg); }
          60% { transform: translateY(0) scale(1) rotate(0deg); }
          76% { transform: translateY(0) scale(1.06) rotate(0deg); }
          100% { opacity: 0; transform: translateY(0) scale(1.7) rotate(0deg); }
        }

        @keyframes entryTopOpen {
          0%, 58% { transform: translateY(0) rotate(0deg); }
          74% { transform: translateY(-1.1rem) rotate(-12deg); }
          100% { transform: translateY(-4.5rem) rotate(-24deg); opacity: 0; }
        }

        @keyframes entryBottomOpen {
          0%, 58% { transform: translateY(0) rotate(0deg); }
          74% { transform: translateY(1.1rem) rotate(12deg); }
          100% { transform: translateY(4.5rem) rotate(24deg); opacity: 0; }
        }

        @keyframes entryLineFade {
          0%, 60% { opacity: 1; transform: scaleX(1); }
          78%, 100% { opacity: 0; transform: scaleX(0.4); }
        }

        @keyframes entryButton {
          0%, 48% { box-shadow: 0 0 0 rgba(255,255,255,0); transform: translate(-50%, -50%) scale(1); }
          58% { box-shadow: 0 0 1.5rem rgba(255,255,255,0.9); transform: translate(-50%, -50%) scale(1.08); }
          76% { opacity: 1; transform: translate(-50%, -50%) scale(1.35); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
        }

        @keyframes entryBurst {
          0%, 54% { opacity: 0; transform: scale(0.18); }
          70% { opacity: 1; transform: scale(0.75); }
          86% { opacity: 0.95; transform: scale(1.22); }
          100% { opacity: 0; transform: scale(2); }
        }

        @keyframes entryRays {
          0%, 58% { opacity: 0; transform: scale(0.35) rotate(0deg); }
          76% { opacity: 0.95; transform: scale(0.8) rotate(10deg); }
          100% { opacity: 0; transform: scale(1.55) rotate(28deg); }
        }

        @keyframes entryAura {
          0% { opacity: 0; transform: scale(0.5); }
          24% { opacity: 0.75; transform: scale(0.85); }
          76% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.45); }
        }

        @keyframes entryIntroFade {
          to { opacity: 0; visibility: hidden; }
        }

        @media (prefers-reduced-motion: reduce) {
          .entry-intro { display: none; }
        }
      `}</style>
    </div>
  )
}

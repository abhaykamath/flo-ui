import { useState } from 'react'
import { Link } from 'react-router'
import { Flame } from 'lucide-react'
import logoSrc from '@/assets/logo.svg'
import { GuestProfileDialog } from './GuestProfileDialog'

interface NavProps {
  streakCount: number
  streakLogged: boolean
}

export function Nav({ streakCount, streakLogged }: NavProps) {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-[1.5px] border-border bg-paper/[0.92] px-8 py-[0.8rem] backdrop-blur-[14px]">
        <Link to="/home" className="flex items-center gap-[9px] no-underline">
          <img src={logoSrc} width="30" height="30" alt="Flo logo" />
          <span className="font-serif text-[1.3rem] font-bold tracking-[-0.5px] text-ink">Flo</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-[5px] rounded-full border-[1.5px] border-lemon-2 bg-lemon-pale px-3 py-[0.3rem] font-sans text-[0.72rem] font-bold text-ink-2">
            <Flame size={13} className="text-lemon" fill="currentColor" />
            Day {streakCount}{streakLogged ? ' ✓' : ''}
          </div>

          <button
            onClick={() => setProfileOpen(true)}
            className="flex size-8 items-center justify-center rounded-full border-[1.5px] border-sage-2 bg-sage-pale font-sans text-[0.7rem] font-bold text-sage transition-colors hover:bg-sage-2/30"
            title="Guest profile"
          >
            G
          </button>
        </div>
      </nav>

      <GuestProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        streakCount={streakCount}
      />
    </>
  )
}

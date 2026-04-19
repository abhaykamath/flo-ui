import { useState } from 'react'
import { Outlet } from 'react-router'

import { Nav } from './components/Nav'
import { GuestBanner } from './components/GuestBanner'

export interface AppLayoutContext {
  streakLogged: boolean
  setStreakLogged: React.Dispatch<React.SetStateAction<boolean>>
  bannerVisible: boolean
}

export default function AppLayout() {
  const [streakLogged, setStreakLogged] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper">
      <Nav
        streakCount={1}
        streakLogged={streakLogged}
      />

      {bannerVisible && (
        <GuestBanner
          onDismiss={() => setBannerVisible(false)}
        />
      )}

      <Outlet context={{ streakLogged, setStreakLogged, bannerVisible } satisfies AppLayoutContext} />
    </div>
  )
}

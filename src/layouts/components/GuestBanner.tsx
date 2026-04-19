interface GuestBannerProps {
  onDismiss: () => void
}

export function GuestBanner({ onDismiss }: GuestBannerProps) {
  return (
    <div className="animate-slide-down fixed inset-x-0 top-(--nav-height) z-40 flex items-center gap-4 bg-ink px-8 py-[0.55rem]">
      <div className="flex items-center gap-[0.6rem]">
        <div className="animate-blink size-[7px] shrink-0 rounded-full bg-lemon" />
        <p className="font-sans text-[0.75rem] font-normal text-paper/75">
          <strong className="font-semibold text-paper">You're in guest mode.</strong>{' '}
          Your data lives here for now — choose where to save it before you leave.
        </p>
      </div>

      <div className="flex-1" />

      <button
        className="shrink-0 whitespace-nowrap rounded-full border border-lemon/30 bg-lemon/[0.12] px-[0.8rem] py-[0.28rem] font-sans text-[0.72rem] font-semibold text-lemon transition-colors hover:bg-lemon/20"
      >
        Choose storage →
      </button>

      <button
        onClick={onDismiss}
        className="shrink-0 cursor-pointer px-1 text-[1rem] leading-none text-paper/35 transition-colors hover:text-paper/70"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}

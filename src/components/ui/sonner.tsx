import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CircleCheckIcon className="size-4 text-sage" />,
        info:    <InfoIcon className="size-4 text-lavend" />,
        warning: <TriangleAlertIcon className="size-4 text-lemon" />,
        error:   <OctagonXIcon className="size-4 text-rose" />,
        loading: <Loader2Icon className="size-4 text-ink-3 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group/toast !font-sans !text-sm !text-ink !bg-white !border !border-[rgba(42,33,24,0.10)] !rounded-2xl !shadow-[0_6px_20px_rgba(42,33,24,0.08)] !px-4 !py-3",
          title:       "!font-semibold !text-ink",
          description: "!text-ink-2 !text-xs",
          actionButton:
            "!bg-ink !text-paper !font-sans !text-xs !font-semibold !rounded-lg",
          cancelButton:
            "!bg-paper-2 !text-ink-2 !font-sans !text-xs !font-semibold !rounded-lg",
          closeButton:
            "!border-border !bg-background !text-ink-3 hover:!text-ink",
          success: "!border-[rgba(143,184,154,0.35)] !bg-[#E8F2EA]",
          error:   "!border-[rgba(212,144,154,0.35)] !bg-[#F8ECEE]",
          warning: "!border-[rgba(212,196,74,0.35)]  !bg-[#F8F5DC]",
          info:    "!border-[rgba(180,168,212,0.35)] !bg-[#F0EDF8]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

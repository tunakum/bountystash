import { cn } from "@/lib/utils"

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 h-4", className)}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4 L7 20" />
        <path d="M7 4 H13 A3.5 3.5 0 0 1 13 11.5 H7" />
        <path d="M7 11.5 H14 A4.25 4.25 0 0 1 14 20 H7" />
      </g>
    </svg>
  )
}

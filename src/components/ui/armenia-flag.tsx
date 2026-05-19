import React from 'react'

interface ArmeniaFlagProps {
  className?: string
  width?: number | string
  height?: number | string
}

export function ArmeniaFlag({ className = '', width = 18, height = 12 }: ArmeniaFlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 6"
      width={width}
      height={height}
      className={`inline-block shrink-0 rounded-xs border border-white/5 shadow-xs ${className}`}
      aria-label="Armenian Flag"
    >
      <rect width="9" height="2" fill="#D90012" />
      <rect y="2" width="9" height="2" fill="#0033A0" />
      <rect y="4" width="9" height="2" fill="#F2A800" />
    </svg>
  )
}

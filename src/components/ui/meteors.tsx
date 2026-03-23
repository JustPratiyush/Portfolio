"use client"

import type { CSSProperties } from "react"
import { useMemo } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

function seededUnit(seed: number) {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}

export const Meteors = ({
  number = 10,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const meteorStyles = useMemo<Array<CSSProperties>>(
    () => {
      const seedBase =
        number * 11 +
        minDelay * 13 +
        maxDelay * 17 +
        minDuration * 19 +
        maxDuration * 23 +
        angle * 29

      return [...new Array(number)].map((_, idx) => {
        const leftSeed = seededUnit(seedBase + idx * 1.37)
        const delaySeed = seededUnit(seedBase + idx * 2.11)
        const staggerSeed = seededUnit(seedBase + idx * 3.73)
        const durationSeed = seededUnit(seedBase + idx * 4.97)

        return {
          "--angle": angle + "deg",
          top: -5,
          left: Math.floor(leftSeed * 150) + "%",
          animationDelay:
            delaySeed * (maxDelay - minDelay) +
            minDelay +
            (idx % 2 === 0 ? staggerSeed * 5 + 2 : 0) +
            "s",
          animationDuration:
            Math.floor(durationSeed * (maxDuration - minDuration) + minDuration) +
            "s",
        }
      })
    },
    [number, minDelay, maxDelay, minDuration, maxDuration, angle]
  )

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={style}
          className={cn(
            "pointer-events-none animate-meteor absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#00000010] z-20",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  )
}

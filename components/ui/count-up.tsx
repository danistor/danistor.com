"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
}

export function CountUp({ end, start = 0, duration = 2000, delay = 0, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      const timeout = setTimeout(() => {
        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const currentCount = Math.floor(progress * (end - start) + start)
          setCount(currentCount)

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate)
          }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
          cancelAnimationFrame(animationFrame)
        }
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [isInView, hasStarted, start, end, duration, delay])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

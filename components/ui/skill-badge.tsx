"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  delay?: number
}

export function SkillBadge({ name, position, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="absolute z-20"
      style={position}
    >
      <Badge className="bg-white/90 text-accent hover:bg-white animate-float">{name}</Badge>
    </motion.div>
  )
}

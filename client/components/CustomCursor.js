'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || 
          e.target.tagName === 'A' || 
          e.target.classList.contains('cursor-hover') ||
          e.target.closest('button') ||
          e.target.closest('a')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Main cursor with icon */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.5
        }}
      >
        <FaCode className="text-code-green text-3xl" />
      </motion.div>

      {/* Trailing circle effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 border-2 border-code-green/50 rounded-full"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          mass: 0.8
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-12 h-12 bg-code-green/10 rounded-full blur-md"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 1
        }}
      />
    </>
  )
}

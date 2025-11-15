'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Bootcamp from '@/components/Bootcamp'
import Features from '@/components/Features'
import Instructors from '@/components/Instructors'
import Footer from '@/components/Footer'
import MatrixRain from '@/components/MatrixRain'
import RegistrationModal from '@/components/RegistrationModal'
import CustomCursor from '@/components/CustomCursor'
import '@/app/globals.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [siteConfig, setSiteConfig] = useState(null)

  useEffect(() => {
    setMounted(true)
    fetchSiteConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/config`)
      setSiteConfig(response.data)
    } catch (error) {
      console.error('Failed to fetch site config:', error)
    }
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-code-darker overflow-hidden" style={{ cursor: 'none' }}>
      <CustomCursor />
      <MatrixRain />
      
      <div className="relative z-10">
        <Hero openModal={() => setIsModalOpen(true)} config={siteConfig} />
        <About config={siteConfig} />
        <Bootcamp config={siteConfig} />
        <Features config={siteConfig} />
        <Instructors />
        <Footer config={siteConfig} />
      </div>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        config={siteConfig}
      />
    </main>
  )
}

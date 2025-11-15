'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { 
  FaWpforms, FaCalendarAlt, FaBook, FaCog, FaSignOutAlt, 
  FaUsers, FaChartLine, FaGift, FaInfoCircle 
} from 'react-icons/fa'
import FormFieldsManager from '@/components/admin/FormFieldsManager'
import ScheduleManager from '@/components/admin/ScheduleManager'
import CurriculumManager from '@/components/admin/CurriculumManager'
import SiteInfoManager from '@/components/admin/SiteInfoManager'
import RegistrationsView from '@/components/admin/RegistrationsView'
import '@/app/globals.css'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('registrations')
  const [adminUser, setAdminUser] = useState(null)
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')
    
    if (!token || !user) {
      router.push('/admin')
      return
    }

    setAdminUser(JSON.parse(user))
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/config`)
      setConfig(response.data)
    } catch (error) {
      console.error('Failed to fetch config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin')
  }

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: FaUsers },
    { id: 'form-fields', label: 'Form Fields', icon: FaWpforms },
    { id: 'schedule', label: 'Schedule', icon: FaCalendarAlt },
    { id: 'curriculum', label: 'Curriculum', icon: FaBook },
    { id: 'site-info', label: 'Site Info', icon: FaInfoCircle },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-code-darker flex items-center justify-center">
        <div className="text-code-green text-xl font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-code-darker">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-code-green">Aarambh Admin</h1>
            <p className="text-gray-400 text-sm font-mono">Welcome, {adminUser?.username}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors font-mono"
          >
            <FaSignOutAlt />
            Logout
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1f6feb] text-white'
                    : 'bg-[#161b22] text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <Icon />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'registrations' && <RegistrationsView />}
            {activeTab === 'form-fields' && <FormFieldsManager config={config} onUpdate={fetchConfig} />}
            {activeTab === 'schedule' && <ScheduleManager config={config} onUpdate={fetchConfig} />}
            {activeTab === 'curriculum' && <CurriculumManager config={config} onUpdate={fetchConfig} />}
            {activeTab === 'site-info' && <SiteInfoManager config={config} onUpdate={fetchConfig} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

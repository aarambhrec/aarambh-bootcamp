'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { FaSave } from 'react-icons/fa'

export default function SiteInfoManager({ config, onUpdate }) {
  const [siteInfo, setSiteInfo] = useState({
    bootcampDate: '',
    bootcampTitle: '',
    heroTitle: '',
    heroSubtitle: '',
    aboutDescription: '',
    registrationOpen: true,
    maxParticipants: 100
  })

  useEffect(() => {
    if (config?.siteInfo) {
      setSiteInfo({
        bootcampDate: config.siteInfo.bootcampDate ? new Date(config.siteInfo.bootcampDate).toISOString().split('T')[0] : '',
        bootcampTitle: config.siteInfo.bootcampTitle || '',
        heroTitle: config.siteInfo.heroTitle || '',
        heroSubtitle: config.siteInfo.heroSubtitle || '',
        aboutDescription: config.siteInfo.aboutDescription || '',
        registrationOpen: config.siteInfo.registrationOpen !== undefined ? config.siteInfo.registrationOpen : true,
        maxParticipants: config.siteInfo.maxParticipants || 100
      })
    }
  }, [config])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(`${API_URL}/api/config/site-info`, { siteInfo }, 
        { headers: { Authorization: `Bearer ${token}` } })
      alert('Site info updated successfully!')
      onUpdate()
    } catch (error) {
      alert('Failed to update: ' + error.message)
    }
  }

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-code-green">Site Information</h2>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#1f6feb] text-white rounded-lg font-bold">
          <FaSave /> Save Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Bootcamp Title</label>
          <input type="text" value={siteInfo.bootcampTitle} 
            onChange={(e) => setSiteInfo({ ...siteInfo, bootcampTitle: e.target.value })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Bootcamp Date</label>
          <input type="date" value={siteInfo.bootcampDate}
            onChange={(e) => setSiteInfo({ ...siteInfo, bootcampDate: e.target.value })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
          <input type="text" value={siteInfo.heroTitle}
            onChange={(e) => setSiteInfo({ ...siteInfo, heroTitle: e.target.value })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
          <input type="text" value={siteInfo.heroSubtitle}
            onChange={(e) => setSiteInfo({ ...siteInfo, heroSubtitle: e.target.value })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-2">About Description</label>
          <textarea value={siteInfo.aboutDescription} rows={4}
            onChange={(e) => setSiteInfo({ ...siteInfo, aboutDescription: e.target.value })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Max Participants</label>
          <input type="number" value={siteInfo.maxParticipants}
            onChange={(e) => setSiteInfo({ ...siteInfo, maxParticipants: parseInt(e.target.value) })}
            className="w-full bg-[#161b22] border border-gray-700 rounded px-4 py-3 text-white" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" checked={siteInfo.registrationOpen}
            onChange={(e) => setSiteInfo({ ...siteInfo, registrationOpen: e.target.checked })}
            className="w-5 h-5" />
          <label className="text-gray-400">Registration Open</label>
        </div>
      </div>
    </div>
  )
}

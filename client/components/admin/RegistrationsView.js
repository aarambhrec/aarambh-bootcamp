'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { FaDownload, FaTrash, FaSearch } from 'react-icons/fa'

export default function RegistrationsView() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/register`)
      // API returns { success, data, pagination } format
      const registrationData = response.data?.data || response.data || []
      const data = Array.isArray(registrationData) ? registrationData : []
      setRegistrations(data)
      console.log('Fetched registrations:', data)
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
      setRegistrations([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this registration?')) return
    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/api/register/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchRegistrations()
      alert('Deleted successfully')
    } catch (error) {
      alert('Failed to delete: ' + error.message)
    }
  }

  const exportToCSV = () => {
    const headers = Object.keys(registrations[0] || {}).join(',')
    const rows = registrations.map(reg => Object.values(reg).join(','))
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'registrations.csv'
    a.click()
  }

  const filteredRegistrations = registrations.filter(reg => 
    reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.college?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center py-12 text-code-green">Loading...</div>

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-code-green">Registrations ({registrations.length})</h2>
          <p className="text-gray-400 text-sm">Manage bootcamp registrations</p>
        </div>
        <button onClick={exportToCSV} disabled={registrations.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-code-green text-black rounded-lg font-bold disabled:opacity-50">
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, email, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-code-green font-mono">Name</th>
              <th className="text-left py-3 px-4 text-code-green font-mono">Email</th>
              <th className="text-left py-3 px-4 text-code-green font-mono">Phone</th>
              <th className="text-left py-3 px-4 text-code-green font-mono">College</th>
              <th className="text-left py-3 px-4 text-code-green font-mono">Year</th>
              <th className="text-left py-3 px-4 text-code-green font-mono">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg) => (
              <tr key={reg._id} className="border-b border-gray-800 hover:bg-[#161b22]">
                <td className="py-3 px-4 text-white">{reg.name}</td>
                <td className="py-3 px-4 text-gray-400">{reg.email}</td>
                <td className="py-3 px-4 text-gray-400">{reg.phone}</td>
                <td className="py-3 px-4 text-gray-400">{reg.college}</td>
                <td className="py-3 px-4 text-gray-400">{reg.year}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDelete(reg._id)}
                    className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No registrations found matching your search' : 'No registrations yet'}
        </div>
      )}
    </div>
  )
}

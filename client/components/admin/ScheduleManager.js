'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { FaPlus, FaTrash, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function ScheduleManager({ config, onUpdate }) {
  const [schedule, setSchedule] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    time: '',
    title: '',
    description: '',
    icon: 'book',
    color: 'from-code-green to-emerald-500',
    order: 0,
    visible: true
  })

  useEffect(() => {
    if (config?.schedule) {
      setSchedule(config.schedule.sort((a, b) => a.order - b.order))
    }
  }, [config])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(
        `${API_URL}/api/config/schedule`,
        { schedule },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Schedule updated successfully!')
      onUpdate()
    } catch (error) {
      alert('Failed to update schedule: ' + error.message)
    }
  }

  const handleAdd = () => {
    setSchedule([...schedule, { ...newItem, order: schedule.length }])
    setNewItem({
      time: '',
      title: '',
      description: '',
      icon: 'book',
      color: 'from-code-green to-emerald-500',
      order: 0,
      visible: true
    })
    setShowAddForm(false)
  }

  const handleDelete = (index) => {
    if (confirm('Delete this schedule item?')) {
      setSchedule(schedule.filter((_, i) => i !== index))
    }
  }

  const toggleVisible = (index) => {
    const updated = [...schedule]
    updated[index].visible = !updated[index].visible
    setSchedule(updated)
  }

  const moveItem = (index, direction) => {
    const newSchedule = [...schedule]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newSchedule.length) {
      [newSchedule[index], newSchedule[targetIndex]] = [newSchedule[targetIndex], newSchedule[index]]
      newSchedule.forEach((item, i) => item.order = i)
      setSchedule(newSchedule)
    }
  }

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-code-green">Schedule Manager</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-code-green text-black rounded-lg font-bold"
          >
            <FaPlus /> Add Item
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#1f6feb] text-white rounded-lg font-bold"
          >
            <FaSave /> Save
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-code-blue mb-4">Add Schedule Item</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Time (e.g., 9:00 AM - 10:00 AM)"
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full md:col-span-2 bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Icon (e.g., book, code)"
              value={newItem.icon}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
              className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Color gradient"
              value={newItem.color}
              onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
              className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 bg-code-green text-black rounded font-bold">
              Add
            </button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-700 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div key={index} className="bg-[#161b22] border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-code-green font-bold">{item.time}</span>
                  <span className="text-white">{item.title}</span>
                  {!item.visible && <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Hidden</span>}
                </div>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50">↑</button>
                <button onClick={() => moveItem(index, 'down')} disabled={index === schedule.length - 1} className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50">↓</button>
                <button onClick={() => toggleVisible(index)} className="p-2 bg-gray-700 text-white rounded">
                  {item.visible ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button onClick={() => handleDelete(index)} className="p-2 bg-red-500/20 text-red-500 rounded">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

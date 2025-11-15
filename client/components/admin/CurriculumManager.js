'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { FaPlus, FaTrash, FaSave, FaEye, FaEyeSlash, FaCode, FaPalette, FaReact, FaNodeJs, FaDatabase, FaRocket, FaBook, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa'
import { SiMongodb, SiJavascript, SiHtml5, SiCss3, SiExpress, SiTailwindcss } from 'react-icons/si'

const iconOptions = [
  { name: 'code', icon: FaCode, label: 'Code' },
  { name: 'palette', icon: FaPalette, label: 'Palette' },
  { name: 'react', icon: FaReact, label: 'React' },
  { name: 'nodejs', icon: FaNodeJs, label: 'Node.js' },
  { name: 'database', icon: FaDatabase, label: 'Database' },
  { name: 'mongodb', icon: SiMongodb, label: 'MongoDB' },
  { name: 'rocket', icon: FaRocket, label: 'Rocket' },
  { name: 'book', icon: FaBook, label: 'Book' },
  { name: 'laptop', icon: FaLaptopCode, label: 'Laptop Code' },
  { name: 'mobile', icon: FaMobileAlt, label: 'Mobile' },
  { name: 'server', icon: FaServer, label: 'Server' },
  { name: 'javascript', icon: SiJavascript, label: 'JavaScript' },
  { name: 'html5', icon: SiHtml5, label: 'HTML5' },
  { name: 'css3', icon: SiCss3, label: 'CSS3' },
  { name: 'express', icon: SiExpress, label: 'Express' },
  { name: 'tailwind', icon: SiTailwindcss, label: 'Tailwind' }
]

export default function CurriculumManager({ config, onUpdate }) {
  const [curriculum, setCurriculum] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '', icon: 'code', description: '', skills: [], color: '', order: 0, visible: true
  })
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    if (config?.curriculum) setCurriculum(config.curriculum.sort((a, b) => a.order - b.order))
  }, [config])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(`${API_URL}/api/config/curriculum`, { curriculum }, 
        { headers: { Authorization: `Bearer ${token}` } })
      alert('Curriculum updated!')
      onUpdate()
    } catch (error) {
      alert('Failed: ' + error.message)
    }
  }

  const handleAdd = () => {
    setCurriculum([...curriculum, { ...newItem, order: curriculum.length }])
    setNewItem({ title: '', icon: 'code', description: '', skills: [], color: '', order: 0, visible: true })
    setSkillInput('')
    setShowAdd(false)
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      setNewItem({ ...newItem, skills: [...newItem.skills, skillInput.trim()] })
      setSkillInput('')
    }
  }

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-code-green">Curriculum Manager</h2>
        <div className="flex gap-3">
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 bg-code-green text-black rounded-lg font-bold">
            <FaPlus /> Add Module
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#1f6feb] text-white rounded-lg font-bold">
            <FaSave /> Save
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Title (e.g., JavaScript)" value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white" />
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Icon</label>
              <select value={newItem.icon}
                onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white">
                {iconOptions.map(opt => (
                  <option key={opt.name} value={opt.name}>{opt.label}</option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-2 text-gray-400">
                <span className="text-xs">Preview:</span>
                {(() => {
                  const IconComponent = iconOptions.find(o => o.name === newItem.icon)?.icon || FaCode
                  return <IconComponent className="text-2xl text-code-green" />
                })()}
              </div>
            </div>
            
            <input type="text" placeholder="Description" value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full md:col-span-2 bg-code-darker border border-gray-700 rounded px-3 py-2 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Skills (press Enter to add)</label>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Enter skill" value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 bg-code-darker border border-gray-700 rounded px-3 py-2 text-white" />
              <button onClick={addSkill} className="px-4 py-2 bg-code-blue text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newItem.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-code-green/20 text-code-green rounded-full text-sm flex items-center gap-2">
                  {skill}
                  <button onClick={() => setNewItem({ ...newItem, skills: newItem.skills.filter((_, idx) => idx !== i) })} 
                    className="text-xs">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="px-4 py-2 bg-code-green text-black rounded font-bold">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {curriculum.map((item, idx) => (
          <div key={idx} className="bg-[#161b22] border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 flex-1">
                <div className="text-3xl text-code-green mt-1">
                  {(() => {
                    const IconComponent = iconOptions.find(o => o.name === item.icon)?.icon || FaCode
                    return <IconComponent />
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-code-green font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills?.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-code-blue/20 text-code-blue rounded">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const updated = [...curriculum]
                  updated[idx].visible = !updated[idx].visible
                  setCurriculum(updated)
                }} className="p-2 bg-gray-700 text-white rounded h-fit">
                  {item.visible ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button onClick={() => {
                  if (confirm('Delete this module?')) {
                    setCurriculum(curriculum.filter((_, i) => i !== idx))
                  }
                }} 
                  className="p-2 bg-red-500/20 text-red-500 rounded h-fit hover:bg-red-500/30">
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

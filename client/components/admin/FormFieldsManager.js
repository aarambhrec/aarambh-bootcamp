'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function FormFieldsManager({ config, onUpdate }) {
  const [fields, setFields] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (config?.formFields) {
      setFields(config.formFields.sort((a, b) => a.order - b.order))
    }
  }, [config])

  const fieldTypes = ['text', 'email', 'tel', 'url', 'textarea', 'select', 'radio', 'checkbox', 'number', 'date']

  const defaultField = {
    name: '',
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
    order: fields.length,
    description: '',
    warning: '',
    visible: true,
    options: [],
    validation: {}
  }

  const [newField, setNewField] = useState(defaultField)

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(
        `${API_URL}/api/config/form-fields`,
        { formFields: fields },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Form fields updated successfully!')
      onUpdate()
    } catch (error) {
      alert('Failed to update form fields: ' + error.message)
    }
  }

  const handleAdd = () => {
    const field = { ...newField, order: fields.length }
    setFields([...fields, field])
    setNewField(defaultField)
    setShowAddForm(false)
  }

  const handleStartEdit = (index) => {
    setEditingIndex(index)
  }

  const handleUpdateField = (index, updatedField) => {
    const updated = [...fields]
    updated[index] = updatedField
    setFields(updated)
    setEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
  }

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this field?')) {
      setFields(fields.filter((_, i) => i !== index))
    }
  }

  const handleToggleVisible = (index) => {
    const updated = [...fields]
    updated[index].visible = !updated[index].visible
    setFields(updated)
  }

  const moveField = (index, direction) => {
    const newFields = [...fields]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFields.length) {
      [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]]
      newFields.forEach((field, i) => field.order = i)
      setFields(newFields)
    }
  }

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-code-green">Form Fields Manager</h2>
          <p className="text-gray-400 text-sm font-mono mt-1">Customize registration form fields</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-code-green text-black rounded-lg font-mono font-bold"
          >
            <FaPlus /> Add Field
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#1f6feb] text-white rounded-lg font-mono font-bold"
          >
            <FaSave /> Save Changes
          </motion.button>
        </div>
      </div>

      {/* Add New Field Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[#161b22] border border-gray-700 rounded-lg p-6 mb-6"
        >
          <h3 className="text-xl font-bold text-code-blue mb-4">Add New Field</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Field Name (identifier)</label>
              <input
                type="text"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="email"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Label (displayed)</label>
              <input
                type="text"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={newField.type}
                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
              >
                {fieldTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Placeholder</label>
              <input
                type="text"
                value={newField.placeholder}
                onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <input
                type="text"
                value={newField.description}
                onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Helper text for this field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Warning Message</label>
              <input
                type="text"
                value={newField.warning}
                onChange={(e) => setNewField({ ...newField, warning: e.target.value })}
                className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Warning message if needed"
              />
            </div>
            {(newField.type === 'select' || newField.type === 'radio' || newField.type === 'checkbox') && (
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Options {newField.type === 'radio' && '(for radio buttons)'}
                  {newField.type === 'select' && '(for dropdown)'}
                  {newField.type === 'checkbox' && '(for checkbox group)'}
                </label>
                <textarea
                  value={newField.options?.join('\n') || ''}
                  onChange={(e) => setNewField({ ...newField, options: e.target.value.split('\n').map(o => o.trim()).filter(o => o) })}
                  className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm"
                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">Enter each option on a new line (press Enter after each option)</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-gray-400">Required Field</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-code-green text-black rounded font-bold"
            >
              Add Field
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Fields List */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <motion.div
            key={index}
            layout
            className="bg-[#161b22] border border-gray-700 rounded-lg p-4"
          >
            {editingIndex === index ? (
              // Edit Mode
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-code-blue mb-4">Edit Field</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Field Name (identifier)</label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].name = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Label (displayed)</label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].label = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].type = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                    >
                      {fieldTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Placeholder</label>
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].placeholder = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <input
                      type="text"
                      value={field.description || ''}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].description = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Helper text for this field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">Warning Message</label>
                    <input
                      type="text"
                      value={field.warning || ''}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].warning = e.target.value
                        setFields(updated)
                      }}
                      className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Warning message if needed"
                    />
                  </div>
                  {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">
                        Options {field.type === 'radio' && '(for radio buttons)'}
                        {field.type === 'select' && '(for dropdown)'}
                        {field.type === 'checkbox' && '(for checkbox group)'}
                      </label>
                      <textarea
                        value={field.options?.join('\n') || ''}
                        onChange={(e) => {
                          const updated = [...fields]
                          updated[index].options = e.target.value.split('\n').map(o => o.trim()).filter(o => o)
                          setFields(updated)
                        }}
                        className="w-full bg-code-darker border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm"
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter each option on a new line (press Enter after each option)</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].required = e.target.checked
                        setFields(updated)
                      }}
                      className="w-4 h-4"
                    />
                    <label className="text-gray-400">Required Field</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.visible !== false}
                      onChange={(e) => {
                        const updated = [...fields]
                        updated[index].visible = e.target.checked
                        setFields(updated)
                      }}
                      className="w-4 h-4"
                    />
                    <label className="text-gray-400">Visible</label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCancelEdit()}
                    className="px-4 py-2 bg-code-green text-black rounded font-bold flex items-center gap-2"
                  >
                    <FaSave /> Done
                  </button>
                  <button
                    onClick={() => handleCancelEdit()}
                    className="px-4 py-2 bg-gray-700 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-code-green font-mono font-bold">{field.label || field.name}</span>
                    <span className="text-xs px-2 py-1 bg-code-blue/20 text-code-blue rounded">{field.type}</span>
                    {field.required && (
                      <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded">Required</span>
                    )}
                    {!field.visible && (
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Hidden</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    {field.placeholder && <div>Placeholder: {field.placeholder}</div>}
                    {field.description && <div className="text-code-blue">ℹ️ {field.description}</div>}
                    {field.warning && <div className="text-yellow-500">⚠️ {field.warning}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveField(index, 'up')}
                    disabled={index === 0}
                    className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveField(index, 'down')}
                    disabled={index === fields.length - 1}
                    className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleToggleVisible(index)}
                    className="p-2 bg-gray-700 text-white rounded"
                    title={field.visible ? 'Hide' : 'Show'}
                  >
                    {field.visible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => handleStartEdit(index)}
                    className="p-2 bg-code-blue/20 text-code-blue rounded hover:bg-code-blue/30"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No form fields yet. Click "Add Field" to create one.
        </div>
      )}
    </div>
  )
}

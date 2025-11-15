'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiOutlineFire } from 'react-icons/hi'
import { MdLaptopMac } from 'react-icons/md'
import { IoBookOutline } from 'react-icons/io5'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { FaTools, FaChalkboardTeacher } from 'react-icons/fa'

export default function Bootcamp({ config }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const schedule = config?.schedule || [
    { time: '10:00 AM - 11:30 AM', title: 'Introduction & Setup', description: 'Environment Setup', icon: 'book', color: 'from-code-green to-emerald-500' },
    { time: '11:30 AM - 1:00 PM', title: 'Frontend Fundamentals', description: 'HTML, CSS, JavaScript', icon: 'code', color: 'from-code-blue to-cyan-500' },
    { time: '1:00 PM - 2:00 PM', title: 'Lunch Break', description: 'Network & Recharge', icon: 'coffee', color: 'from-yellow-500 to-orange-500' },
    { time: '2:00 PM - 4:00 PM', title: 'React.js Deep Dive', description: 'Components & Hooks', icon: 'react', color: 'from-blue-500 to-purple-500' },
    { time: '4:00 PM - 6:00 PM', title: 'Backend with Node.js', description: 'APIs & Database', icon: 'server', color: 'from-green-500 to-teal-500' },
    { time: '6:00 PM - 7:00 PM', title: 'Project Building', description: 'Hands-on Practice', icon: 'rocket', color: 'from-pink-500 to-red-500' }
  ]

  const bootcampDate = config?.siteInfo?.bootcampDate 
    ? new Date(config.siteInfo.bootcampDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'November 22, 2025'
  
  const bootcampTitle = config?.siteInfo?.bootcampTitle || 'Web Development Bootcamp'

  return (
    <section id="bootcamp" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6 px-6 py-3 bg-code-purple/20 border border-code-purple rounded-full">
            <span className="text-code-purple font-bold text-sm">
              <HiOutlineFire className="inline-block mr-2 text-xl" />
              MAIN EVENT
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-code-green via-code-blue to-code-purple">
              {bootcampTitle}
            </span>
          </h2>
          <p className="text-2xl text-gray-400">
            {bootcampDate} • Full Day Intensive Workshop
          </p>
        </motion.div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="code-block"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-code-green font-bold text-xl">
              <span className="text-code-yellow">class</span> Schedule {'{ }'}
            </span>
          </div>

          <div className="space-y-4">
            {schedule.filter(item => item.visible !== false).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-code-darker/50 rounded-lg border border-code-border/30 hover:border-code-green/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <span className="inline-block px-4 py-2 bg-code-green/10 text-code-green font-mono text-sm rounded">
                    {item.time}
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-code-blue mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-code-purple">→</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 p-6 bg-gradient-to-r from-code-green/10 to-code-purple/10 border border-code-green rounded-lg"
          >
            <p className="text-center text-lg">
              <span className="text-code-yellow font-bold">Note:</span>
              <span className="text-gray-300"> Bring your laptop, enthusiasm, and get ready to code! </span>
              <MdLaptopMac className="text-5xl text-code-green" />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

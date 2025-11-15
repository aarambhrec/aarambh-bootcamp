'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaPalette, FaCode, FaReact, FaNodeJs, FaDatabase, FaRocket, FaCertificate, FaUsers, FaBookReader, FaGift, FaCheck, FaBook, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa'
import { SiMongodb, SiJavascript, SiHtml5, SiCss3, SiExpress, SiTailwindcss } from 'react-icons/si'

const iconMap = {
  'palette': FaPalette,
  'code': FaCode,
  'react': FaReact,
  'nodejs': FaNodeJs,
  'server': FaNodeJs,
  'database': FaDatabase,
  'mongodb': SiMongodb,
  'rocket': FaRocket,
  'book': FaBook,
  'laptop': FaLaptopCode,
  'mobile': FaMobileAlt,
  'javascript': SiJavascript,
  'html5': SiHtml5,
  'css3': SiCss3,
  'express': SiExpress,
  'tailwind': SiTailwindcss
}

export default function Features({ config }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = config?.curriculum || [
    {
      title: 'HTML & CSS',
      icon: 'palette',
      description: 'Master the foundation of web design',
      skills: ['Semantic HTML5', 'Flexbox & Grid', 'Responsive Design', 'CSS Animations']
    },
    {
      title: 'JavaScript',
      icon: 'code',
      description: 'Bring your websites to life',
      skills: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'APIs Integration']
    },
    {
      title: 'React.js',
      icon: 'react',
      description: 'Build modern web applications',
      skills: ['Components', 'Hooks & State', 'React Router', 'State Management']
    },
    {
      title: 'Node.js',
      icon: 'server',
      description: 'Create powerful backends',
      skills: ['Express.js', 'RESTful APIs', 'Authentication', 'Middleware']
    },
    {
      title: 'MongoDB',
      icon: 'database',
      description: 'Manage your data efficiently',
      skills: ['CRUD Operations', 'Mongoose', 'Database Design', 'Aggregation']
    },
    {
      title: 'Full Stack',
      icon: 'rocket',
      description: 'Deploy complete applications',
      skills: ['Git & GitHub', 'Deployment', 'Best Practices', 'Project Building']
    }
  ]

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-code-yellow">{'function'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-code-green to-code-blue">
              {' whatYouWillLearn() '}
            </span>
            <span className="text-code-purple">{'{ }'}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive curriculum designed to take you from beginner to job-ready developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
              className="code-block group cursor-pointer"
            >
              <div className="mb-4 flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                  className="text-code-green text-5xl"
                >
                  {(() => {
                    const IconComponent = iconMap[feature.icon] || FaCode
                    return <IconComponent />
                  })()}
                </motion.div>
                <span className="text-code-green font-mono text-sm">
                  {'// module_' + (index + 1)}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-code-blue mb-2 group-hover:text-code-green transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {feature.description}
              </p>

              <div className="space-y-2">
                {feature.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + skillIndex * 0.05 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FaCheck className="text-code-green" />
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-4 pt-4 border-t border-code-border/30"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <span className="text-code-purple font-mono text-xs">
                  {'> npm install knowledge'}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bonus section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 code-block text-center"
        >
          <h3 className="text-3xl font-bold text-code-yellow mb-4 flex items-center justify-center gap-3">
            <FaGift className="text-4xl" />
            Bonus Benefits
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <FaCertificate className="text-5xl mb-4 mx-auto text-code-green" />
              <h4 className="text-lg font-bold text-code-green mb-2">Certificate</h4>
              <p className="text-gray-400 text-sm">Completion certificate to boost your resume</p>
            </div>
            <div>
              <FaUsers className="text-5xl mb-4 mx-auto text-code-blue" />
              <h4 className="text-lg font-bold text-code-blue mb-2">Community</h4>
              <p className="text-gray-400 text-sm">Join our Discord community of learners</p>
            </div>
            <div>
              <FaBookReader className="text-5xl mb-4 mx-auto text-code-purple" />
              <h4 className="text-lg font-bold text-code-purple mb-2">Resources</h4>
              <p className="text-gray-400 text-sm">Access to curated learning materials</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

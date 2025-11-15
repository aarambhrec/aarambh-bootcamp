'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { HiOutlineLightningBolt, HiOutlineLightBulb } from 'react-icons/hi'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const codeSnippet = `// Welcome to Aarambh
const mission = {
  goal: "Empower Students",
  method: "Hands-on Learning",
  output: "Real Projects"
};

function transform(student) {
  return student
    .learn(webDev)
    .build(projects)
    .deploy(success);
}

// Your journey starts here`

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
            <span className="text-code-yellow">{'<'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-code-blue to-code-purple">
              About Us
            </span>
            <span className="text-code-yellow">{' />'}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="code-block"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-auto text-xs text-gray-500">aarambh.js</span>
            </div>
            <pre className="text-sm text-code-green overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <IoCheckmarkCircleOutline className="text-4xl text-code-green" />
                <div>
                  <h3 className="text-2xl font-bold text-code-green mb-2">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Aarambh means "The Beginning" - and we're here to kickstart your journey into 
                    the world of web development. We believe in learning by doing, not just watching.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HiOutlineLightBulb className="text-4xl text-code-yellow" />
                <div>
                  <h3 className="text-2xl font-bold text-code-blue mb-2">What We Do</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We teach modern web development through intensive bootcamps, focusing on 
                    real-world projects that you can showcase in your portfolio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HiOutlineLightningBolt className="text-4xl text-code-blue" />
                <div>
                  <h3 className="text-2xl font-bold text-code-purple mb-2">Why Choose Us</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Project-based learning, industry-relevant skills, mentorship from experienced 
                    developers, and a supportive community of learners.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 bg-gradient-to-r from-code-green/10 to-code-blue/10 border border-code-green/30 rounded-lg"
            >
              <p className="text-code-green font-mono text-lg">
                <span className="text-code-yellow">$</span> echo "Transform your passion into profession"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

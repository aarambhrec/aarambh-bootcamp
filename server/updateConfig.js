const mongoose = require('mongoose');
const SiteConfig = require('./models/SiteConfig');
require('dotenv').config();

async function updateDefaultConfig() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aarambh';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Update or create config
    const defaultData = {
      formFields: [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true, order: 0, visible: true },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com', required: true, order: 1, visible: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 1234567890', required: true, order: 2, visible: true },
        { name: 'college', label: 'College Name', type: 'text', placeholder: 'Your college name', required: true, order: 3, visible: true },
        { name: 'year', label: 'Year', type: 'select', required: true, order: 4, options: ['1st Year', '2nd Year', '3rd Year', '4th Year'], visible: true },
        { name: 'branch', label: 'Branch/Department', type: 'text', placeholder: 'Computer Science', required: true, order: 5, visible: true },
        { name: 'experience', label: 'Experience Level', type: 'select', required: true, order: 6, options: ['Beginner', 'Intermediate', 'Advanced'], visible: true },
        { name: 'github', label: 'GitHub Profile', type: 'url', placeholder: 'https://github.com/username', required: false, order: 7, visible: true },
        { name: 'linkedin', label: 'LinkedIn Profile', type: 'url', placeholder: 'https://linkedin.com/in/username', required: false, order: 8, visible: true },
        { name: 'expectations', label: 'What do you expect from this bootcamp?', type: 'textarea', placeholder: 'Share your expectations...', required: false, order: 9, visible: true }
      ],

      schedule: [
        { time: '10:00 AM - 11:30 AM', title: 'Introduction & Setup', description: 'Environment Setup', icon: 'book', color: 'from-code-green to-emerald-500', order: 0, visible: true },
        { time: '11:30 AM - 1:00 PM', title: 'Frontend Fundamentals', description: 'HTML, CSS, JavaScript', icon: 'code', color: 'from-code-blue to-cyan-500', order: 1, visible: true },
        { time: '1:00 PM - 2:00 PM', title: 'Lunch Break', description: 'Network & Recharge', icon: 'coffee', color: 'from-yellow-500 to-orange-500', order: 2, visible: true },
        { time: '2:00 PM - 4:00 PM', title: 'React.js Deep Dive', description: 'Components & Hooks', icon: 'react', color: 'from-blue-500 to-purple-500', order: 3, visible: true },
        { time: '4:00 PM - 6:00 PM', title: 'Backend with Node.js', description: 'APIs & Database', icon: 'server', color: 'from-green-500 to-teal-500', order: 4, visible: true },
        { time: '6:00 PM - 7:00 PM', title: 'Project Building', description: 'Hands-on Practice', icon: 'rocket', color: 'from-pink-500 to-red-500', order: 5, visible: true }
      ],

      curriculum: [
        {
          title: 'HTML & CSS',
          icon: 'html5',
          description: 'Master the foundation of web design',
          skills: ['Semantic HTML5', 'Flexbox & Grid', 'Responsive Design', 'CSS Animations'],
          order: 0,
          color: 'from-orange-500 to-red-500',
          visible: true
        },
        {
          title: 'JavaScript',
          icon: 'javascript',
          description: 'Bring your websites to life',
          skills: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'APIs Integration'],
          order: 1,
          color: 'from-yellow-500 to-orange-500',
          visible: true
        },
        {
          title: 'React.js',
          icon: 'react',
          description: 'Build modern web applications',
          skills: ['Components', 'Hooks & State', 'React Router', 'State Management'],
          order: 2,
          color: 'from-blue-500 to-cyan-500',
          visible: true
        },
        {
          title: 'Node.js',
          icon: 'nodejs',
          description: 'Create powerful backend services',
          skills: ['Express.js', 'REST APIs', 'Authentication', 'Middleware'],
          order: 3,
          color: 'from-green-500 to-teal-500',
          visible: true
        },
        {
          title: 'MongoDB',
          icon: 'mongodb',
          description: 'Store and manage your data',
          skills: ['CRUD Operations', 'Mongoose ODM', 'Data Modeling', 'Aggregation'],
          order: 4,
          color: 'from-green-600 to-emerald-600',
          visible: true
        },
        {
          title: 'Deployment',
          icon: 'rocket',
          description: 'Launch your projects live',
          skills: ['Git & GitHub', 'Vercel/Netlify', 'Environment Variables', 'CI/CD Basics'],
          order: 5,
          color: 'from-purple-500 to-pink-500',
          visible: true
        }
      ],

      siteInfo: {
        bootcampDate: new Date('2025-11-22'),
        bootcampTitle: 'Web Development Bootcamp',
        heroTitle: 'Welcome to Aarambh',
        heroSubtitle: 'Master Web Development Through Hands-On Learning',
        aboutDescription: 'Aarambh is more than just a bootcamp - it\'s the beginning of your journey into the world of web development. We believe in learning by doing, and our intensive program is designed to take you from basics to building full-stack applications.',
        registrationOpen: true,
        maxParticipants: 100,
        currentParticipants: 0
      }
    };

    const result = await SiteConfig.findOneAndUpdate(
      {},
      defaultData,
      { upsert: true, new: true }
    );

    console.log('✅ Configuration updated successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Form Fields: ${result.formFields.length}`);
    console.log(`- Schedule Items: ${result.schedule.length}`);
    console.log(`- Curriculum Modules: ${result.curriculum.length}`);
    console.log(`- Site Info updated`);

  } catch (error) {
    console.error('❌ Error updating config:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

updateDefaultConfig();

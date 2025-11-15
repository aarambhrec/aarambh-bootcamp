/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'code-bg': '#0d1117',
        'code-darker': '#010409',
        'code-border': '#30363d',
        'code-green': '#00ff41',
        'code-blue': '#58a6ff',
        'code-purple': '#bc8cff',
        'code-yellow': '#ffd700',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink .7s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 
            textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
          },
          'to': { 
            textShadow: '0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41, 0 0 50px #00ff41',
          },
        },
        slideUp: {
          'from': { transform: 'translateY(100px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

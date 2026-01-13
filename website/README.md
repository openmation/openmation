# Simplest Automation - Marketing Website

A beautiful, animated marketing website for Simplest Automation, inspired by V7labs and Jam.dev.

## Tech Stack

- **Next.js 16** - React framework with Turbopack
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **TypeScript** - Type safety

## Features

- 🎨 **Elegant Design** - Dark theme matching the extension's design system
- ✨ **Rich Animations** - Scroll-triggered animations, hover effects, and transitions
- 📱 **Responsive** - Looks great on all devices
- ⚡ **Fast** - Built with Next.js and Turbopack
- 🎯 **Interactive Demo** - Live demo panel showing the extension in action

## Sections

1. **Hero** - Main headline with animated product demo
2. **Features** - 9 feature cards with gradient icons
3. **How It Works** - 4-step interactive guide
4. **Use Cases** - Real-world examples and testimonials
5. **CTA** - Call-to-action with social proof stats
6. **Footer** - Navigation and social links

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Design System

The website uses the same color palette as the extension:

- **Logo Navy Dark**: `#0D1321`
- **Logo Navy**: `#1D2D44`
- **Logo Navy Light**: `#3E5C76`
- **Logo Blue**: `#4A90D9`
- **Logo Blue Bright**: `#5BA4E6`
- **Logo Highlight**: `#7CB9F1`

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles and CSS variables
│   │   ├── layout.tsx     # Root layout with metadata
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Hero.tsx       # Hero section with demo
│   │   ├── DemoPanel.tsx  # Interactive demo component
│   │   ├── Features.tsx   # Features grid
│   │   ├── HowItWorks.tsx # Step-by-step guide
│   │   ├── UseCases.tsx   # Use cases & testimonials
│   │   ├── CTA.tsx        # Call to action
│   │   └── Footer.tsx     # Footer
│   └── lib/
│       └── utils.ts       # Utility functions
├── public/
│   ├── simplest.png       # Logo
│   └── icon128.png        # Icon
└── package.json
```

## Customization

- Edit `src/app/globals.css` to change CSS variables
- Edit `tailwind.config.ts` to extend the theme
- Update components in `src/components/` to modify sections

## License

MIT License

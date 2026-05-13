# 🔥 CommentFuel

<div align="center">

**AI-powered comment & roast generator for TikTok, Instagram, and YouTube**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/AI-Groq-orange)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)](https://commentfuel.vercel.app)

[🚀 Live Demo](https://commentfuel.vercel.app) · [🐛 Report Bug](https://github.com/CodeWithCata/CommentFuel/issues) · [💡 Request Feature](https://github.com/CodeWithCata/CommentFuel/issues)

</div>

---

## 📖 About The Project

CommentFuel is a free, open-source tool that helps content creators generate viral comments and savage roasts using AI. Whether you're trying to boost engagement on your posts or destroy someone in the comments section, CommentFuel has you covered.

### Why CommentFuel?
- 🎯 **Save Time** - Generate engaging comments in seconds, not minutes
- 🧠 **AI-Powered** - Uses Groq's Mixtral 8x7B model for human-like responses
- 🌍 **Multilingual** - Supports 12 languages with local slang
- 💸 **100% Free** - No hidden costs, no premium tiers, just free AI
- 🔓 **Open Source** - MIT licensed, use it however you want

---

## ✨ Features

### 💬 Smart Comment Generator
- Generate platform-specific comments for TikTok, Instagram & YouTube
- 7 different tones: Funny, Savage, Gen Z, NPC, Flirty, Viral, Smart
- Real-time AI generation using Groq's LLM
- One-click copy to clipboard
- Regenerate for fresh, unique results every time
- Smart fallback samples when API rate limits are reached

### 🔥 Rekts Roaster
- Generate savage roasts in 12 languages
- Language-specific slang and cultural references
- 7 roast styles: Savage, Witty, Gen Z, Comeback King, NPC Roast, Viral Roast, Intellectual Burn
- Platform-optimized roasts (TikTok, Instagram, YouTube)
- Auto-detects input language for better results

### 🎨 UI/UX
- Dark mode with purple/red accent colors
- Smooth animations using Framer Motion
- Fully responsive design (mobile, tablet, desktop)
- Clean, intuitive interface
- Lightning-fast performance

---

## 🚀 Quick Deploy (Vercel)

The easiest way to get your own copy running:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodeWithCata/CommentFuel&env=GROQ_API_KEY)

1. Click the button above
2. Add your `GROQ_API_KEY` (get free key at [console.groq.com](https://console.groq.com))
3. Deploy and start using!

---

## 🛠️ Local Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Free Groq API key ([Get it here](https://console.groq.com))

### Setup Commands
```bash
# Clone the repository
git clone https://github.com/CodeWithCata/CommentFuel.git
cd CommentFuel

# Install dependencies
npm install

# Create environment file
echo "GROQ_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev




📊 Tech Stack
Technology	Purpose
Next.js 14	Framework & API routes
TypeScript	Type safety
Groq API	AI text generation
Mixtral 8x7B	Language model
Framer Motion	Animations
Vercel	Hosting & deployment
CSS-in-JS	Styling (no extra deps)
📄 License
MIT License - feel free to use this project however you want!

Copyright (c) 2025 CWcata

👨‍💻 Author
Cata (CWcata)

https://img.shields.io/badge/GitHub-CodeWithCata-181717?style=for-the-badge&logo=github
https://img.shields.io/badge/Twitter-@yourhandle-1DA1F2?style=for-the-badge&logo=twitter
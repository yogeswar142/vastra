# VASTRA — The Virtual Saree Atelier

An ultra-luxury, mobile-first virtual saree try-on experience crafted for heritage Indian handloom showrooms.

---

## ✨ Overview

**VASTRA** bridges centuries of authentic Indian textile artistry (Kanchipuram, Banarasi, and Gadwal silk drapes) with real-time digital atelier technology.

Designed specifically for showroom clients accessing via in-store QR codes on mobile devices:
- **Heritage Visual Identity**: Rich aubergine, warm ivory, silk beige, and antique gold accents.
- **Showroom Staff Authentication**: Secure 6-digit PIN system (`482916`) with automatic focus navigation and mobile numeric keypad support.
- **Mobile-First Workspace**: Ergonomic side-by-side card layout (`01 · SAREE` and `02 · YOU`) optimized for single-hand mobile interaction.
- **2×2 Gallery Drawer**: Clean bottom-sheet selection displaying high-res saree swatches (`KS-104`, `KP-208`, `KS-305`, `GD-412`, `KP-520`) with direct custom photo upload capability.
- **Handloom Lotus Animation**: Symmetrical zari mandala and royal lotus emblem animation representing traditional weaving.
- **High-Definition Try-On Preview**: 1:1 mapped draping preview with toggles between the original photo and the virtual drape, alongside handloom weave specifications.

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Pure Modular CSS with Custom Design Tokens (No Tailwind, no generic UI frameworks)
- **Animation**: Framer Motion
- **Icons**: Lucide React + Bespoke Handloom SVG Motifs
- **Typography**: Cormorant Garamond (Serif Editorial) & DM Sans (Modern Body)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, pnpm, or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

---

## 📱 Supported Devices
Engineered and tested for responsive viewports:
- Mobile: 320px, 360px, 375px, 390px, 414px, 430px
- Tablets: 768px, 1024px
- Desktop: 1440px+

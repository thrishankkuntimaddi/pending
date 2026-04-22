# 🌌 Pending — Life Vision Manager

> *Your dreams, organized. No deadlines. No pressure. Only vision.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Description

**Pending** is a personal life vision management PWA (Progressive Web App) that helps you capture, organize, and visualize everything you aspire to achieve — without the pressure of deadlines.

The problem it solves: Most productivity apps are built around tasks and deadlines. But not everything meaningful in life fits neatly into a to-do list. **Pending** is built for *visions* — your dream motorbike, the home aquarium you've always wanted, the Japan trip you keep putting off, the financial goals you're slowly building towards.

It lets you create hierarchical **vision blocks** — top-level goals broken down into nested sub-blocks — with estimated costs (in INR), categories, and status tracking. A dedicated **Motivation page** keeps you emotionally anchored to *why* you're working so hard, surfacing your total pending dream value and cycling through inspirational quotes.

---

## 🚀 Live Demo

🌐 **[https://thrishankkuntimaddi.github.io/pending](https://thrishankkuntimaddi.github.io/pending)**

> Deployed via **GitHub Pages** using `gh-pages`. The app is installable as a PWA on both desktop and mobile.

---

## 🔐 Login / Demo Credentials

Pending uses **Google Sign-In** (Firebase Authentication) — no username or password required.

1. Visit the live link above
2. Click **"Sign in with Google"**
3. Authenticate with any Google account
4. Your data is stored privately under your user ID in Firestore

> ⚠️ There are no guest/demo credentials. All data is personal and isolated per Google account.

---

## 🧩 Features

### Core Features
- 🧱 **Vision Blocks** — Create top-level vision entries representing big-picture goals or desires
- 🔗 **Nested Sub-blocks** — Break any block down into smaller components, steps, or ideas (unlimited nesting depth)
- 💰 **Cost Estimation** — Attach an estimated cost (₹) to each block; aggregated totals bubble up through the entire tree
- 🏷️ **Status Tracking** — Four lifecycle states: `Idea` → `Planning` → `Active` → `Completed`
- 📂 **Category System** — Organize blocks by: `General`, `Financial`, `Lifestyle`, `Setup`, `Learning`, `Health`, `Family`
- ✏️ **Inline Edit & Delete** — Edit or delete any block directly from the dashboard or detail view; recursive cascade delete removes all sub-blocks
- 📊 **Progress Ring** — Visual SVG ring showing completed sub-blocks vs total for each card

### Dashboard
- 🔢 **Stats Strip** — Live counts for total visions, total blocks, in-progress blocks, and aggregated pending value
- ⚡ **Real-time Sync** — Data updates instantly across tabs/devices via Firestore `onSnapshot` listeners
- 🌱 **Empty State** — Thoughtfully crafted empty state to welcome new users

### Motivation Page
- 🌟 **Dream Value Display** — Shows total monetary value of all your pending visions prominently
- 💬 **Inspirational Quotes** — Curated quote carousel with animated transitions; cycle through at will
- 🎯 **Vision Spotlight** — Randomly highlights one of your top-level visions with its title, description, and cost estimate
- 🔀 **Shuffle** — Reshuffle the featured vision on demand

### Navigation & UX
- 🖥️ **Sidebar (Desktop)** — Persistent navigation with user avatar, total pending value widget, and sign-out
- 📱 **Bottom Nav (Mobile)** — Touch-friendly bottom navigation bar for mobile users
- 🍞 **Breadcrumb Trail** — Hierarchical breadcrumbs for navigating deep block trees
- 🎞️ **Animated Page Transitions** — Smooth fade/slide transitions between routes via Framer Motion
- 🔔 **FAB (Floating Action Button)** — Quick-access button for adding new blocks from any screen

### Technical
- 📲 **PWA / Installable** — Full offline-capable Progressive Web App with service worker, app manifest, and Apple touch icons
- 🔒 **Secure Data Isolation** — All data stored under `users/{uid}/blocks` — no cross-user access possible
- 🎨 **Dark-mode First Design** — Fully dark-themed UI with accent colors, glassmorphism elements, and animated orbs on the Motivation page

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM v7 |
| **Animations** | Framer Motion v12 |
| **Backend / Database** | Firebase Firestore (NoSQL, real-time) |
| **Authentication** | Firebase Authentication (Google OAuth) |
| **PWA** | `vite-plugin-pwa` + Workbox service worker |
| **Deployment** | GitHub Pages via `gh-pages` |
| **Typography** | Inter + Space Grotesk (Google Fonts) |
| **Styling** | Vanilla CSS with CSS custom properties (design tokens) |
| **Linting** | ESLint 9 with React Hooks plugin |

---

## 📂 Project Structure

```
pending/
├── public/                        # Static assets
│   ├── favicon.svg                # App icon (SVG)
│   ├── apple-touch-icon.png       # iOS home screen icon
│   ├── pwa-192x192.png            # PWA manifest icon
│   └── pwa-512x512.png            # PWA manifest icon (large)
│
├── src/
│   ├── main.jsx                   # App entry point — mounts React + AuthProvider
│   ├── App.jsx                    # Root router — auth gate, layout shell, route definitions
│   ├── index.css                  # Global styles, CSS design tokens, all component classes
│   │
│   ├── firebase/
│   │   ├── config.js              # Firebase app initialization
│   │   ├── auth.js                # Google Sign-In, sign-out, auth state listener
│   │   └── blocks.js              # Firestore CRUD — subscribe, add, update, delete (cascade)
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx        # Auth state provider — exposes user, login, logout
│   │   └── BlocksContext.jsx      # Blocks state provider — real-time data, CRUD actions, derived values
│   │
│   ├── hooks/
│   │   └── useBlockTree.js        # Pure utilities — buildTree, aggregateCost, getAncestors, getProgress
│   │
│   ├── pages/
│   │   ├── Login.jsx              # Unauthenticated landing page with Google sign-in
│   │   ├── Dashboard.jsx          # Vision board — root block grid, stats strip, FAB
│   │   ├── BlockView.jsx          # Detail view for a single block — sub-block list, breadcrumb, stats
│   │   └── Motivation.jsx         # Emotional anchor page — total value, quote carousel, vision spotlight
│   │
│   └── components/
│       ├── blocks/
│       │   ├── BlockCard.jsx      # Dashboard grid card — cost, progress ring, status badge, edit/delete
│       │   ├── BlockRow.jsx       # Compact list row used in BlockView sub-block list
│       │   ├── BlockForm.jsx      # Unified create/edit modal form for blocks
│       │   └── StatusBadge.jsx    # Status + Category badge components; exports STATUSES & CATEGORIES
│       ├── layout/
│       │   ├── Sidebar.jsx        # Desktop persistent sidebar — nav, total pending widget, user info
│       │   ├── BottomNav.jsx      # Mobile bottom navigation bar
│       │   └── Breadcrumb.jsx     # Hierarchical breadcrumb trail for nested block navigation
│       └── ui/
│           ├── Loader.jsx         # Full-screen loading spinner
│           ├── Modal.jsx          # Reusable animated modal wrapper
│           └── ProgressRing.jsx   # SVG circular progress ring component
│
├── index.html                     # HTML shell — PWA meta tags, SPA routing fix for GitHub Pages
├── vite.config.js                 # Vite config — base path, PWA plugin, Workbox caching strategies
├── package.json                   # Dependencies and npm scripts
└── eslint.config.js               # ESLint flat config
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js ≥ 18
- A Firebase project with Firestore and Google Authentication enabled

### 1. Clone the repository

```bash
git clone https://github.com/thrishankkuntimaddi/pending.git
cd pending
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173/pending/](http://localhost:5173/pending/) in your browser.

### 5. Build for production

```bash
npm run build
```

### 6. Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then publishes the `dist/` folder to the `gh-pages` branch.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain (`*.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firestore project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket (used even if storage isn't used directly) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

> All variables are prefixed with `VITE_` so Vite exposes them to the client bundle. Never commit `.env` to version control.

---

## 🧠 How It Works

### Data Model

Each block is a flat Firestore document stored at `users/{uid}/blocks/{blockId}`:

```json
{
  "title": "Royal Enfield Himalayan",
  "description": "Adventure motorcycle for weekend trips",
  "cost": 250000,
  "category": "Lifestyle",
  "status": "planning",
  "parentId": null,
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

- **Root blocks** have `parentId: null`
- **Sub-blocks** reference their parent via `parentId`
- The tree is reconstructed client-side from this flat array using `buildTree()` in `useBlockTree.js`

### Real-time Sync Architecture

```
Firestore (users/{uid}/blocks)
        ↓  onSnapshot listener
  BlocksContext (React state)
        ↓  Context API
  Pages & Components (render)
```

`subscribeToBlocks()` establishes a persistent Firestore listener ordered by `createdAt`. The `BlocksContext` holds the flat blocks array in state and exposes derived helpers (`getBlockChildren`, `getAggregatedCost`, `getBlockProgress`, etc.).

### Recursive Cost Aggregation

Each block card shows the **total cost** of itself plus all descendants. This is computed on every render via `getAggregatedCost(blockId)` — a recursive function that walks the flat array depth-first, summing costs bottom-up.

### Cascade Delete

Deleting a block triggers `collectDescendantIds()` — a recursive function that gathers all descendant IDs from the flat array. All IDs (including the target block itself) are deleted in parallel via `Promise.all()`, ensuring no orphan documents remain in Firestore.

### PWA & Caching

The Workbox service worker applies three caching strategies:
- **CacheFirst** — Google Fonts (CSS + font files) are cached for up to 1 year
- **NetworkFirst** — Firebase API calls always try the network first, falling back to cache
- **Precached** — All JS, CSS, HTML, images, and SVG assets are precached at install time

---

## 🚧 Challenges & Solutions

| Challenge | Solution |
|---|---|
| **Infinite nesting with flat Firestore data** | Stored all blocks flat with `parentId` references; `buildTree()` reconstructs the tree client-side, avoiding complex nested Firestore subcollections |
| **Aggregated cost computation** | Implemented a recursive `getAggregatedCost()` that walks the flat array — avoids building a full tree just for cost aggregation |
| **Cascade delete without transactions** | Used `collectDescendantIds()` to gather all descendant IDs before issuing parallel `deleteDoc` calls; atomic enough for a single-user personal app |
| **SPA routing on GitHub Pages** | Added the standard `404.html` redirect trick — GitHub Pages 404s are caught, the path is encoded and redirected to `index.html`, then decoded via inline script |
| **PWA on GitHub Pages sub-path** | Set `base: '/pending/'` in Vite config and `scope`/`start_url` in the PWA manifest to match the sub-path deployment |

---

## 🔮 Future Improvements

- 🖼️ **Image Attachments** — Allow photo uploads per vision block (inspiration boards)
- 📅 **Soft Deadlines** — Optional "target by" dates with gentle reminders (no hard deadlines by design)
- 🔔 **Push Notifications** — Weekly motivation nudge surfacing a random vision
- 📊 **Analytics Dashboard** — Charts for spending categories, completion rates over time
- 🌍 **Multi-currency Support** — Support for currencies beyond INR
- 🤝 **Shared Visions** — Collaborative boards for couple/family goals
- 🏷️ **Tags & Search** — Full-text search and free-form tagging across all blocks
- 🌓 **Light Mode** — Optional light theme toggle

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Make** your changes and commit: `git commit -m "feat: add your feature"`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing component structure — UI primitives in `components/ui/`, feature components in `components/blocks/`, layout in `components/layout/`
- Keep styles in `index.css` using the existing CSS custom properties design system
- Do not add new runtime dependencies without discussion
- Ensure the PWA still builds correctly after changes (`npm run build`)

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Thrish Ank Kuntimaddi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

Built with ❤️ by [Thrish Ank Kuntimaddi](https://github.com/thrishankkuntimaddi)

*"Your future, organised."*

</div>

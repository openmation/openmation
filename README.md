# Openmation

<p align="center">
  <img src="website/public/openmation.png" alt="Openmation Logo" width="120" height="120" style="border-radius: 20px;">
</p>

<p align="center">
  <strong>AI-driven browser automation — record, replay, and share with resilient accuracy</strong>
</p>

<p align="center">
  A beautiful Chrome extension for AI-powered recording and replay — with shareable links and scheduled runs.
</p>

<p align="center">
  <a href="https://openmation.dev">Website</a> •
  <a href="https://chrome.google.com/webstore/detail/openmation">Chrome Web Store</a> •
  <a href="https://openmation.dev/privacy">Privacy Policy</a>
</p>

---

## ✨ Features

### 🎬 **Recording**
- **Keystroke-by-keystroke capture** — Every single key press is recorded for exact replay
- **Full event tracking** — Clicks, scrolls, form inputs, navigation, and more
- **Cross-page recording** — Continue recording seamlessly across page navigations
- **Floating recording panel** — Elegant, non-intrusive UI that floats on any webpage
- **Real-time event counter** — See exactly how many actions have been captured

### 🤖 **AI-Driven Recording & Replay**
- **AI-powered element matching** — Vision-based targeting keeps automations resilient to layout changes
- **Rich context capture** — Screenshots and context improve replay accuracy over time
- **Smart fallbacks** — AI-first replay with selector and text-based fallbacks
- **Provider support** — Works with OpenAI and Claude API keys

### ▶️ **Replay**
- **Pixel-perfect replay** — Automation runs exactly as recorded, every time
- **Visual feedback** — Animated cursor shows exactly where actions are being performed
- **Multi-strategy element finding** — Uses CSS selectors, fallbacks, text content, and position
- **Smart timing** — Respects original recording timing for consistent results
- **Form validation support** — Proper focus/blur events trigger site validation correctly

### 🔗 **Sharing**
- **Shareable links** — Generate a unique URL for any automation
- **One-click run** — Recipients can run automations instantly via the link
- **No extension required for sharing** — Just click the link to start

### ⏰ **Scheduling**
- **Cron-based scheduling** — Set automations to run periodically
- **Preset schedules** — Quick options for hourly, daily, weekly runs
- **Custom cron expressions** — Full flexibility for advanced scheduling

### 📊 **History & Management**
- **Run history** — Track all automation runs with status and timestamps
- **Edit & delete** — Manage your automations with full CRUD support
- **Dark/Light mode** — Beautiful UI that adapts to your preference

---

## 🏗️ Architecture

This is a monorepo containing two main packages:

```
simplest-automation/
├── extension/          # Chrome extension (React + TypeScript)
│   ├── src/
│   │   ├── background/ # Service worker (state management, scheduling)
│   │   ├── content/    # Content scripts (AI recorder, replayer, panel)
│   │   ├── popup/      # Extension popup UI (React)
│   │   └── lib/        # Shared utilities and types
│   └── public/         # Static assets (icons, manifest)
│
└── backend/            # Node.js API server
    └── src/
        ├── routes/     # API endpoints
        └── db.ts       # SQLite database
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Chrome browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simplest-automation.git
   cd simplest-automation
   ```

2. **Install extension dependencies**
   ```bash
   cd extension
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `extension/dist` folder

5. **Install backend dependencies** (optional, for sharing)
   ```bash
   cd ../backend
   npm install
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3002`

---

## 🌐 Production Deployment

### Live URLs
- **Website:** https://openmation.dev
- **API:** https://api.openmation.dev
- **Extension:** [Chrome Web Store](https://chrome.google.com/webstore/detail/openmation)

### Deploy Backend (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add a Volume mounted at `/app/data`
5. Set environment variables:
   ```
   DATABASE_PATH=/app/data/automations.db
   NODE_ENV=production
   ```
6. Add custom domain: `api.openmation.dev`

### Deploy Website (Vercel)

1. Import project on [Vercel](https://vercel.com)
2. Set root directory to `website`
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://api.openmation.dev
   ```
4. Add custom domains: `openmation.dev` and `www.openmation.dev`

### Deploy Extension (Chrome Web Store)

1. Build: `cd extension && npm run build`
2. ZIP the `dist` folder
3. Upload to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

---

## 📖 Usage

### Recording an Automation

1. Click the **Openmation** extension icon
2. Click **"New Automation"**
3. A floating panel appears on the webpage
4. Click **▶️ Start** to begin recording
5. Perform the actions you want to automate
6. Click **⏹️ Stop** when done
7. Enter a name and save

### Running an Automation

1. Open the extension popup
2. Find your automation in the list
3. Click the **▶️ Play** button
4. Watch as your automation runs with visual feedback

### Sharing an Automation

1. Click the **Share** icon on any automation
2. A unique link is copied to your clipboard
3. Send the link to anyone
4. Recipients click **"Run Automation"** to execute it

### Scheduling an Automation

1. Click the **Edit** icon on an automation
2. Enable **"Schedule"**
3. Select a preset or enter a custom cron expression
4. Save — the automation will run automatically

---

## 🛠️ Tech Stack

### Extension
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Radix UI | Accessible primitives |
| Vite | Build tool |
| @crxjs/vite-plugin | Chrome extension bundling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web framework |
| TypeScript | Type safety |
| better-sqlite3 | SQLite database |
| Zod | Schema validation |
| nanoid | Unique ID generation |

---

## 📁 Key Files

### Extension

| File | Description |
|------|-------------|
| `src/content/recorder.ts` | Captures all user interactions keystroke-by-keystroke |
| `src/content/replayer.ts` | Executes recorded automations with precise timing |
| `src/content/panel.ts` | Floating recording panel UI |
| `src/background/index.ts` | Service worker managing state & messaging |
| `src/background/scheduler.ts` | Cron-based automation scheduling |
| `src/popup/App.tsx` | Main extension popup interface |
| `src/lib/storage.ts` | Chrome storage API wrapper |
| `src/lib/types.ts` | TypeScript interfaces and types |

### Backend

| File | Description |
|------|-------------|
| `src/index.ts` | Express server and shared automation landing pages |
| `src/routes/automations.ts` | API endpoints for CRUD operations |
| `src/db.ts` | SQLite database operations |

---

## 🎨 Design Philosophy

Openmation is built with a focus on:

- **Elegance** — UI inspired by Linear.app, Apple, and Notion
- **Reliability** — Pixel-perfect replay through keystroke-level recording
- **Simplicity** — No complex setup, just record and run
- **Accessibility** — Full keyboard support, dark/light modes

---

## 📡 API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/automations/:id` | Get automation by ID |
| `POST` | `/api/automations` | Create a new shared automation |
| `GET` | `/run/:id` | Landing page for shared automation |
| `GET` | `/health` | Health check endpoint |

### Rate Limits
- General API: 100 requests/hour per IP
- Create automation: 20 requests/hour per IP

---

## 🔧 Configuration

### Extension

The extension stores data in `chrome.storage.local`:
- `automations` — Array of saved automations
- `runHistory` — Array of run history entries
- `onboardingComplete` — Boolean for first-time user flow

### Backend

Environment variables:
```bash
PORT=3002  # Server port (default: 3002)
```

Data stored in `data/automations.db` (SQLite).

---

## 📝 Event Types

The recorder captures these event types:

| Event | Description |
|-------|-------------|
| `click` | Mouse clicks on elements |
| `dblclick` | Double clicks |
| `keydown` | Individual key presses |
| `keyup` | Key releases (for special keys) |
| `focus` | Element focus (form fields) |
| `blur` | Element blur (triggers validation) |
| `change` | Value changes (selects, checkboxes) |
| `scroll` | Page/element scrolling |
| `submit` | Form submissions |
| `navigate` | Page navigations |

---

## 🐛 Troubleshooting

### "Could not establish connection" error
The content script may not be injected. Try:
1. Refresh the page
2. Make sure you're not on a `chrome://` or `chrome-extension://` page

### Form values not submitting correctly
Ensure the form field receives `blur` event before submission. The recorder now captures blur events to trigger validation.

### Automation clicks wrong element
The replayer uses multiple strategies to find elements. If an element changes between recording and replay, try:
1. Record with the page in a consistent state
2. Use unique IDs or data-testid attributes on elements

---

## 🗺️ Roadmap

### Planned Features
- [x] **AI-powered recording & replay** — Vision-based resilience for automations
- [ ] **Cloud sync** — Sync automations across devices
- [ ] **Team sharing** — Share automations within teams
- [ ] **Conditional logic** — If/else branching in automations
- [ ] **Variable extraction** — Extract data from pages
- [ ] **Webhook triggers** — Start automations via API
- [ ] **Firefox support** — Cross-browser compatibility

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- [Linear.app](https://linear.app) — Design inspiration
- [shadcn/ui](https://ui.shadcn.com) — Beautiful component library
- [Radix UI](https://radix-ui.com) — Accessible primitives
- [Lucide Icons](https://lucide.dev) — Icon library

---

<p align="center">
  Built with ❤️ by the Openmation team
</p>

# Simplest Automation

A beautiful browser extension for recording, sharing, and running browser automations. Record your actions once, replay them anytime, and share with anyone.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **Record Automations** - Capture clicks, typing, scrolling, and navigation
- **Visual Replay** - Watch automations run with animated cursor
- **Share Links** - Generate shareable URLs that run automations automatically
- **Schedule Runs** - Set up cron schedules for periodic execution
- **Premium UI** - Linear/Apple-inspired design with dark mode support

## Project Structure

```
simplest-automation/
├── extension/          # Chrome extension (React + TypeScript)
│   ├── src/
│   │   ├── popup/      # Extension popup UI
│   │   ├── content/    # Content scripts (recorder, replayer)
│   │   ├── background/ # Service worker
│   │   └── lib/        # Shared utilities
│   └── dist/           # Built extension
├── backend/            # API server (Node.js + Express)
│   ├── src/
│   │   ├── routes/     # API endpoints
│   │   └── db.ts       # SQLite database
│   └── data/           # Database files
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Chrome browser

### 1. Install Dependencies

```bash
# Install extension dependencies
cd extension
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Start the Backend

```bash
cd backend
npm run dev
```

The API server runs at `http://localhost:3002`

### 3. Build the Extension

```bash
cd extension
npm run build
```

### 4. Load the Extension in Chrome

1. Open `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `extension/dist` folder

## Usage

### Recording an Automation

1. Click the extension icon
2. Click "Start New Recording"
3. A floating panel appears on the page
4. Perform your actions (clicks, typing, etc.)
5. Click "Finish" and name your automation

### Running an Automation

1. Open the extension popup
2. Find your automation in the list
3. Click the play button
4. Watch it replay with visual cursor

### Sharing an Automation

1. Hover over an automation card
2. Click the share icon
3. Link is copied to clipboard
4. Anyone with the link can run it (with extension installed)

## Development

### Extension Development

```bash
cd extension
npm run dev    # Watch mode with hot reload
npm run build  # Production build
```

### Backend Development

```bash
cd backend
npm run dev    # Watch mode
npm run build  # Compile TypeScript
npm start      # Run compiled version
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/automations` | Create shareable automation |
| GET | `/api/automations/:id` | Fetch automation by ID |
| GET | `/run/:id` | Landing page for shared automation |
| GET | `/health` | Health check |

## Tech Stack

### Extension
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Vite + CRXJS

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- TypeScript

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please open an issue or submit a PR.

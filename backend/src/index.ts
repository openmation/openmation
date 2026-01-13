import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import automationsRouter from './routes/automations.js';
import { getAutomation } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: '*', // Allow extension access from any origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '1mb' }));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour per IP
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for creating automations
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 creates per hour per IP
  message: { error: 'Too many automations created, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use('/api', apiLimiter);
app.use('/api/automations', createLimiter);

// API routes
app.use('/api/automations', automationsRouter);

// Serve landing page for shared automations
app.get('/run/:id', (req, res) => {
  const { id } = req.params;
  const automation = getAutomation(id);
  
  if (!automation) {
    res.status(404).send(getNotFoundPage());
    return;
  }
  
  res.send(getRunPage(automation.name, automation.events?.length || 0, automation.startUrl, id));
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Openmation API running at http://localhost:${PORT}`);
  console.log(`📋 Share links will be: http://localhost:${PORT}/run/{id}`);
});

// Landing page HTML - Openmation white theme
function getRunPage(name: string, eventCount: number, startUrl: string, id: string): string {
  const escapedName = escapeHtml(name);
  const escapedUrl = escapeHtml(startUrl);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedName} - Openmation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Subtle gradient mesh background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: 
        radial-gradient(ellipse 80% 80% at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 60% 60% at 70% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse 50% 50% at 50% 70%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }
    
    .container {
      max-width: 420px;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    
    .card {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 24px;
      padding: 48px 40px;
      text-align: center;
      box-shadow: 
        0 0 0 1px rgba(0, 0, 0, 0.02),
        0 20px 50px -12px rgba(0, 0, 0, 0.08),
        0 8px 20px -8px rgba(0, 0, 0, 0.04);
    }
    
    .logo {
      width: 72px;
      height: 72px;
      margin: 0 auto 28px;
    }
    
    .logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
      color: #1a1a1a;
    }
    
    .meta {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      margin-bottom: 32px;
    }
    
    .meta span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .meta .dot {
      width: 4px;
      height: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      margin: 0 10px;
    }
    
    .url-preview {
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 32px;
      word-break: break-all;
      text-align: left;
    }
    
    .url-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(0, 0, 0, 0.4);
      margin-bottom: 6px;
      font-weight: 500;
    }
    
    .run-btn {
      width: 100%;
      height: 52px;
      background: #1a1a1a;
      border: none;
      border-radius: 14px;
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .run-btn:hover {
      background: #2a2a2a;
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
    
    .run-btn:active {
      transform: translateY(0);
    }
    
    .run-btn.loading {
      opacity: 0.7;
      pointer-events: none;
    }
    
    .run-btn svg {
      width: 18px;
      height: 18px;
    }
    
    .install-note {
      margin-top: 20px;
      padding: 16px;
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.1);
      border-radius: 12px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.7);
      display: none;
    }
    
    .install-note.visible {
      display: block;
    }
    
    .install-note a {
      color: #3B82F6;
      text-decoration: none;
      font-weight: 500;
    }
    
    .install-note a:hover {
      text-decoration: underline;
    }
    
    .success-msg {
      margin-top: 20px;
      padding: 16px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.15);
      border-radius: 12px;
      font-size: 14px;
      color: #059669;
      display: none;
      font-weight: 500;
    }
    
    .success-msg.visible {
      display: block;
    }
    
    .footer {
      margin-top: 28px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
    }
    
    .footer a {
      background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #2563EB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-decoration: none;
      font-weight: 500;
    }
    
    .footer a:hover {
      opacity: 0.8;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .loading-spinner {
      animation: pulse 1s ease-in-out infinite;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#06B6D4"/>
              <stop offset="50%" style="stop-color:#3B82F6"/>
              <stop offset="100%" style="stop-color:#2563EB"/>
            </linearGradient>
          </defs>
          <!-- Outer spiral ring -->
          <path d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 30, 20 15, 35 12" stroke="url(#gradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
          <!-- Middle spiral -->
          <path d="M50 18 C68 18, 82 32, 82 50 C82 68, 68 82, 50 82 C32 82, 18 68, 18 50 C18 38, 28 28, 42 25" stroke="url(#gradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
          <!-- Inner spiral -->
          <path d="M50 32 C60 32, 68 40, 68 50 C68 60, 60 68, 50 68 C40 68, 32 60, 32 50 C32 44, 38 38, 48 36" stroke="url(#gradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
          <!-- Center dot -->
          <circle cx="50" cy="50" r="8" fill="url(#gradient)"/>
        </svg>
      </div>
      
      <h1>${escapedName}</h1>
      
      <div class="meta">
        <span>${eventCount} actions</span>
        <span class="dot"></span>
        <span>Shared automation</span>
      </div>
      
      <div class="url-preview">
        <div class="url-label">Starts at</div>
        ${escapedUrl}
      </div>
      
      <button class="run-btn" id="runBtn" onclick="runAutomation()">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Run Automation
      </button>
      
      <div class="install-note" id="installNote">
        <strong>Note:</strong> Make sure the Openmation extension is installed on the target page.
      </div>
      
      <div class="success-msg" id="successMsg">
        ✓ Automation started! Check the browser tab.
      </div>
      
      <div class="footer">
        Powered by <a href="https://openmation.com">Openmation</a>
      </div>
    </div>
  </div>
  
  <script>
    const AUTOMATION_ID = '${id}';
    
    function runAutomation() {
      const btn = document.getElementById('runBtn');
      const successMsg = document.getElementById('successMsg');
      
      btn.classList.add('loading');
      btn.innerHTML = '<span class="loading-spinner">Starting...</span>';
      
      // Show success
      successMsg.classList.add('visible');
      btn.innerHTML = '✓ Redirecting...';
      
      // Redirect to start URL with automation ID in hash
      // The extension on the target page will detect and run it
      const targetUrl = new URL('${escapedUrl}');
      targetUrl.hash = 'openmation_run=' + AUTOMATION_ID;
      
      setTimeout(() => {
        window.location.href = targetUrl.toString();
      }, 300);
    }
  </script>
</body>
</html>`;
}

function getNotFoundPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Not Found - Openmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a1a1a;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: 
        radial-gradient(ellipse 80% 80% at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 60% 60% at 70% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 50%);
      pointer-events: none;
    }
    .container {
      text-align: center;
      padding: 40px;
      position: relative;
    }
    h1 { font-size: 72px; opacity: 0.15; margin-bottom: 16px; font-weight: 700; }
    p { color: rgba(0,0,0,0.5); margin-bottom: 24px; }
    a {
      background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #2563EB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover { opacity: 0.8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>This automation doesn't exist or has expired.</p>
    <a href="/">← Go home</a>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

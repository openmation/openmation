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
  console.log(`🚀 Simplest Automation API running at http://localhost:${PORT}`);
  console.log(`📋 Share links will be: http://localhost:${PORT}/run/{id}`);
});

// Landing page HTML
function getRunPage(name: string, eventCount: number, startUrl: string, id: string): string {
  const escapedName = escapeHtml(name);
  const escapedUrl = escapeHtml(startUrl);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedName} - Simplest Automation</title>
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
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #fff;
      -webkit-font-smoothing: antialiased;
    }
    
    .container {
      max-width: 480px;
      width: 100%;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    .logo {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #5E5CE6 0%, #BF5AF2 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      box-shadow: 0 8px 32px rgba(94, 92, 230, 0.3);
    }
    
    .logo svg {
      width: 32px;
      height: 32px;
      color: white;
    }
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    
    .meta {
      color: rgba(255, 255, 255, 0.5);
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
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      margin: 0 10px;
    }
    
    .url-preview {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 32px;
      word-break: break-all;
      text-align: left;
    }
    
    .url-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 6px;
    }
    
    .run-btn {
      width: 100%;
      height: 52px;
      background: linear-gradient(135deg, #5E5CE6 0%, #7B6CF6 100%);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px rgba(94, 92, 230, 0.3);
    }
    
    .run-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(94, 92, 230, 0.4);
    }
    
    .run-btn:active {
      transform: translateY(0);
    }
    
    .run-btn.loading {
      opacity: 0.7;
      pointer-events: none;
    }
    
    .run-btn svg {
      width: 20px;
      height: 20px;
    }
    
    .install-note {
      margin-top: 20px;
      padding: 16px;
      background: rgba(255, 193, 7, 0.1);
      border: 1px solid rgba(255, 193, 7, 0.2);
      border-radius: 10px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
      display: none;
    }
    
    .install-note.visible {
      display: block;
    }
    
    .install-note a {
      color: #FFD60A;
      text-decoration: none;
      font-weight: 500;
    }
    
    .install-note a:hover {
      text-decoration: underline;
    }
    
    .success-msg {
      margin-top: 20px;
      padding: 16px;
      background: rgba(48, 209, 88, 0.1);
      border: 1px solid rgba(48, 209, 88, 0.2);
      border-radius: 10px;
      font-size: 14px;
      color: #30D158;
      display: none;
    }
    
    .success-msg.visible {
      display: block;
    }
    
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
    }
    
    .footer a {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
    }
    
    .footer a:hover {
      color: rgba(255, 255, 255, 0.8);
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
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
        <strong>Note:</strong> Make sure the Simplest Automation extension is installed on the target page.
      </div>
      
      <div class="success-msg" id="successMsg">
        ✓ Automation started! Check the browser tab.
      </div>
      
      <div class="footer">
        Powered by <a href="#">Simplest Automation</a>
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
      targetUrl.hash = 'simplest_run=' + AUTOMATION_ID;
      
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
  <title>Not Found - Simplest Automation</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .container {
      text-align: center;
      padding: 40px;
    }
    h1 { font-size: 72px; opacity: 0.3; margin-bottom: 16px; }
    p { color: rgba(255,255,255,0.6); margin-bottom: 24px; }
    a {
      color: #5E5CE6;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
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

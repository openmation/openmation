import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-1 shadow-md">
          <img 
            src="/icons/icon128.png" 
            alt="Simplest" 
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-[16px] font-semibold tracking-tight logo-gradient-text">Simplest</h1>
          <p className="text-[11px] text-muted-foreground font-medium">Automation</p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}

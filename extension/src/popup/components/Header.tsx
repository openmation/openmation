export function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-xl p-0.5">
          <img 
            src="/icons/icon128.png" 
            alt="Openmation" 
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-[16px] font-semibold tracking-tight logo-gradient-text">Openmation</h1>
          <p className="text-[11px] text-muted-foreground font-medium">Browser Automation</p>
        </div>
      </div>
    </header>
  );
}

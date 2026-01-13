import { createContext, useContext, type ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light';
  resolvedTheme: 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Openmation always uses light theme (white, clean like Google Antigravity)
  return (
    <ThemeContext.Provider value={{ theme: 'light', resolvedTheme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

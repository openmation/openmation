import { Sparkles, History } from 'lucide-react';

interface EmptyStateProps {
  type: 'automations' | 'history';
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === 'automations') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-5">
          <Sparkles className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight mb-1.5 text-foreground">No automations yet</h3>
        <p className="text-[13px] text-muted-foreground max-w-[240px] leading-relaxed">
          Start by recording your first automation. Click the button above to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
        <History className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-[15px] font-semibold tracking-tight mb-1.5 text-foreground">No activity yet</h3>
      <p className="text-[13px] text-muted-foreground max-w-[240px] leading-relaxed">
        Your automation run history will appear here.
      </p>
    </div>
  );
}

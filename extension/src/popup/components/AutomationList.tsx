import { useEffect, useState } from 'react';
import { AutomationCard } from './AutomationCard';
import { EmptyState } from './EmptyState';
import { ScrollArea } from './ui/scroll-area';
import { 
  getAutomations, 
  deleteAutomation, 
  saveAutomation,
  onStorageChange 
} from '@/lib/storage';
import type { Automation } from '@/lib/types';

interface AutomationListProps {
  onEdit: (automation: Automation) => void;
  runningAutomationId?: string;
}

export function AutomationList({ onEdit, runningAutomationId }: AutomationListProps) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      const data = await getAutomations();
      if (mounted) {
        setAutomations(data);
        setIsLoading(false);
      }
    };
    
    loadData();
    
    const unsubscribe = onStorageChange((changes) => {
      if (changes.automations && mounted) {
        setAutomations((changes.automations.newValue as Automation[]) || []);
      }
    });
    
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleRun = async (automation: Automation) => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return;
      
      await chrome.runtime.sendMessage({
        type: 'RUN_AUTOMATION',
        automation,
      });
    } catch (error) {
      console.error('Failed to run automation:', error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteAutomation(id);
    setAutomations(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleEnabled = async (automation: Automation) => {
    const updated = { ...automation, isEnabled: !automation.isEnabled };
    await saveAutomation(updated);
    setAutomations(prev => prev.map(a => a.id === automation.id ? updated : a));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[280px]">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (automations.length === 0) {
    return <EmptyState type="automations" />;
  }

  return (
    <ScrollArea className="h-[320px]">
      <div className="p-4 space-y-2 stagger-children">
        {automations.map((automation) => (
          <AutomationCard
            key={automation.id}
            automation={automation}
            onRun={handleRun}
            onDelete={handleDelete}
            onEdit={onEdit}
            onToggleEnabled={handleToggleEnabled}
            isRunning={runningAutomationId === automation.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

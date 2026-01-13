import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, Clock, Trash2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { EmptyState } from './EmptyState';
import { getRunHistory, onStorageChange, cleanupStaleRuns } from '@/lib/storage';
import { formatRelativeTime, formatDuration } from '@/lib/utils';
import type { RunHistory as RunHistoryType } from '@/lib/types';
import { Button } from './ui/button';

export function RunHistory() {
  const [history, setHistory] = useState<RunHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      // Clean up stale "running" entries first
      await cleanupStaleRuns();
      
      const data = await getRunHistory(50);
      if (mounted) {
        setHistory(data);
        setIsLoading(false);
      }
    };
    
    loadData();
    
    const unsubscribe = onStorageChange((changes) => {
      if (changes.runHistory && mounted) {
        setHistory((changes.runHistory.newValue as RunHistoryType[]) || []);
      }
    });
    
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleClearHistory = async () => {
    await chrome.storage.local.set({ runHistory: [] });
    setHistory([]);
  };

  const getStatusIcon = (status: RunHistoryType['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'paused':
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status: RunHistoryType['status']) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'failed':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'running':
        return 'bg-primary/10 text-primary';
      case 'paused':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
    }
  };

  const getStatusLabel = (status: RunHistoryType['status']) => {
    switch (status) {
      case 'success': return 'Success';
      case 'failed': return 'Failed';
      case 'running': return 'Running';
      case 'paused': return 'Paused';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[280px]">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (history.length === 0) {
    return <EmptyState type="history" />;
  }

  return (
    <ScrollArea className="h-[320px]">
      <div className="p-4 space-y-2">
        {/* Clear history button */}
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="text-xs text-muted-foreground hover:text-destructive gap-1 h-7"
          >
            <Trash2 className="w-3 h-3" />
            Clear History
          </Button>
        </div>
        
        <div className="space-y-2 stagger-children">
        {history.map((run) => (
          <div
            key={run.id}
            className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {getStatusIcon(run.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[14px] font-medium truncate leading-tight">
                    {run.automationName}
                  </h4>
                  <span className={`
                    shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium
                    ${getStatusColor(run.status)}
                  `}>
                    {getStatusLabel(run.status)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(run.startedAt)}
                  </span>
                  {run.completedAt && (
                    <>
                      <span className="text-muted-foreground/30">•</span>
                      <span>{formatDuration(run.completedAt - run.startedAt)}</span>
                    </>
                  )}
                  <span className="text-muted-foreground/30">•</span>
                  <span>{run.eventsCompleted}/{run.totalEvents} events</span>
                </div>
                
                {run.error && (
                  <p className="mt-2 text-xs text-red-500 bg-red-500/5 rounded-lg px-2.5 py-1.5 leading-relaxed">
                    {run.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </ScrollArea>
  );
}

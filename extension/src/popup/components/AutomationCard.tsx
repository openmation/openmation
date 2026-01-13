import { useState } from 'react';
import { 
  Play, 
  MoreHorizontal, 
  Trash2, 
  Settings2,
  Clock,
  Loader2,
  Zap,
  Share2,
  Check,
  Copy
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { formatRelativeTime } from '@/lib/utils';
import { shareAutomation, copyToClipboard } from '@/lib/api';
import type { Automation } from '@/lib/types';

interface AutomationCardProps {
  automation: Automation;
  onRun: (automation: Automation) => void;
  onDelete: (id: string) => void;
  onEdit: (automation: Automation) => void;
  onToggleEnabled: (automation: Automation) => void;
  isRunning?: boolean;
}

export function AutomationCard({
  automation,
  onRun,
  onDelete,
  onEdit,
  onToggleEnabled,
  isRunning = false,
}: AutomationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const eventCount = automation.events?.length || 0;
  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const handleShare = async () => {
    setIsSharing(true);
    setShareError(null);
    setShareSuccess(false);

    try {
      const result = await shareAutomation(automation);
      
      if (result.success && result.shareUrl) {
        await copyToClipboard(result.shareUrl);
        setShareSuccess(true);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setShareSuccess(false);
        }, 3000);
      } else {
        setShareError(result.error || 'Failed to share');
        setTimeout(() => setShareError(null), 3000);
      }
    } catch (error) {
      setShareError('Network error');
      setTimeout(() => setShareError(null), 3000);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div 
      className={`
        group relative rounded-xl border bg-card p-4 
        transition-all duration-200 ease-out
        hover:shadow-md hover:border-border/80
        ${isRunning ? 'border-primary/30 shadow-md shadow-primary/5' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`
          w-9 h-9 rounded-lg flex items-center justify-center shrink-0
          transition-all duration-200
          ${isRunning 
            ? 'bg-primary/10' 
            : 'bg-muted group-hover:bg-primary/10'
          }
        `}>
          {isRunning ? (
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          ) : (
            <Zap className={`w-4 h-4 transition-colors duration-200 ${isHovered ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[14px] font-medium truncate leading-tight">{automation.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {eventCount} event{eventCount !== 1 ? 's' : ''}
                </span>
                {automation.duration && (
                  <>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(automation.duration)}
                    </span>
                  </>
                )}
                <span className="text-muted-foreground/30">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(automation.updatedAt)}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className={`
              flex items-center gap-1 shrink-0
              transition-opacity duration-150
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              {/* Share button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                disabled={isSharing}
                className={`w-8 h-8 rounded-lg transition-colors ${
                  shareSuccess 
                    ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                    : shareError
                    ? 'bg-destructive/10 text-destructive'
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
                title={shareSuccess ? 'Link copied!' : shareError || 'Share'}
              >
                {isSharing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : shareSuccess ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRun(automation)}
                disabled={isRunning}
                className="w-8 h-8 rounded-lg hover:bg-primary/10 hover:text-primary"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={handleShare} disabled={isSharing} className="gap-2">
                    {shareSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Share Link
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(automation)} className="gap-2">
                    <Settings2 className="w-4 h-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(automation.id)}
                    className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share success toast */}
      {shareSuccess && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
          bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full
          shadow-lg animate-fade-up">
          Link copied to clipboard!
        </div>
      )}
      
      {/* Schedule section */}
      {automation.cron && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled</span>
          </div>
          <Switch
            checked={automation.isEnabled}
            onCheckedChange={() => onToggleEnabled(automation)}
            className="scale-90"
          />
        </div>
      )}
      
      {/* Running indicator */}
      {isRunning && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/20 rounded-b-xl overflow-hidden">
          <div 
            className="h-full w-1/3 bg-primary rounded-full"
            style={{
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </div>
  );
}

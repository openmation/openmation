import { useState, useEffect } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { saveAutomation } from '@/lib/storage';
import { CRON_PRESETS, type Automation } from '@/lib/types';

interface EditAutomationDialogProps {
  automation: Automation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function EditAutomationDialog({
  automation,
  open,
  onOpenChange,
  onSaved,
}: EditAutomationDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cron, setCron] = useState<string>('none');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (automation) {
      setName(automation.name);
      setDescription(automation.description || '');
      setCron(automation.cron || 'none');
      setIsEnabled(automation.isEnabled);
    }
  }, [automation]);

  const handleSave = async () => {
    if (!automation || !name.trim()) return;
    
    setIsSaving(true);
    
    try {
      const updated: Automation = {
        ...automation,
        name: name.trim(),
        description: description.trim() || undefined,
        cron: cron !== 'none' ? cron : undefined,
        isEnabled,
        updatedAt: Date.now(),
      };

      await saveAutomation(updated);
      onSaved();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save automation:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveSchedule = () => {
    setCron('none');
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold tracking-tight">Settings</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Configure your automation
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</Label>
            <Input
              id="edit-description"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-10"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Schedule</Label>
              {cron !== 'none' && (
                <button
                  onClick={handleRemoveSchedule}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>
            <Select value={cron} onValueChange={setCron}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Run manually" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Run manually</SelectItem>
                {CRON_PRESETS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {cron !== 'none' && (
              <p className="text-xs text-muted-foreground pl-1">
                {CRON_PRESETS.find(p => p.value === cron)?.description}
              </p>
            )}
          </div>
          
          {cron !== 'none' && (
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/50">
              <div>
                <p className="text-sm font-medium">Auto-run</p>
                <p className="text-xs text-muted-foreground">Run on schedule</p>
              </div>
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
            </div>
          )}
          
          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {automation?.events?.length || 0} events
              {automation?.duration && ` • ${formatDuration(automation.duration)}`}
              {automation && ` • Created ${new Date(automation.createdAt).toLocaleDateString()}`}
            </p>
          </div>
        </div>
        
        <DialogFooter className="px-6 py-4 bg-muted/30 border-t">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="h-9"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name.trim() || isSaving}
            className="h-9 px-4"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

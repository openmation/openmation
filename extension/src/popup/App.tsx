import { useState } from 'react';
import { Header } from './components/Header';
import { RecordingPanel } from './components/RecordingPanel';
import { AutomationList } from './components/AutomationList';
import { RunHistory } from './components/RunHistory';
import { EditAutomationDialog } from './components/EditAutomationDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './components/ThemeProvider';
import type { Automation } from '@/lib/types';

function AppContent() {
  const [, setIsRecording] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);
  const [runningAutomationId] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (automation: Automation) => {
    setEditingAutomation(automation);
  };

  const handleSaved = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-[520px] bg-background overflow-hidden">
      <Header />
      <RecordingPanel onRecordingChange={setIsRecording} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="automations" className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-border/50">
            <TabsList>
              <TabsTrigger value="automations">Automations</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="automations" className="flex-1 m-0 overflow-hidden">
            <AutomationList 
              key={refreshKey}
              onEdit={handleEdit}
              runningAutomationId={runningAutomationId}
            />
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 m-0 overflow-hidden">
            <RunHistory />
          </TabsContent>
        </Tabs>
      </div>
      
      <EditAutomationDialog
        automation={editingAutomation}
        open={!!editingAutomation}
        onOpenChange={(open) => !open && setEditingAutomation(null)}
        onSaved={handleSaved}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  );
}

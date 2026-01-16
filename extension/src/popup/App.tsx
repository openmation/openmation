import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RecordingPanel } from './components/RecordingPanel';
import { AutomationList } from './components/AutomationList';
import { RunHistory } from './components/RunHistory';
import { EditAutomationDialog } from './components/EditAutomationDialog';
import { Onboarding } from './components/Onboarding';
import { AISettings } from './components/AISettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Sparkles } from 'lucide-react';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './components/ThemeProvider';
import type { Automation } from '@/lib/types';

const ONBOARDING_KEY = 'openmation_onboarding_complete';

function AppContent() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [, setIsRecording] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);
  const [runningAutomationId] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('automations');

  // Check if onboarding was completed
  useEffect(() => {
    chrome.storage.local.get(ONBOARDING_KEY, (result) => {
      setShowOnboarding(!result[ONBOARDING_KEY]);
    });
  }, []);

  const handleOnboardingComplete = () => {
    chrome.storage.local.set({ [ONBOARDING_KEY]: true });
    setShowOnboarding(false);
  };

  const handleEdit = (automation: Automation) => {
    setEditingAutomation(automation);
  };

  const handleSaved = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Loading state
  if (showOnboarding === null) {
    return (
      <div className="flex items-center justify-center h-[520px] bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show onboarding for first-time users
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex flex-col h-[520px] bg-background overflow-hidden">
      <Header />
      <RecordingPanel
        onRecordingChange={setIsRecording}
        onOpenAISettings={() => setActiveTab('ai')}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-border/50">
            <TabsList>
              <TabsTrigger value="automations">Automations</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="ai" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                AI
              </TabsTrigger>
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
          
          <TabsContent value="ai" className="flex-1 min-h-0 m-0 overflow-y-auto">
            <AISettings />
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

import { useState } from 'react';
import { Button } from './ui/button';
import { 
  MousePointerClick, 
  Share2, 
  Play, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: MousePointerClick,
    title: 'Record Your Actions',
    description: 'Click "Start Recording" and perform any actions on a webpage. We capture clicks, typing, scrolling, and navigation.',
    color: 'from-slate-700 to-slate-600',
  },
  {
    icon: Play,
    title: 'Replay Anytime',
    description: 'Run your saved automations with a single click. Watch them execute with a visual cursor showing each step.',
    color: 'from-slate-600 to-blue-700',
  },
  {
    icon: Share2,
    title: 'Share With Anyone',
    description: 'Generate a shareable link for any automation. Anyone with the link can run it instantly.',
    color: 'from-blue-700 to-blue-500',
  },
  {
    icon: Sparkles,
    title: 'You\'re All Set!',
    description: 'Start automating your repetitive browser tasks. Save time and share workflows with your team.',
    color: 'from-blue-500 to-sky-400',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col h-[520px] bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img 
            src="/icons/icon48.png" 
            alt="Simplest" 
            className="w-8 h-8 rounded-lg logo-shadow"
          />
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight logo-gradient-text">Simplest</h1>
            <p className="text-[11px] text-muted-foreground font-medium">Automation</p>
          </div>
        </div>
        {!isLastStep && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-6">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl`}>
          <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-3 tracking-tight">
          {step.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-[280px]">
          {step.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border/50">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentStep 
                  ? 'bg-primary w-6' 
                  : index < currentStep
                  ? 'bg-primary/50'
                  : 'bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button 
          onClick={handleNext} 
          className="w-full h-11 gap-2"
        >
          {isLastStep ? (
            <>
              <Check className="w-4 h-4" />
              Get Started
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

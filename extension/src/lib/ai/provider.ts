// AI Provider Interface - Abstraction for different AI vision providers
import type {
  AIFindElementRequest,
  AIFindElementResponse,
  AIDescribeActionRequest,
  AIDescribeActionResponse,
  AIProviderType,
} from '@/lib/types';

export interface AIProvider {
  name: AIProviderType;
  
  /**
   * Find an element on the current page using AI vision
   * @param request - Contains current screenshot, reference screenshot, element crop, and description
   * @returns Coordinates and confidence score
   */
  findElement(request: AIFindElementRequest): Promise<AIFindElementResponse>;
  
  /**
   * Generate a human-readable description of an action
   * @param request - Contains screenshot, element crop, action type, and coordinates
   * @returns Description and element metadata
   */
  describeAction(request: AIDescribeActionRequest): Promise<AIDescribeActionResponse>;
  
  /**
   * Test if the provider is configured and working
   * @returns true if the API key is valid and the provider is reachable
   */
  testConnection(): Promise<boolean>;
}

// Prompts for AI providers - Enhanced for rich context capture
export const AI_PROMPTS = {
  findElement: `You are an expert AI assistant for browser automation element finding.

You will receive:
1. Current page screenshot
2. Reference screenshot from recording (if available)
3. Element crop image (if available)
4. DETAILED GUIDANCE about the element to find, which may include:
   - Element identification (visual description, position, relationships)
   - Widget context (if inside a date picker, dropdown, modal, etc.)
   - Preparation steps that should have been executed
   - DOM path and accessibility information

Your task:
1. FIRST, verify any preparation steps are complete:
   - Is the widget/popup/modal visible that should contain this element?
   - Is the dropdown open, calendar visible, etc.?
2. Locate the target element based on ALL the guidance provided
3. Return exact center coordinates of the element

CRITICAL RULES:
- Return coordinates relative to the viewport (screenshot dimensions)
- Return the CENTER point of the element
- If the element is NOT visible (hidden, needs scrolling, widget closed):
  - Return low confidence (< 0.5)
  - Explain in "preparationNeeded" what must happen first
- Use the element crop image to visually match the exact element
- Consider the widget context - don't click wrong element in wrong widget

Respond in JSON format:
{
  "x": <number - x coordinate of element center>,
  "y": <number - y coordinate of element center>,
  "confidence": <number 0-1 - how sure are you this is correct>,
  "reasoning": "<explain how you found it and why you're confident>",
  "preparationNeeded": "<if element not visible, what needs to happen first - e.g., 'date picker needs to be opened', 'need to scroll down in the dropdown list'>"
}`,

  describeAction: `You are an expert at describing browser UI interactions for automation replay.

Given screenshots and element information, generate DETAILED guidance for finding and interacting with this element later, even if the page layout changes.

You will receive:
1. A screenshot of the webpage
2. A cropped image of the element being interacted with
3. The type of action (click, input, focus, change, submit)
4. The coordinates where the action occurred
5. Optionally, the value being input
6. INTERACTION CONTEXT (if available):
   - Widget type and state (datepicker, dropdown, modal, etc.)
   - Scroll containers and their states
   - DOM path (semantic structure)
   - Nearby sibling elements
   - Accessibility information (role, label)

Your response MUST include:

1. **description** - A clear, action-oriented description
   Example: "Select date '17' in the check-in calendar popup"

2. **elementIdentification** - MULTIPLE ways to identify this element:
   - Visual appearance (exact text, color, icons, size)
   - Position relative to landmarks ("below the 'Check-in' label", "third button in row")
   - Relationship to container ("inside the date picker popup", "within search suggestions")
   - Unique characteristics that distinguish it from similar elements

3. **elementType** - The type of element (button, input, link, etc.)

4. **elementLabel** - The visible text or aria-label

5. **widgetType** - If inside a special widget, what type:
   - datepicker, calendar, dropdown, select, combobox, autocomplete
   - modal, dialog, popover, tooltip, menu, tabs, accordion
   - stepper, slider, table, grid, list, form
   - "none" if not in a special widget

6. **widgetContainer** - How to identify the widget container:
   Example: "Calendar popup with class 'datepicker' positioned below the 'Check in' field"

7. **preparationSteps** - Actions needed BEFORE the main action (array of strings):
   - "Ensure the date picker popup is visible (click 'Check in' input if not)"
   - "Scroll down in the suggestions dropdown to reveal this option"
   - "Wait for the autocomplete results to load"

8. **verificationSteps** - How to verify the action succeeded (array of strings):
   - "The date '17' should appear selected/highlighted"
   - "The input field should update to show the selected date"
   - "The dropdown should close after selection"

Example response for a date picker selection:
{
  "description": "Select date '17' in the check-in date picker calendar",
  "elementIdentification": "A button displaying '17' inside a calendar month grid. Located in the third row of the date grid. The button is within a date picker popup that appears below the 'Check in' input field. It's the only '17' visible in the current month view.",
  "elementType": "button",
  "elementLabel": "17",
  "widgetType": "datepicker",
  "widgetContainer": "A calendar popup panel with class containing 'calendar' or 'datepicker', positioned absolutely below the trigger input field. Contains a month/year header and a grid of date buttons.",
  "preparationSteps": [
    "Verify the date picker popup is visible on screen",
    "If not visible, click the 'Check in' input field to open it",
    "Ensure the calendar is showing the correct month (May 2025)"
  ],
  "verificationSteps": [
    "The date '17' button should have a selected/active visual state",
    "The 'Check in' input field value should update to reflect the selected date",
    "The date picker popup may close after selection"
  ]
}

Respond ONLY with valid JSON. Be specific and detailed - this guidance will be used by AI to find the element later.`,
};

// Import providers statically (safe for service workers - no DOM dependencies)
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';

// Factory function to get the appropriate provider
export function getAIProvider(type: AIProviderType, apiKey: string): AIProvider {
  switch (type) {
    case 'openai':
      return new OpenAIProvider(apiKey);
    case 'anthropic':
      return new AnthropicProvider(apiKey);
    default:
      throw new Error(`Unknown AI provider: ${type}`);
  }
}

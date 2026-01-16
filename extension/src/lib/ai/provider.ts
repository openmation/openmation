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

// Prompts for AI providers
export const AI_PROMPTS = {
  findElement: `You are an AI assistant helping to locate UI elements on a webpage for browser automation.

You will be given:
1. A screenshot of the current webpage
2. Optionally, a reference screenshot from when the action was recorded
3. Optionally, a cropped image of the specific element to find
4. A description of the element to find

Your task is to identify the exact pixel coordinates (x, y) of the CENTER of the target element on the CURRENT screenshot.

IMPORTANT:
- Return coordinates relative to the viewport (the screenshot dimensions)
- If you find the element, provide coordinates of its CENTER
- Include a confidence score from 0 to 1
- If you cannot find the element with confidence > 0.5, return your best guess with low confidence

Respond in JSON format:
{
  "x": <number>,
  "y": <number>,
  "confidence": <number between 0 and 1>,
  "reasoning": "<brief explanation of how you found the element>"
}`,

  describeAction: `You are an AI assistant helping to describe user interactions with a webpage for browser automation.

You will be given:
1. A screenshot of the webpage
2. A cropped image of the element being interacted with
3. The type of action (click, input, etc.)
4. The coordinates where the action occurred
5. Optionally, the value being input

Your task is to generate a clear, human-readable description of this action that could be used to find the same element later, even if the page layout changes slightly.

Focus on:
- The element's visible text or label
- Its visual appearance (color, size, position)
- Its relationship to other elements ("the Submit button below the email field")
- Any unique identifiers visible

Respond in JSON format:
{
  "description": "<human-readable description like 'Click the blue Submit button'>",
  "elementType": "<button|input|link|checkbox|dropdown|etc>",
  "elementLabel": "<the text or aria-label of the element>"
}`,
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

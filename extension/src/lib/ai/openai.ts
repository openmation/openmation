// OpenAI GPT-4 Vision Provider
import type {
  AIFindElementRequest,
  AIFindElementResponse,
  AIDescribeActionRequest,
  AIDescribeActionResponse,
} from '@/lib/types';
import type { AIProvider } from './provider';
import { AI_PROMPTS } from './provider';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o'; // GPT-4o has vision capabilities

export class OpenAIProvider implements AIProvider {
  name = 'openai' as const;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async findElement(request: AIFindElementRequest): Promise<AIFindElementResponse> {
    const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      { type: 'text', text: AI_PROMPTS.findElement },
      { type: 'text', text: `\n\nDescription of element to find: "${request.description}"` },
    ];

    // Add rich AI guidance if available
    if (request.aiGuidance) {
      const guidanceText = this.formatAIGuidance(request.aiGuidance);
      content.push({ type: 'text', text: guidanceText });
    }

    // Add interaction context if available
    if (request.interactionContext) {
      const contextText = this.formatInteractionContext(request.interactionContext);
      content.push({ type: 'text', text: contextText });
    }

    // Add current screenshot
    content.push({
      type: 'image_url',
      image_url: { url: this.formatBase64Image(request.currentScreenshot) },
    });
    content.push({ type: 'text', text: 'Above: Current webpage screenshot' });

    // Add reference screenshot if available
    if (request.referenceScreenshot) {
      content.push({
        type: 'image_url',
        image_url: { url: this.formatBase64Image(request.referenceScreenshot) },
      });
      content.push({ type: 'text', text: 'Above: Reference screenshot from when action was recorded' });
    }

    // Add element crop if available
    if (request.elementCrop) {
      content.push({
        type: 'image_url',
        image_url: { url: this.formatBase64Image(request.elementCrop) },
      });
      content.push({ type: 'text', text: 'Above: Cropped image of the target element' });
    }

    // Add original position hint if available
    if (request.elementRect) {
      content.push({
        type: 'text',
        text: `Original element position: top=${request.elementRect.top}, left=${request.elementRect.left}, width=${request.elementRect.width}, height=${request.elementRect.height}`,
      });
    }

    const response = await this.callAPI(content, 800);
    return this.parseFindElementResponse(response);
  }

  async describeAction(request: AIDescribeActionRequest): Promise<AIDescribeActionResponse> {
    const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      { type: 'text', text: AI_PROMPTS.describeAction },
      {
        type: 'text',
        text: `\n\nAction type: ${request.actionType}\nCoordinates: (${request.coordinates.x}, ${request.coordinates.y})${request.value ? `\nInput value: "${request.value}"` : ''}`,
      },
    ];

    // Add interaction context if available
    if (request.interactionContext) {
      const contextText = this.formatInteractionContext(request.interactionContext);
      content.push({ type: 'text', text: contextText });
    }

    // Add screenshot
    content.push({
      type: 'image_url',
      image_url: { url: this.formatBase64Image(request.screenshot) },
    });
    content.push({ type: 'text', text: 'Above: Webpage screenshot' });

    // Add element crop
    content.push({
      type: 'image_url',
      image_url: { url: this.formatBase64Image(request.elementCrop) },
    });
    content.push({ type: 'text', text: 'Above: The element being interacted with' });

    const response = await this.callAPI(content, 1200); // More tokens for detailed response
    return this.parseDescribeActionResponse(response);
  }

  async testConnection(): Promise<boolean> {
    try {
      console.log('[OpenAI] Testing connection with API key:', this.apiKey?.substring(0, 10) + '...');
      
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: 'Say "OK" if you can read this.' }],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[OpenAI] Connection test failed:', response.status, errorText);
        return false;
      }

      const data = await response.json();
      console.log('[OpenAI] Connection test response:', data);
      return !!data.choices?.[0]?.message?.content;
    } catch (error) {
      console.error('[OpenAI] Connection test error:', error);
      return false;
    }
  }

  private async callAPI(
    content: Array<{ type: string; text?: string; image_url?: { url: string } }>,
    maxTokens: number = 500
  ): Promise<string> {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content,
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.1, // Low temperature for more deterministic responses
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  private formatBase64Image(base64: string): string {
    // Ensure the base64 string has the proper data URL format
    if (base64.startsWith('data:')) {
      return base64;
    }
    // Assume WebP format if not specified
    return `data:image/webp;base64,${base64}`;
  }

  private formatAIGuidance(guidance: NonNullable<AIFindElementRequest['aiGuidance']>): string {
    const parts: string[] = ['\n\n=== AI GUIDANCE FROM RECORDING ==='];
    
    if (guidance.elementIdentification) {
      parts.push(`Element Identification: ${guidance.elementIdentification}`);
    }
    
    if (guidance.widgetType && guidance.widgetType !== 'none') {
      parts.push(`Widget Type: ${guidance.widgetType}`);
    }
    
    if (guidance.widgetContainer) {
      parts.push(`Widget Container: ${guidance.widgetContainer}`);
    }
    
    if (guidance.preparationSteps && guidance.preparationSteps.length > 0) {
      parts.push(`Preparation Steps:\n${guidance.preparationSteps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}`);
    }
    
    return parts.join('\n');
  }

  private formatInteractionContext(context: NonNullable<AIFindElementRequest['interactionContext']>): string {
    const parts: string[] = ['\n\n=== INTERACTION CONTEXT ==='];
    
    // Widget context
    if (context.widgetContext) {
      parts.push(`Widget: ${context.widgetContext.type} (${context.widgetContext.state})`);
      if (context.widgetContext.currentValue) {
        parts.push(`Current Value: "${context.widgetContext.currentValue}"`);
      }
    }
    
    // DOM path
    if (context.domPath.length > 0) {
      parts.push(`DOM Path: ${context.domPath.join(' > ')}`);
    }
    
    // Scroll containers
    if (context.scrollContainers.length > 0) {
      const scrollInfo = context.scrollContainers.map(c => 
        `${c.scrollDirection} scroll (${c.isElementVisible ? 'element visible' : 'needs scroll to reveal'})`
      );
      parts.push(`Scroll Containers: ${scrollInfo.join(', ')}`);
    }
    
    // Sibling elements
    if (context.siblingElements.length > 0) {
      const siblings = context.siblingElements.slice(0, 3).map(s => 
        `"${s.text}" (${s.position})`
      );
      parts.push(`Nearby Elements: ${siblings.join(', ')}`);
    }
    
    // Accessibility info
    if (context.accessibilityInfo.role) {
      parts.push(`Role: ${context.accessibilityInfo.role}`);
    }
    if (context.accessibilityInfo.label) {
      parts.push(`Label: "${context.accessibilityInfo.label}"`);
    }
    
    // Preparation steps
    if (context.preparationSteps.length > 0) {
      parts.push(`Required Preparation:\n${context.preparationSteps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}`);
    }
    
    return parts.join('\n');
  }

  private parseFindElementResponse(response: string): AIFindElementResponse {
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        x: parsed.x || 0,
        y: parsed.y || 0,
        confidence: parsed.confidence || 0,
        reasoning: parsed.reasoning,
        preparationNeeded: parsed.preparationNeeded,
      };
    } catch (error) {
      console.error('[OpenAI] Failed to parse findElement response:', response, error);
      return { x: 0, y: 0, confidence: 0, reasoning: 'Failed to parse response' };
    }
  }

  private parseDescribeActionResponse(response: string): AIDescribeActionResponse {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        description: parsed.description || 'Unknown action',
        elementType: parsed.elementType,
        elementLabel: parsed.elementLabel,
        // Enhanced fields
        elementIdentification: parsed.elementIdentification,
        widgetType: parsed.widgetType,
        widgetContainer: parsed.widgetContainer,
        preparationSteps: parsed.preparationSteps,
        verificationSteps: parsed.verificationSteps,
      };
    } catch (error) {
      console.error('[OpenAI] Failed to parse describeAction response:', response, error);
      return { description: 'Unknown action' };
    }
  }
}

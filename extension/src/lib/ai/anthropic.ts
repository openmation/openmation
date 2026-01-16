// Anthropic Claude Vision Provider
import type {
  AIFindElementRequest,
  AIFindElementResponse,
  AIDescribeActionRequest,
  AIDescribeActionResponse,
} from '@/lib/types';
import type { AIProvider } from './provider';
import { AI_PROMPTS } from './provider';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514'; // Claude with vision capabilities

export class AnthropicProvider implements AIProvider {
  name = 'anthropic' as const;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async findElement(request: AIFindElementRequest): Promise<AIFindElementResponse> {
    const content: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> = [];

    // Add current screenshot
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: this.getMediaType(request.currentScreenshot),
        data: this.stripBase64Prefix(request.currentScreenshot),
      },
    });
    content.push({ type: 'text', text: 'Above: Current webpage screenshot' });

    // Add reference screenshot if available
    if (request.referenceScreenshot) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: this.getMediaType(request.referenceScreenshot),
          data: this.stripBase64Prefix(request.referenceScreenshot),
        },
      });
      content.push({ type: 'text', text: 'Above: Reference screenshot from when action was recorded' });
    }

    // Add element crop if available
    if (request.elementCrop) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: this.getMediaType(request.elementCrop),
          data: this.stripBase64Prefix(request.elementCrop),
        },
      });
      content.push({ type: 'text', text: 'Above: Cropped image of the target element' });
    }

    // Build the prompt with all context
    let promptText = AI_PROMPTS.findElement + `\n\nDescription of element to find: "${request.description}"`;
    
    // Add rich AI guidance if available
    if (request.aiGuidance) {
      promptText += this.formatAIGuidance(request.aiGuidance);
    }
    
    // Add interaction context if available
    if (request.interactionContext) {
      promptText += this.formatInteractionContext(request.interactionContext);
    }
    
    if (request.elementRect) {
      promptText += `\nOriginal element position: top=${request.elementRect.top}, left=${request.elementRect.left}, width=${request.elementRect.width}, height=${request.elementRect.height}`;
    }
    content.push({ type: 'text', text: promptText });

    const response = await this.callAPI(content, 800);
    return this.parseFindElementResponse(response);
  }

  async describeAction(request: AIDescribeActionRequest): Promise<AIDescribeActionResponse> {
    const content: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> = [];

    // Add screenshot
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: this.getMediaType(request.screenshot),
        data: this.stripBase64Prefix(request.screenshot),
      },
    });
    content.push({ type: 'text', text: 'Above: Webpage screenshot' });

    // Add element crop
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: this.getMediaType(request.elementCrop),
        data: this.stripBase64Prefix(request.elementCrop),
      },
    });
    content.push({ type: 'text', text: 'Above: The element being interacted with' });

    // Build the prompt with context
    let promptText = AI_PROMPTS.describeAction +
      `\n\nAction type: ${request.actionType}\nCoordinates: (${request.coordinates.x}, ${request.coordinates.y})${request.value ? `\nInput value: "${request.value}"` : ''}`;
    
    // Add interaction context if available
    if (request.interactionContext) {
      promptText += this.formatInteractionContext(request.interactionContext);
    }
    
    content.push({ type: 'text', text: promptText });

    const response = await this.callAPI(content, 1200); // More tokens for detailed response
    return this.parseDescribeActionResponse(response);
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Say "OK" if you can read this.' }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Anthropic] Connection test failed:', response.status, errorText);
        return false;
      }

      const data = await response.json();
      return !!data.content?.[0]?.text;
    } catch (error) {
      console.error('[Anthropic] Connection test error:', error);
      return false;
    }
  }

  private async callAPI(
    content: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }>,
    maxTokens: number = 500
  ): Promise<string> {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  }

  private getMediaType(base64: string): string {
    if (base64.startsWith('data:image/png')) return 'image/png';
    if (base64.startsWith('data:image/jpeg')) return 'image/jpeg';
    if (base64.startsWith('data:image/gif')) return 'image/gif';
    if (base64.startsWith('data:image/webp')) return 'image/webp';
    // Default to webp
    return 'image/webp';
  }

  private stripBase64Prefix(base64: string): string {
    // Remove data URL prefix if present
    const match = base64.match(/^data:image\/[^;]+;base64,(.+)$/);
    return match ? match[1] : base64;
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
      console.error('[Anthropic] Failed to parse findElement response:', response, error);
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
      console.error('[Anthropic] Failed to parse describeAction response:', response, error);
      return { description: 'Unknown action' };
    }
  }
}

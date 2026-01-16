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

    const response = await this.callAPI(content);
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

    const response = await this.callAPI(content);
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
    content: Array<{ type: string; text?: string; image_url?: { url: string } }>
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
        max_tokens: 500,
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
      };
    } catch (error) {
      console.error('[OpenAI] Failed to parse describeAction response:', response, error);
      return { description: 'Unknown action' };
    }
  }
}

export type AIProviderType = "openai" | "anthropic";

export interface AIFindElementRequest {
  description: string;
  currentScreenshot: string;
  referenceScreenshot?: string;
  elementCrop?: string;
  elementRect?: { top: number; left: number; width: number; height: number };
  aiGuidance?: Record<string, unknown>;
  interactionContext?: Record<string, unknown>;
}

export interface AIFindElementResponse {
  x: number;
  y: number;
  confidence: number;
  reasoning?: string;
  preparationNeeded?: string;
}

export interface AIDescribeActionRequest {
  screenshot: string;
  elementCrop: string;
  actionType: string;
  coordinates: { x: number; y: number };
  value?: string;
  interactionContext?: Record<string, unknown>;
}

export interface AIDescribeActionResponse {
  description: string;
  elementType?: string;
  elementLabel?: string;
  elementIdentification?: string;
  widgetType?: string;
  widgetContainer?: string;
  preparationSteps?: string[];
  verificationSteps?: string[];
}

export const AI_PROMPTS = {
  findElement: `You are an expert AI assistant for browser automation element finding.

Return JSON with:
{
  "x": <number>,
  "y": <number>,
  "confidence": <number 0-1>,
  "reasoning": "<how you found it>",
  "preparationNeeded": "<if element not visible, what must happen first>"
}`,
  describeAction: `You are an expert at describing browser UI interactions for automation replay.

Return JSON with:
{
  "description": "...",
  "elementIdentification": "...",
  "elementType": "...",
  "elementLabel": "...",
  "widgetType": "...",
  "widgetContainer": "...",
  "preparationSteps": ["..."],
  "verificationSteps": ["..."]
}`,
};

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

function formatBase64Image(base64: string): string {
  if (base64.startsWith("data:")) {
    return base64;
  }
  return `data:image/webp;base64,${base64}`;
}

function stripBase64Prefix(base64: string): string {
  const match = base64.match(/^data:image\/[^;]+;base64,(.+)$/);
  return match ? match[1] : base64;
}

function getMediaType(base64: string): string {
  if (base64.startsWith("data:image/png")) return "image/png";
  if (base64.startsWith("data:image/jpeg")) return "image/jpeg";
  if (base64.startsWith("data:image/gif")) return "image/gif";
  if (base64.startsWith("data:image/webp")) return "image/webp";
  return "image/webp";
}

function extractJson(response: string) {
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in response");
  }
  return JSON.parse(jsonMatch[0]);
}

function appendContext(label: string, value?: Record<string, unknown>) {
  if (!value || Object.keys(value).length === 0) return "";
  return `\n\n${label}:\n${JSON.stringify(value, null, 2)}`;
}

export async function openaiFindElement(
  apiKey: string,
  request: AIFindElementRequest
): Promise<AIFindElementResponse> {
  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
    { type: "text", text: AI_PROMPTS.findElement },
    { type: "text", text: `\n\nDescription: "${request.description}"` },
    { type: "text", text: appendContext("AI Guidance", request.aiGuidance) },
    { type: "text", text: appendContext("Interaction Context", request.interactionContext) },
  ];

  content.push({
    type: "image_url",
    image_url: { url: formatBase64Image(request.currentScreenshot) },
  });

  if (request.referenceScreenshot) {
    content.push({
      type: "image_url",
      image_url: { url: formatBase64Image(request.referenceScreenshot) },
    });
  }

  if (request.elementCrop) {
    content.push({
      type: "image_url",
      image_url: { url: formatBase64Image(request.elementCrop) },
    });
  }

  if (request.elementRect) {
    content.push({
      type: "text",
      text: `Original element position: top=${request.elementRect.top}, left=${request.elementRect.left}, width=${request.elementRect.width}, height=${request.elementRect.height}`,
    });
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [{ role: "user", content }],
      max_tokens: 800,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const parsed = extractJson(data.choices?.[0]?.message?.content || "");
  return {
    x: parsed.x || 0,
    y: parsed.y || 0,
    confidence: parsed.confidence || 0,
    reasoning: parsed.reasoning,
    preparationNeeded: parsed.preparationNeeded,
  };
}

export async function openaiDescribeAction(
  apiKey: string,
  request: AIDescribeActionRequest
): Promise<AIDescribeActionResponse> {
  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
    { type: "text", text: AI_PROMPTS.describeAction },
    {
      type: "text",
      text: `\n\nAction type: ${request.actionType}\nCoordinates: (${request.coordinates.x}, ${request.coordinates.y})${request.value ? `\nInput value: "${request.value}"` : ""}`,
    },
    { type: "text", text: appendContext("Interaction Context", request.interactionContext) },
  ];

  content.push({
    type: "image_url",
    image_url: { url: formatBase64Image(request.screenshot) },
  });
  content.push({
    type: "image_url",
    image_url: { url: formatBase64Image(request.elementCrop) },
  });

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [{ role: "user", content }],
      max_tokens: 1200,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const parsed = extractJson(data.choices?.[0]?.message?.content || "");
  return {
    description: parsed.description || "Unknown action",
    elementType: parsed.elementType,
    elementLabel: parsed.elementLabel,
    elementIdentification: parsed.elementIdentification,
    widgetType: parsed.widgetType,
    widgetContainer: parsed.widgetContainer,
    preparationSteps: parsed.preparationSteps,
    verificationSteps: parsed.verificationSteps,
  };
}

export async function anthropicFindElement(
  apiKey: string,
  request: AIFindElementRequest
): Promise<AIFindElementResponse> {
  const content: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> = [];

  content.push({
    type: "image",
    source: {
      type: "base64",
      media_type: getMediaType(request.currentScreenshot),
      data: stripBase64Prefix(request.currentScreenshot),
    },
  });

  if (request.referenceScreenshot) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: getMediaType(request.referenceScreenshot),
        data: stripBase64Prefix(request.referenceScreenshot),
      },
    });
  }

  if (request.elementCrop) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: getMediaType(request.elementCrop),
        data: stripBase64Prefix(request.elementCrop),
      },
    });
  }

  let promptText = AI_PROMPTS.findElement + `\n\nDescription: "${request.description}"`;
  promptText += appendContext("AI Guidance", request.aiGuidance);
  promptText += appendContext("Interaction Context", request.interactionContext);
  if (request.elementRect) {
    promptText += `\nOriginal element position: top=${request.elementRect.top}, left=${request.elementRect.left}, width=${request.elementRect.width}, height=${request.elementRect.height}`;
  }
  content.push({ type: "text", text: promptText });

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20240620",
      max_tokens: 800,
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const parsed = extractJson(data.content?.[0]?.text || "");
  return {
    x: parsed.x || 0,
    y: parsed.y || 0,
    confidence: parsed.confidence || 0,
    reasoning: parsed.reasoning,
    preparationNeeded: parsed.preparationNeeded,
  };
}

export async function anthropicDescribeAction(
  apiKey: string,
  request: AIDescribeActionRequest
): Promise<AIDescribeActionResponse> {
  const content: Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> = [];

  content.push({
    type: "image",
    source: {
      type: "base64",
      media_type: getMediaType(request.screenshot),
      data: stripBase64Prefix(request.screenshot),
    },
  });

  content.push({
    type: "image",
    source: {
      type: "base64",
      media_type: getMediaType(request.elementCrop),
      data: stripBase64Prefix(request.elementCrop),
    },
  });

  let promptText =
    AI_PROMPTS.describeAction +
    `\n\nAction type: ${request.actionType}\nCoordinates: (${request.coordinates.x}, ${request.coordinates.y})${request.value ? `\nInput value: "${request.value}"` : ""}`;
  promptText += appendContext("Interaction Context", request.interactionContext);
  content.push({ type: "text", text: promptText });

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20240620",
      max_tokens: 1200,
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const parsed = extractJson(data.content?.[0]?.text || "");
  return {
    description: parsed.description || "Unknown action",
    elementType: parsed.elementType,
    elementLabel: parsed.elementLabel,
    elementIdentification: parsed.elementIdentification,
    widgetType: parsed.widgetType,
    widgetContainer: parsed.widgetContainer,
    preparationSteps: parsed.preparationSteps,
    verificationSteps: parsed.verificationSteps,
  };
}

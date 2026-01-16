// Widget Detection Module
// Detects common UI widget patterns by analyzing DOM structure, ARIA attributes, and CSS
import type {
  WidgetType,
  WidgetState,
  WidgetContext,
  ScrollContainer,
  SiblingElement,
  AccessibilityInfo,
  InteractionContext,
} from './types';
import { getUniqueSelector } from './utils';

// ============ WIDGET DETECTION ============

// Common widget class/attribute patterns for detection
const WIDGET_PATTERNS: Record<WidgetType, {
  roles: string[];
  classPatterns: RegExp[];
  dataAttributes: string[];
  tagNames: string[];
}> = {
  datepicker: {
    roles: ['grid', 'gridcell', 'application'],
    classPatterns: [/datepicker/i, /calendar/i, /date-picker/i, /react-datepicker/i, /flatpickr/i, /pikaday/i],
    dataAttributes: ['data-date', 'data-day', 'data-month', 'data-year'],
    tagNames: [],
  },
  timepicker: {
    roles: ['listbox', 'grid'],
    classPatterns: [/timepicker/i, /time-picker/i, /time-select/i],
    dataAttributes: ['data-time', 'data-hour', 'data-minute'],
    tagNames: [],
  },
  calendar: {
    roles: ['grid', 'gridcell'],
    classPatterns: [/calendar/i, /month-view/i, /day-grid/i],
    dataAttributes: ['data-calendar'],
    tagNames: [],
  },
  dropdown: {
    roles: ['listbox', 'menu'],
    classPatterns: [/dropdown/i, /drop-down/i, /popover-content/i],
    dataAttributes: ['data-radix-popper-content-wrapper', 'data-headlessui-state'],
    tagNames: [],
  },
  select: {
    roles: ['listbox', 'combobox'],
    classPatterns: [/select/i, /selectbox/i],
    dataAttributes: ['data-select'],
    tagNames: ['SELECT'],
  },
  combobox: {
    roles: ['combobox', 'listbox'],
    classPatterns: [/combobox/i, /combo-box/i],
    dataAttributes: ['data-combobox'],
    tagNames: [],
  },
  autocomplete: {
    roles: ['combobox', 'listbox'],
    classPatterns: [/autocomplete/i, /auto-complete/i, /typeahead/i, /suggestion/i],
    dataAttributes: ['data-autocomplete', 'data-testid*="suggestion"'],
    tagNames: [],
  },
  modal: {
    roles: ['dialog', 'alertdialog'],
    classPatterns: [/modal/i, /dialog/i, /overlay/i],
    dataAttributes: ['data-modal', 'data-dialog', 'data-radix-dialog-content'],
    tagNames: [],
  },
  dialog: {
    roles: ['dialog', 'alertdialog'],
    classPatterns: [/dialog/i],
    dataAttributes: ['data-dialog'],
    tagNames: ['DIALOG'],
  },
  popover: {
    roles: ['tooltip', 'dialog'],
    classPatterns: [/popover/i, /pop-over/i, /floating/i],
    dataAttributes: ['data-popover', 'data-radix-popper'],
    tagNames: [],
  },
  tooltip: {
    roles: ['tooltip'],
    classPatterns: [/tooltip/i, /tip/i],
    dataAttributes: ['data-tooltip'],
    tagNames: [],
  },
  menu: {
    roles: ['menu', 'menubar'],
    classPatterns: [/menu(?!item)/i, /nav-menu/i],
    dataAttributes: ['data-menu'],
    tagNames: [],
  },
  submenu: {
    roles: ['menu'],
    classPatterns: [/submenu/i, /sub-menu/i, /nested-menu/i],
    dataAttributes: ['data-submenu'],
    tagNames: [],
  },
  'context-menu': {
    roles: ['menu'],
    classPatterns: [/context-menu/i, /contextmenu/i, /right-click/i],
    dataAttributes: ['data-context-menu'],
    tagNames: [],
  },
  tabs: {
    roles: ['tablist', 'tab', 'tabpanel'],
    classPatterns: [/tabs?(?!le)/i, /tab-list/i],
    dataAttributes: ['data-tabs', 'data-radix-tabs'],
    tagNames: [],
  },
  accordion: {
    roles: ['region', 'button'],
    classPatterns: [/accordion/i, /collapsible/i],
    dataAttributes: ['data-accordion', 'data-radix-accordion'],
    tagNames: [],
  },
  collapse: {
    roles: ['region'],
    classPatterns: [/collapse/i, /expandable/i],
    dataAttributes: ['data-collapse'],
    tagNames: [],
  },
  slider: {
    roles: ['slider'],
    classPatterns: [/slider/i, /range-slider/i],
    dataAttributes: ['data-slider'],
    tagNames: [],
  },
  range: {
    roles: ['slider'],
    classPatterns: [/range/i],
    dataAttributes: ['data-range'],
    tagNames: ['INPUT[type="range"]'],
  },
  stepper: {
    roles: ['spinbutton'],
    classPatterns: [/stepper/i, /number-input/i, /quantity/i],
    dataAttributes: ['data-stepper'],
    tagNames: [],
  },
  table: {
    roles: ['table', 'grid'],
    classPatterns: [/table/i, /data-grid/i],
    dataAttributes: ['data-table'],
    tagNames: ['TABLE'],
  },
  grid: {
    roles: ['grid', 'treegrid'],
    classPatterns: [/grid/i, /data-grid/i],
    dataAttributes: ['data-grid'],
    tagNames: [],
  },
  list: {
    roles: ['list', 'listbox'],
    classPatterns: [/list(?!en)/i, /items/i],
    dataAttributes: ['data-list'],
    tagNames: ['UL', 'OL'],
  },
  form: {
    roles: ['form'],
    classPatterns: [/form/i],
    dataAttributes: ['data-form'],
    tagNames: ['FORM'],
  },
  search: {
    roles: ['search', 'searchbox'],
    classPatterns: [/search/i],
    dataAttributes: ['data-search'],
    tagNames: ['INPUT[type="search"]'],
  },
  none: {
    roles: [],
    classPatterns: [],
    dataAttributes: [],
    tagNames: [],
  },
};

/**
 * Detect the widget type that contains the given element
 */
export function detectWidgetType(element: Element): WidgetType {
  // Check element and its ancestors
  let current: Element | null = element;
  let depth = 0;
  const maxDepth = 10;

  while (current && depth < maxDepth) {
    const detectedType = detectWidgetTypeForElement(current);
    if (detectedType !== 'none') {
      return detectedType;
    }
    current = current.parentElement;
    depth++;
  }

  return 'none';
}

function detectWidgetTypeForElement(element: Element): WidgetType {
  const role = element.getAttribute('role')?.toLowerCase() || '';
  const className = element.className?.toString() || '';
  const tagName = element.tagName;

  // Check each widget type
  for (const [widgetType, patterns] of Object.entries(WIDGET_PATTERNS) as [WidgetType, typeof WIDGET_PATTERNS[WidgetType]][]) {
    if (widgetType === 'none') continue;

    // Check ARIA role
    if (patterns.roles.some(r => role.includes(r.toLowerCase()))) {
      return widgetType;
    }

    // Check class patterns
    if (patterns.classPatterns.some(pattern => pattern.test(className))) {
      return widgetType;
    }

    // Check data attributes
    for (const attr of patterns.dataAttributes) {
      if (attr.includes('*')) {
        // Wildcard match
        const baseAttr = attr.split('*')[0];
        if (Array.from(element.attributes).some(a => a.name.startsWith(baseAttr))) {
          return widgetType;
        }
      } else if (element.hasAttribute(attr)) {
        return widgetType;
      }
    }

    // Check tag names
    if (patterns.tagNames.includes(tagName)) {
      return widgetType;
    }
  }

  return 'none';
}

/**
 * Find the widget container for an element
 */
export function findWidgetContainer(element: Element): WidgetContext | null {
  let current: Element | null = element;
  let depth = 0;
  const maxDepth = 15;

  while (current && depth < maxDepth) {
    const widgetType = detectWidgetTypeForElement(current);
    if (widgetType !== 'none') {
      return buildWidgetContext(current, widgetType);
    }
    current = current.parentElement;
    depth++;
  }

  return null;
}

function buildWidgetContext(container: Element, type: WidgetType): WidgetContext {
  const state = detectWidgetState(container);
  const containerSelector = getUniqueSelector(container);
  const triggerSelector = findWidgetTrigger(container);
  const currentValue = extractWidgetValue(container, type);
  const options = extractWidgetOptions(container, type);

  return {
    type,
    state,
    containerSelector,
    triggerSelector,
    currentValue,
    options,
  };
}

function detectWidgetState(element: Element): WidgetState {
  // Check ARIA expanded
  const ariaExpanded = element.getAttribute('aria-expanded');
  if (ariaExpanded === 'true') return 'expanded';
  if (ariaExpanded === 'false') return 'collapsed';

  // Check ARIA hidden
  const ariaHidden = element.getAttribute('aria-hidden');
  if (ariaHidden === 'true') return 'closed';

  // Check data-state (Radix UI)
  const dataState = element.getAttribute('data-state');
  if (dataState === 'open') return 'open';
  if (dataState === 'closed') return 'closed';

  // Check visibility
  if (element instanceof HTMLElement) {
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return 'closed';
    }
  }

  // Check for open class patterns
  const className = element.className?.toString() || '';
  if (/\bopen\b|\bactive\b|\bshow\b|\bvisible\b/i.test(className)) {
    return 'open';
  }
  if (/\bclosed\b|\binactive\b|\bhidden\b/i.test(className)) {
    return 'closed';
  }

  return 'open'; // Default to open if visible
}

function findWidgetTrigger(container: Element): string | undefined {
  // Look for aria-controls pointing to this container
  const containerId = container.id;
  if (containerId) {
    const trigger = document.querySelector(`[aria-controls="${containerId}"]`);
    if (trigger) return getUniqueSelector(trigger);
  }

  // Look for common trigger patterns near the container
  const parent = container.parentElement;
  if (parent) {
    // Find buttons or inputs that might trigger this widget
    const potentialTriggers = parent.querySelectorAll('button, input, [role="button"], [tabindex="0"]');
    for (const trigger of potentialTriggers) {
      if (trigger !== container && !container.contains(trigger)) {
        return getUniqueSelector(trigger);
      }
    }
  }

  return undefined;
}

function extractWidgetValue(container: Element, type: WidgetType): string | undefined {
  switch (type) {
    case 'datepicker':
    case 'calendar': {
      // Look for selected date
      const selected = container.querySelector('[aria-selected="true"], .selected, [data-selected="true"]');
      return selected?.textContent?.trim();
    }
    case 'select':
    case 'dropdown':
    case 'combobox': {
      // Look for selected option
      const selected = container.querySelector('[aria-selected="true"], .selected, option:checked');
      return selected?.textContent?.trim();
    }
    default:
      return undefined;
  }
}

function extractWidgetOptions(container: Element, type: WidgetType): string[] | undefined {
  if (!['select', 'dropdown', 'combobox', 'autocomplete', 'list'].includes(type)) {
    return undefined;
  }

  const options: string[] = [];
  const optionElements = container.querySelectorAll('[role="option"], option, li, [data-testid*="option"]');

  for (const opt of optionElements) {
    const text = opt.textContent?.trim();
    if (text && text.length < 100) {
      options.push(text);
    }
    if (options.length >= 20) break; // Limit options captured
  }

  return options.length > 0 ? options : undefined;
}

// ============ SCROLL CONTAINER ANALYSIS ============

/**
 * Analyze all scroll containers between an element and the viewport
 */
export function analyzeScrollContainers(element: Element): ScrollContainer[] {
  const containers: ScrollContainer[] = [];
  let current: Element | null = element.parentElement;

  while (current && current !== document.body) {
    if (isScrollable(current)) {
      const container = buildScrollContainer(current, element);
      containers.push(container);
    }
    current = current.parentElement;
  }

  return containers;
}

function isScrollable(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;

  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  const overflowX = style.overflowX;

  const hasVerticalScroll = (overflowY === 'scroll' || overflowY === 'auto') && 
                            element.scrollHeight > element.clientHeight;
  const hasHorizontalScroll = (overflowX === 'scroll' || overflowX === 'auto') && 
                              element.scrollWidth > element.clientWidth;

  return hasVerticalScroll || hasHorizontalScroll;
}

function buildScrollContainer(container: Element, targetElement: Element): ScrollContainer {
  const htmlContainer = container as HTMLElement;
  const style = window.getComputedStyle(container);

  const hasVerticalScroll = (style.overflowY === 'scroll' || style.overflowY === 'auto') && 
                            htmlContainer.scrollHeight > htmlContainer.clientHeight;
  const hasHorizontalScroll = (style.overflowX === 'scroll' || style.overflowX === 'auto') && 
                              htmlContainer.scrollWidth > htmlContainer.clientWidth;

  let scrollDirection: 'vertical' | 'horizontal' | 'both' = 'vertical';
  if (hasVerticalScroll && hasHorizontalScroll) scrollDirection = 'both';
  else if (hasHorizontalScroll) scrollDirection = 'horizontal';

  const containerRect = container.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  // Check if element is visible within the scroll container
  const isElementVisible = 
    targetRect.top >= containerRect.top &&
    targetRect.bottom <= containerRect.bottom &&
    targetRect.left >= containerRect.left &&
    targetRect.right <= containerRect.right;

  // Calculate scroll position needed to reveal element
  let scrollToReveal: { x: number; y: number } | undefined;
  if (!isElementVisible) {
    const scrollY = targetRect.top - containerRect.top + htmlContainer.scrollTop - containerRect.height / 2;
    const scrollX = targetRect.left - containerRect.left + htmlContainer.scrollLeft - containerRect.width / 2;
    scrollToReveal = {
      x: Math.max(0, Math.min(scrollX, htmlContainer.scrollWidth - htmlContainer.clientWidth)),
      y: Math.max(0, Math.min(scrollY, htmlContainer.scrollHeight - htmlContainer.clientHeight)),
    };
  }

  return {
    selector: getUniqueSelector(container),
    scrollDirection,
    currentScroll: { x: htmlContainer.scrollLeft, y: htmlContainer.scrollTop },
    maxScroll: { 
      x: htmlContainer.scrollWidth - htmlContainer.clientWidth, 
      y: htmlContainer.scrollHeight - htmlContainer.clientHeight 
    },
    isElementVisible,
    scrollToReveal,
  };
}

// ============ DOM PATH BUILDING ============

/**
 * Build a semantic DOM path for an element
 */
export function buildDomPath(element: Element): string[] {
  const path: string[] = [];
  let current: Element | null = element;
  let depth = 0;
  const maxDepth = 15;

  while (current && current !== document.body && depth < maxDepth) {
    const semanticLabel = getSemanticLabel(current);
    if (semanticLabel) {
      path.unshift(semanticLabel);
    }
    current = current.parentElement;
    depth++;
  }

  return path;
}

function getSemanticLabel(element: Element): string | null {
  // Check for role
  const role = element.getAttribute('role');
  if (role) return role;

  // Check for common semantic elements
  const tagName = element.tagName.toLowerCase();
  const semanticTags = ['form', 'nav', 'header', 'footer', 'main', 'aside', 'article', 'section'];
  if (semanticTags.includes(tagName)) return tagName;

  // Check for labeled elements
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel.toLowerCase().replace(/\s+/g, '-');

  // Check for widget types in class names
  const className = element.className?.toString() || '';
  const widgetPatterns = [
    /datepicker/i, /calendar/i, /dropdown/i, /modal/i, /dialog/i,
    /menu/i, /tabs?/i, /accordion/i, /stepper/i, /form/i, /search/i
  ];
  for (const pattern of widgetPatterns) {
    if (pattern.test(className)) {
      return pattern.source.toLowerCase().replace(/[\\^$]/g, '');
    }
  }

  return null;
}

// ============ ACCESSIBILITY INFO ============

/**
 * Collect accessibility information for an element
 */
export function getAccessibilityInfo(element: Element): AccessibilityInfo {
  return {
    role: element.getAttribute('role') || undefined,
    label: element.getAttribute('aria-label') || 
           element.getAttribute('aria-labelledby') ? 
             document.getElementById(element.getAttribute('aria-labelledby')!)?.textContent?.trim() : 
             undefined,
    description: element.getAttribute('aria-description') || 
                 element.getAttribute('aria-describedby') ? 
                   document.getElementById(element.getAttribute('aria-describedby')!)?.textContent?.trim() : 
                   undefined,
    expanded: element.getAttribute('aria-expanded') === 'true' ? true : 
              element.getAttribute('aria-expanded') === 'false' ? false : undefined,
    selected: element.getAttribute('aria-selected') === 'true' ? true :
              element.getAttribute('aria-selected') === 'false' ? false : undefined,
    checked: element.getAttribute('aria-checked') === 'true' ? true :
             element.getAttribute('aria-checked') === 'false' ? false : undefined,
    disabled: element.getAttribute('aria-disabled') === 'true' ||
              (element as HTMLInputElement).disabled === true,
    required: element.getAttribute('aria-required') === 'true' ||
              (element as HTMLInputElement).required === true,
  };
}

// ============ SIBLING ELEMENTS ============

/**
 * Find nearby interactive sibling elements for context
 */
export function findSiblingInteractiveElements(element: Element): SiblingElement[] {
  const siblings: SiblingElement[] = [];
  const elementRect = element.getBoundingClientRect();
  const searchRadius = 150; // pixels

  // Get all interactive elements near this one
  const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex="0"]';
  const allInteractive = document.querySelectorAll(interactiveSelectors);

  for (const el of allInteractive) {
    if (el === element) continue;
    
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const elCenterX = elementRect.left + elementRect.width / 2;
    const elCenterY = elementRect.top + elementRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(centerX - elCenterX, 2) + 
      Math.pow(centerY - elCenterY, 2)
    );

    if (distance > searchRadius) continue;

    // Determine relative position
    let position: SiblingElement['position'];
    const dx = centerX - elCenterX;
    const dy = centerY - elCenterY;

    if (Math.abs(dy) > Math.abs(dx)) {
      position = dy < 0 ? 'above' : 'below';
    } else {
      position = dx < 0 ? 'left' : 'right';
    }

    const text = el.textContent?.trim().slice(0, 50) || 
                 el.getAttribute('aria-label') || 
                 (el as HTMLInputElement).placeholder || '';

    if (text) {
      siblings.push({
        selector: getUniqueSelector(el),
        text,
        position,
      });
    }

    if (siblings.length >= 8) break; // Limit siblings captured
  }

  return siblings;
}

// ============ MAIN CONTEXT BUILDER ============

/**
 * Capture full interaction context for an element
 */
export function captureInteractionContext(element: Element): InteractionContext {
  const scrollContainers = analyzeScrollContainers(element);
  const widgetContext = findWidgetContainer(element);
  const domPath = buildDomPath(element);
  const siblingElements = findSiblingInteractiveElements(element);
  const accessibilityInfo = getAccessibilityInfo(element);

  // Generate preparation steps based on context
  const preparationSteps = generatePreparationSteps(scrollContainers, widgetContext);

  return {
    preparationSteps,
    scrollContainers,
    widgetContext: widgetContext || undefined,
    domPath,
    siblingElements,
    accessibilityInfo,
  };
}

/**
 * Generate preparation steps based on scroll and widget context
 */
function generatePreparationSteps(
  scrollContainers: ScrollContainer[],
  widgetContext: WidgetContext | null
): string[] {
  const steps: string[] = [];

  // Add widget opening step if needed
  if (widgetContext?.state === 'closed' && widgetContext.triggerSelector) {
    steps.push(`Open the ${widgetContext.type} by clicking: ${widgetContext.triggerSelector}`);
  }

  // Add scroll steps for each container that needs scrolling
  for (const container of scrollContainers) {
    if (!container.isElementVisible && container.scrollToReveal) {
      steps.push(
        `Scroll ${container.scrollDirection} in container ${container.selector} to position (${Math.round(container.scrollToReveal.x)}, ${Math.round(container.scrollToReveal.y)})`
      );
    }
  }

  return steps;
}

/**
 * Generate a human-readable description of the interaction context
 */
export function describeInteractionContext(context: InteractionContext): string {
  const parts: string[] = [];

  // Describe widget context
  if (context.widgetContext) {
    parts.push(`Inside a ${context.widgetContext.type} (${context.widgetContext.state})`);
    if (context.widgetContext.currentValue) {
      parts.push(`Current value: "${context.widgetContext.currentValue}"`);
    }
  }

  // Describe DOM path
  if (context.domPath.length > 0) {
    parts.push(`Path: ${context.domPath.join(' > ')}`);
  }

  // Describe scroll context
  if (context.scrollContainers.length > 0) {
    const scrollInfo = context.scrollContainers.map(c => 
      `${c.scrollDirection} scroll container ${c.isElementVisible ? '(visible)' : '(needs scroll)'}`
    );
    parts.push(`Scroll context: ${scrollInfo.join(', ')}`);
  }

  // Describe nearby elements
  if (context.siblingElements.length > 0) {
    const nearbyDesc = context.siblingElements
      .slice(0, 3)
      .map(s => `"${s.text}" (${s.position})`)
      .join(', ');
    parts.push(`Nearby: ${nearbyDesc}`);
  }

  // Describe accessibility info
  if (context.accessibilityInfo.role) {
    parts.push(`Role: ${context.accessibilityInfo.role}`);
  }
  if (context.accessibilityInfo.label) {
    parts.push(`Label: "${context.accessibilityInfo.label}"`);
  }

  return parts.join('. ');
}

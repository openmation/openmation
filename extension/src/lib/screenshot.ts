// Screenshot capture utilities for AI-powered recording
// Screenshots are captured via the background service worker using chrome.tabs.captureVisibleTab

/**
 * Request a screenshot capture from the background service worker
 * Returns a compressed WebP base64 string
 */
export async function captureScreenshot(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }
      if (response?.screenshot) {
        resolve(response.screenshot);
      } else {
        reject(new Error('No screenshot returned'));
      }
    });
  });
}

/**
 * Capture and crop a specific element from the page
 * @param element - The element to capture
 * @param padding - Padding around the element in pixels
 */
export async function captureElementCrop(
  element: Element,
  padding: number = 20
): Promise<string> {
  // Get element bounding rect
  const rect = element.getBoundingClientRect();
  
  // Request screenshot with crop parameters
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: 'CAPTURE_ELEMENT_CROP',
        crop: {
          x: Math.max(0, rect.left - padding),
          y: Math.max(0, rect.top - padding),
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (response?.error) {
          reject(new Error(response.error));
          return;
        }
        if (response?.screenshot) {
          resolve(response.screenshot);
        } else {
          reject(new Error('No screenshot returned'));
        }
      }
    );
  });
}

/**
 * Capture visual context about an element
 */
export function captureVisualContext(element: Element): {
  elementColor?: string;
  elementSize?: { width: number; height: number };
  surroundingText?: string;
  relativePosition?: string;
  pageTitle?: string;
  pageUrl?: string;
} {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  // Get dominant color (background or text color)
  const bgColor = computedStyle.backgroundColor;
  const textColor = computedStyle.color;
  const elementColor = bgColor !== 'rgba(0, 0, 0, 0)' ? bgColor : textColor;
  
  // Get surrounding text
  const parent = element.parentElement;
  let surroundingText = '';
  if (parent) {
    const siblings = Array.from(parent.children);
    const siblingTexts = siblings
      .filter(s => s !== element && s instanceof HTMLElement)
      .map(s => (s as HTMLElement).innerText?.trim())
      .filter(t => t && t.length < 100)
      .slice(0, 3);
    surroundingText = siblingTexts.join(' | ');
  }
  
  // Determine relative position
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  let horizontalPos = centerX < viewportWidth / 3 ? 'left' : centerX > viewportWidth * 2 / 3 ? 'right' : 'center';
  let verticalPos = centerY < viewportHeight / 3 ? 'top' : centerY > viewportHeight * 2 / 3 ? 'bottom' : 'middle';
  const relativePosition = `${verticalPos}-${horizontalPos}`;
  
  return {
    elementColor,
    elementSize: { width: rect.width, height: rect.height },
    surroundingText: surroundingText.slice(0, 200),
    relativePosition,
    pageTitle: document.title,
    pageUrl: window.location.href,
  };
}

/**
 * Compress an image to WebP format with reduced quality
 * Used to reduce storage size of screenshots
 */
export function compressImage(
  base64Image: string,
  maxWidth: number = 1280,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      // Create canvas and draw
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to WebP
      const webpBase64 = canvas.toDataURL('image/webp', quality);
      resolve(webpBase64);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = base64Image;
  });
}

/**
 * Crop an image to a specific region
 */
export function cropImage(
  base64Image: string,
  crop: { x: number; y: number; width: number; height: number },
  sourceViewport: { width: number; height: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate scale factor between image and viewport
      const scaleX = img.width / sourceViewport.width;
      const scaleY = img.height / sourceViewport.height;
      
      // Scale crop coordinates
      const scaledCrop = {
        x: crop.x * scaleX,
        y: crop.y * scaleY,
        width: crop.width * scaleX,
        height: crop.height * scaleY,
      };
      
      // Ensure crop is within bounds
      scaledCrop.x = Math.max(0, scaledCrop.x);
      scaledCrop.y = Math.max(0, scaledCrop.y);
      scaledCrop.width = Math.min(scaledCrop.width, img.width - scaledCrop.x);
      scaledCrop.height = Math.min(scaledCrop.height, img.height - scaledCrop.y);
      
      // Create canvas and draw cropped region
      const canvas = document.createElement('canvas');
      canvas.width = scaledCrop.width;
      canvas.height = scaledCrop.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(
        img,
        scaledCrop.x, scaledCrop.y, scaledCrop.width, scaledCrop.height,
        0, 0, scaledCrop.width, scaledCrop.height
      );
      
      // Convert to WebP with higher quality for crops (they're smaller)
      const webpBase64 = canvas.toDataURL('image/webp', 0.85);
      resolve(webpBase64);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for cropping'));
    img.src = base64Image;
  });
}

// IndexedDB storage for screenshots
// chrome.storage.local has a 10MB limit, so we use IndexedDB for larger screenshot data

const DB_NAME = 'openmation_screenshots';
const DB_VERSION = 1;
const STORE_NAME = 'screenshots';

interface ScreenshotRecord {
  eventId: string;
  automationId: string;
  screenshot?: string;
  elementCrop?: string;
  createdAt: number;
}

let db: IDBDatabase | null = null;

/**
 * Initialize the IndexedDB database
 */
async function initDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'eventId' });
        store.createIndex('automationId', 'automationId', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
}

/**
 * Store a screenshot for an event
 */
export async function storeScreenshot(
  eventId: string,
  automationId: string,
  screenshot?: string,
  elementCrop?: string
): Promise<void> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const record: ScreenshotRecord = {
      eventId,
      automationId,
      screenshot,
      elementCrop,
      createdAt: Date.now(),
    };
    
    const request = store.put(record);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Failed to store screenshot'));
  });
}

/**
 * Retrieve a screenshot for an event
 */
export async function getScreenshot(eventId: string): Promise<ScreenshotRecord | null> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(eventId);
    
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(new Error('Failed to get screenshot'));
  });
}

/**
 * Get all screenshots for an automation
 */
export async function getAutomationScreenshots(automationId: string): Promise<ScreenshotRecord[]> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('automationId');
    const request = index.getAll(automationId);
    
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(new Error('Failed to get automation screenshots'));
  });
}

/**
 * Delete all screenshots for an automation
 */
export async function deleteAutomationScreenshots(automationId: string): Promise<void> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('automationId');
    const request = index.getAllKeys(automationId);
    
    request.onsuccess = () => {
      const keys = request.result;
      let deleted = 0;
      
      if (keys.length === 0) {
        resolve();
        return;
      }
      
      for (const key of keys) {
        const deleteRequest = store.delete(key);
        deleteRequest.onsuccess = () => {
          deleted++;
          if (deleted === keys.length) {
            resolve();
          }
        };
        deleteRequest.onerror = () => reject(new Error('Failed to delete screenshot'));
      }
    };
    
    request.onerror = () => reject(new Error('Failed to get screenshot keys'));
  });
}

/**
 * Delete a single screenshot
 */
export async function deleteScreenshot(eventId: string): Promise<void> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(eventId);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Failed to delete screenshot'));
  });
}

/**
 * Clean up old screenshots (older than specified days)
 */
export async function cleanupOldScreenshots(maxAgeDays: number = 30): Promise<number> {
  const database = await initDB();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  const cutoffTime = Date.now() - maxAgeMs;
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('createdAt');
    const range = IDBKeyRange.upperBound(cutoffTime);
    const request = index.openCursor(range);
    
    let deletedCount = 0;
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        cursor.delete();
        deletedCount++;
        cursor.continue();
      } else {
        resolve(deletedCount);
      }
    };
    
    request.onerror = () => reject(new Error('Failed to cleanup old screenshots'));
  });
}

/**
 * Get storage usage statistics
 */
export async function getStorageStats(): Promise<{ count: number; estimatedSize: number }> {
  const database = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const countRequest = store.count();
    
    countRequest.onsuccess = async () => {
      const count = countRequest.result;
      
      // Estimate size by sampling a few records
      let estimatedSize = 0;
      if (count > 0) {
        const allRequest = store.getAll(undefined, Math.min(count, 10));
        allRequest.onsuccess = () => {
          const samples = allRequest.result;
          if (samples.length > 0) {
            const sampleSize = samples.reduce((acc, record) => {
              return acc + 
                (record.screenshot?.length || 0) + 
                (record.elementCrop?.length || 0);
            }, 0);
            estimatedSize = (sampleSize / samples.length) * count;
          }
          resolve({ count, estimatedSize });
        };
        allRequest.onerror = () => resolve({ count, estimatedSize: 0 });
      } else {
        resolve({ count: 0, estimatedSize: 0 });
      }
    };
    
    countRequest.onerror = () => reject(new Error('Failed to get storage stats'));
  });
}

/** Browser-local persistence for demo CRUD. This is not a replacement for a database. */
export function readMockData<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`northstar:${key}`);
    if (!value) return fallback;
    const parsed = JSON.parse(value) as T;
    // Recover from older demo sessions that stored an empty list before fixtures existed.
    if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && fallback.length > 0) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function writeMockData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`northstar:${key}`, JSON.stringify(value));
  } catch {
    // Keep the in-memory prototype usable when storage is unavailable.
  }
}

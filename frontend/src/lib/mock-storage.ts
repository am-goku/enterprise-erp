/** Browser-local persistence for demo CRUD. This is not a replacement for a database. */
export function readMockData<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`northstar:${key}`);
    if (!value) return fallback;
    const parsed = JSON.parse(value) as T;
    // Add newly shipped fixtures to existing local demo sessions without overwriting edits.
    if (Array.isArray(parsed) && Array.isArray(fallback) && fallback.length > 0) {
      const existingIds = new Set(parsed.map((item) => item && typeof item === 'object' ? item.id : undefined));
      const additions = fallback.filter((item) => !existingIds.has(item && typeof item === 'object' ? item.id : undefined));
      const merged = [...parsed, ...additions];
      localStorage.setItem(`northstar:${key}`, JSON.stringify(merged));
      return merged as T;
    }
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

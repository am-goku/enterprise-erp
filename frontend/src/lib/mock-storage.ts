/** Browser-local persistence for demo CRUD. This is not a replacement for a database. */
export function readMockData<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`northstar:${key}`);
    return value ? JSON.parse(value) as T : fallback;
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

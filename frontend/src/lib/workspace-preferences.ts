export type CurrencyCode = 'USD' | 'INR' | 'EUR';
export type WorkspacePreferences = { currency: CurrencyCode; timezone: string };
export const defaultWorkspacePreferences: WorkspacePreferences = { currency: 'USD', timezone: 'Asia/Kolkata' };

export function formatCurrency(value: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
}

export function formatWorkspaceDate(date: Date, timezone: string, options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' }): string {
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone }).format(date);
}

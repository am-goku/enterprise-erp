export type Trend = 'up' | 'down';
export interface Metric {
  id: string; label: string; value: string; change: string; trend: Trend; detail: string;
}
export type OrderStatus = 'Paid' | 'Processing' | 'Pending' | 'Refunded';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';
export interface Order {
  id: string; customer: string; initials: string; email: string; date: string;
  amount: number; status: OrderStatus; color: string;
}
export interface Activity {
  id: string; title: string; description: string; time: string; kind: 'order' | 'inventory' | 'people' | 'finance';
}
export interface RevenuePoint { month: string; revenue: number; expenses: number; }
export interface NavItem { label: string; icon: string; badge?: string; }

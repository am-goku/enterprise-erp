import type { Activity, Metric, Order, RevenuePoint } from '../types/erp';

export const metrics: Metric[] = [
  { id: 'revenue', label: 'Total revenue', value: '$284,592', change: '+12.8%', trend: 'up', detail: 'vs. last month' },
  { id: 'orders', label: 'Orders', value: '1,429', change: '+8.2%', trend: 'up', detail: 'vs. last month' },
  { id: 'customers', label: 'Active customers', value: '8,549', change: '+4.6%', trend: 'up', detail: 'vs. last month' },
  { id: 'inventory', label: 'Inventory value', value: '$92,840', change: '-2.4%', trend: 'down', detail: 'vs. last month' },
];

export const revenue: RevenuePoint[] = [
  { month: 'Jan', revenue: 42, expenses: 26 }, { month: 'Feb', revenue: 55, expenses: 31 },
  { month: 'Mar', revenue: 48, expenses: 29 }, { month: 'Apr', revenue: 69, expenses: 37 },
  { month: 'May', revenue: 58, expenses: 35 }, { month: 'Jun', revenue: 79, expenses: 42 },
  { month: 'Jul', revenue: 72, expenses: 38 }, { month: 'Aug', revenue: 93, expenses: 48 },
  { month: 'Sep', revenue: 82, expenses: 45 }, { month: 'Oct', revenue: 105, expenses: 55 },
  { month: 'Nov', revenue: 94, expenses: 51 }, { month: 'Dec', revenue: 118, expenses: 62 },
];

export const orders: Order[] = [
  { id: 'ORD-8042', customer: 'Olivia Rhye', initials: 'OR', email: 'olivia.rhye@acme.com', date: 'Oct 17, 2026', amount: 1240, status: 'Paid', color: 'violet' },
  { id: 'ORD-8041', customer: 'Phoenix Baker', initials: 'PB', email: 'phoenix.baker@acme.com', date: 'Oct 17, 2026', amount: 860, status: 'Processing', color: 'blue' },
  { id: 'ORD-8040', customer: 'Lana Steiner', initials: 'LS', email: 'lana.steiner@acme.com', date: 'Oct 16, 2026', amount: 2390, status: 'Pending', color: 'peach' },
  { id: 'ORD-8039', customer: 'Demi Wilkinson', initials: 'DW', email: 'demi.wilkinson@acme.com', date: 'Oct 16, 2026', amount: 540, status: 'Paid', color: 'mint' },
  { id: 'ORD-8038', customer: 'Candice Wu', initials: 'CW', email: 'candice.wu@acme.com', date: 'Oct 15, 2026', amount: 1725, status: 'Refunded', color: 'rose' },
];

export const activities: Activity[] = [
  { id: 'a1', title: 'New order received', description: 'Order #ORD-8042 · Olivia Rhye', time: '12 min ago', kind: 'order' },
  { id: 'a2', title: 'Stock running low', description: 'Wireless Headphones · 8 units left', time: '38 min ago', kind: 'inventory' },
  { id: 'a3', title: 'New team member', description: 'Alex Morgan joined Operations', time: '2 hours ago', kind: 'people' },
  { id: 'a4', title: 'Invoice paid', description: 'INV-2026-084 · $4,250.00', time: '3 hours ago', kind: 'finance' },
  { id: 'a5', title: 'Purchase order approved', description: 'PO-2026-141 · Horizon Components', time: '4 hours ago', kind: 'inventory' },
  { id: 'a6', title: 'Order fulfilled', description: 'ORD-8037 · Ready for carrier pickup', time: '5 hours ago', kind: 'order' },
  { id: 'a7', title: 'Profile updated', description: 'Lana Steiner updated her team profile', time: 'Yesterday', kind: 'people' },
  { id: 'a8', title: 'Expense recorded', description: 'EXP-2026-301 · $286.40 travel', time: 'Yesterday', kind: 'finance' },
];

import { activities, metrics, orders, revenue } from '../data/dashboard';
import type { Activity, Metric, Order, RevenuePoint } from '../types/erp';

const pause = (ms = 180) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** Local mock data boundary. Replace these functions with fetch calls when the API is ready. */
export const dashboardApi = {
  async getMetrics(): Promise<Metric[]> { await pause(); return metrics; },
  async getRevenue(): Promise<RevenuePoint[]> { await pause(); return revenue; },
  async getOrders(): Promise<Order[]> { await pause(); return orders; },
  async getActivity(): Promise<Activity[]> { await pause(); return activities; },
};

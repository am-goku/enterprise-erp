import { activities, metrics, orders, revenue } from '../data/dashboard';
import type { Activity, Metric, Order, RevenuePoint } from '../types/erp';
import { readMockData } from './mock-storage';

const pause = (ms = 180) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** Local mock data boundary. Replace these functions with fetch calls when the API is ready. */
export const dashboardApi = {
  async getMetrics(): Promise<Metric[]> { await pause(); return readMockData('metrics', metrics); },
  async getRevenue(): Promise<RevenuePoint[]> { await pause(); return readMockData('revenue', revenue); },
  async getOrders(): Promise<Order[]> { await pause(); return readMockData('orders', orders); },
  async getActivity(): Promise<Activity[]> { await pause(); return readMockData('activity', activities); },
};

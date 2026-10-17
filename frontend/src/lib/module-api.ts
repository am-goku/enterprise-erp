import { invoices, products, purchaseOrders, savedReports, teamMembers } from '../data/modules';
import { activities } from '../data/dashboard';
import type { Activity } from '../types/erp';
import type { Invoice, Product, PurchaseOrder, SavedReport, TeamMember } from '../types/modules';

const delay = () => new Promise<void>((resolve) => window.setTimeout(resolve, 140));
/** Fake API route layer for modules. Swap method bodies for HTTP requests when services exist. */
export const moduleApi = {
  async getProducts(): Promise<Product[]> { await delay(); return products; },
  async getPurchaseOrders(): Promise<PurchaseOrder[]> { await delay(); return purchaseOrders; },
  async getTeam(): Promise<TeamMember[]> { await delay(); return teamMembers; },
  async getInvoices(): Promise<Invoice[]> { await delay(); return invoices; },
  async getReports(): Promise<SavedReport[]> { await delay(); return savedReports; },
  async getActivity(): Promise<Activity[]> { await delay(); return activities; },
};

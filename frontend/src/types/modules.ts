export interface Product { id: string; name: string; sku: string; category: string; stock: number; price: number; warehouse: string; }
export interface PurchaseOrder { id: string; supplier: string; items: number; date: string; expected: string; amount: number; status: 'Delivered' | 'In transit' | 'Awaiting approval'; }
export interface TeamMember { id: string; name: string; initials: string; email: string; role: string; department: string; status: 'Active' | 'On leave'; color: string; }
import type { InvoiceStatus } from './erp';
export interface Invoice { id: string; client: string; date: string; due: string; amount: number; status: InvoiceStatus; }
export interface SavedReport { id: string; name: string; description: string; updated: string; owner: string; }

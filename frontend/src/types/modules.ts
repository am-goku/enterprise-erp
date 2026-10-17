export interface Product { id: string; name: string; sku: string; category: string; stock: number; price: number; warehouse: string; }
export interface PurchaseOrder { id: string; supplier: string; items: number; date: string; expected: string; amount: number; status: 'Delivered' | 'In transit' | 'Awaiting approval'; }
export interface TeamMember { id: string; name: string; initials: string; email: string; role: string; department: string; status: 'Active' | 'On leave'; color: string; }
export interface Invoice { id: string; client: string; date: string; due: string; amount: number; status: 'Paid' | 'Overdue' | 'Pending'; }
export interface SavedReport { id: string; name: string; description: string; updated: string; owner: string; }

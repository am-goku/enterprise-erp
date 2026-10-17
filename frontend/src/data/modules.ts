import type { Invoice, Product, PurchaseOrder, SavedReport, TeamMember } from '../types/modules';

export const products: Product[] = [
  { id: 'P-1082', name: 'Wireless Headphones', sku: 'WH-2048-BLK', category: 'Electronics', stock: 8, price: 129, warehouse: 'Main warehouse' },
  { id: 'P-1081', name: 'Ergonomic Desk Chair', sku: 'EDC-1102-GRY', category: 'Furniture', stock: 46, price: 349, warehouse: 'Main warehouse' },
  { id: 'P-1080', name: 'Everyday Backpack', sku: 'EB-3014-NVY', category: 'Accessories', stock: 124, price: 89, warehouse: 'West warehouse' },
  { id: 'P-1079', name: 'USB-C Hub 8-in-1', sku: 'UCH-8841-SLV', category: 'Electronics', stock: 12, price: 64, warehouse: 'Main warehouse' },
  { id: 'P-1078', name: 'Adjustable Monitor Stand', sku: 'AMS-2230-OAK', category: 'Furniture', stock: 0, price: 79, warehouse: 'West warehouse' },
  { id: 'P-1077', name: 'Insulated Travel Mug', sku: 'ITM-5503-SGE', category: 'Accessories', stock: 68, price: 32, warehouse: 'East warehouse' },
];
export const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-2026-142', supplier: 'Vertex Supply Co.', items: 12, date: 'Oct 16, 2026', expected: 'Oct 22, 2026', amount: 8420, status: 'In transit' },
  { id: 'PO-2026-141', supplier: 'Horizon Components', items: 8, date: 'Oct 15, 2026', expected: 'Oct 20, 2026', amount: 3260, status: 'Awaiting approval' },
  { id: 'PO-2026-140', supplier: 'Pacific Wholesale', items: 24, date: 'Oct 12, 2026', expected: 'Oct 17, 2026', amount: 12450, status: 'Delivered' },
  { id: 'PO-2026-139', supplier: 'Vertex Supply Co.', items: 6, date: 'Oct 10, 2026', expected: 'Oct 19, 2026', amount: 2180, status: 'In transit' },
];
export const teamMembers: TeamMember[] = [
  { id: 'TM-021', name: 'Olivia Rhye', initials: 'OR', email: 'olivia.rhye@northstar.co', role: 'Operations Lead', department: 'Operations', status: 'Active', color: 'violet' },
  { id: 'TM-020', name: 'Phoenix Baker', initials: 'PB', email: 'phoenix.baker@northstar.co', role: 'Sales Manager', department: 'Sales', status: 'Active', color: 'blue' },
  { id: 'TM-019', name: 'Lana Steiner', initials: 'LS', email: 'lana.steiner@northstar.co', role: 'Product Designer', department: 'Product', status: 'On leave', color: 'peach' },
  { id: 'TM-018', name: 'Demi Wilkinson', initials: 'DW', email: 'demi.wilkinson@northstar.co', role: 'Finance Associate', department: 'Finance', status: 'Active', color: 'mint' },
  { id: 'TM-017', name: 'Candice Wu', initials: 'CW', email: 'candice.wu@northstar.co', role: 'People Partner', department: 'People', status: 'Active', color: 'rose' },
  { id: 'TM-016', name: 'Alex Morgan', initials: 'AM', email: 'alex.morgan@northstar.co', role: 'Warehouse Associate', department: 'Operations', status: 'Active', color: 'blue' },
];
export const invoices: Invoice[] = [
  { id: 'INV-2026-084', client: 'Acme Corporation', date: 'Oct 14, 2026', due: 'Oct 28, 2026', amount: 4250, status: 'Paid' },
  { id: 'INV-2026-083', client: 'Brightside Studio', date: 'Oct 12, 2026', due: 'Oct 26, 2026', amount: 1860, status: 'Pending' },
  { id: 'INV-2026-082', client: 'Summit Labs', date: 'Oct 02, 2026', due: 'Oct 16, 2026', amount: 7840, status: 'Overdue' },
  { id: 'INV-2026-081', client: 'Northwind Trading', date: 'Sep 29, 2026', due: 'Oct 13, 2026', amount: 2120, status: 'Paid' },
  { id: 'INV-2026-080', client: 'Clover & Co.', date: 'Sep 25, 2026', due: 'Oct 09, 2026', amount: 3290, status: 'Paid' },
];
export const savedReports: SavedReport[] = [
  { id: 'RPT-014', name: 'Monthly sales summary', description: 'Revenue, order volume, and channel performance', updated: 'Today, 9:42 AM', owner: 'Gokul Krishna' },
  { id: 'RPT-013', name: 'Inventory health', description: 'Stock levels, reorder points, and valuation', updated: 'Yesterday, 4:18 PM', owner: 'Olivia Rhye' },
  { id: 'RPT-012', name: 'Accounts receivable aging', description: 'Open invoices grouped by days outstanding', updated: 'Oct 15, 2026', owner: 'Demi Wilkinson' },
  { id: 'RPT-011', name: 'Team headcount', description: 'Employees by department and employment status', updated: 'Oct 12, 2026', owner: 'Candice Wu' },
];

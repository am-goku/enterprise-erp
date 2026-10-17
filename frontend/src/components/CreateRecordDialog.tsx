import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

export interface CreateField { name: string; label: string; placeholder: string; type?: 'text' | 'email' | 'number' | 'date'; required?: boolean; }
const fields: Record<string, CreateField[]> = {
  Sales: [
    { name: 'customer', label: 'Customer name', placeholder: 'e.g. Taylor Brooks', required: true },
    { name: 'email', label: 'Customer email', placeholder: 'taylor@company.com', type: 'email', required: true },
    { name: 'amount', label: 'Order amount (USD)', placeholder: '0.00', type: 'number', required: true },
  ],
  Inventory: [
    { name: 'name', label: 'Product name', placeholder: 'e.g. Wireless Keyboard', required: true },
    { name: 'sku', label: 'SKU', placeholder: 'e.g. WK-2048-BLK', required: true },
    { name: 'category', label: 'Category', placeholder: 'e.g. Electronics', required: true },
    { name: 'stock', label: 'Opening quantity', placeholder: '0', type: 'number', required: true },
    { name: 'price', label: 'Unit price (USD)', placeholder: '0.00', type: 'number', required: true },
    { name: 'warehouse', label: 'Warehouse', placeholder: 'Main warehouse', required: true },
  ],
  Purchasing: [
    { name: 'supplier', label: 'Supplier', placeholder: 'Supplier name', required: true },
    { name: 'items', label: 'Number of SKUs', placeholder: '1', type: 'number', required: true },
    { name: 'expected', label: 'Expected delivery', placeholder: '', type: 'date', required: true },
    { name: 'amount', label: 'Order total (USD)', placeholder: '0.00', type: 'number', required: true },
  ],
  People: [
    { name: 'name', label: 'Full name', placeholder: 'e.g. Taylor Brooks', required: true },
    { name: 'email', label: 'Work email', placeholder: 'taylor@northstar.co', type: 'email', required: true },
    { name: 'role', label: 'Role', placeholder: 'e.g. Account Executive', required: true },
    { name: 'department', label: 'Department', placeholder: 'e.g. Sales', required: true },
  ],
  Finance: [
    { name: 'client', label: 'Client', placeholder: 'Client or company name', required: true },
    { name: 'due', label: 'Due date', placeholder: '', type: 'date', required: true },
    { name: 'amount', label: 'Invoice amount (USD)', placeholder: '0.00', type: 'number', required: true },
  ],
  Reports: [
    { name: 'name', label: 'Report name', placeholder: 'e.g. Quarterly sales', required: true },
    { name: 'description', label: 'Description', placeholder: 'What should this report cover?', required: true },
  ],
};

interface CreateRecordDialogProps { page: string; onClose: () => void; onSubmit: (page: string, values: Record<string, string>) => void; }
export function CreateRecordDialog({ page, onClose, onSubmit }: CreateRecordDialogProps) {
  const pageFields = fields[page] ?? [];
  const [error, setError] = useState('');
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const amount = Number(values.amount ?? values.price ?? 1);
    const stock = Number(values.stock ?? 1);
    if ((values.amount || values.price) && amount <= 0) { setError('Enter an amount greater than zero.'); return; }
    if (values.stock !== undefined && stock < 0) { setError('Stock cannot be negative.'); return; }
    onSubmit(page, values);
  }
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-dialog-title"><div className="dialog-header"><div><div className="eyebrow">NORTHSTAR WORKSPACE</div><h2 id="record-dialog-title">{page === 'Sales' ? 'Create order' : page === 'Inventory' ? 'Add product' : page === 'Purchasing' ? 'Create purchase order' : page === 'People' ? 'Invite teammate' : page === 'Finance' ? 'Create invoice' : 'Build a report'}</h2><p>This record is saved in your local demo workspace.</p></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button></div><form onSubmit={handleSubmit}><div className="dialog-fields">{pageFields.map((field) => <label key={field.name}>{field.label}<input autoFocus={field === pageFields[0]} name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} min={field.type === 'number' ? '0' : undefined} step={field.name === 'amount' || field.name === 'price' ? '0.01' : '1'} required={field.required ?? true} /></label>)}</div>{error && <div className="form-error" role="alert">{error}</div>}<div className="dialog-actions"><button className="outline-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Save to workspace</button></div></form></section></div>;
}

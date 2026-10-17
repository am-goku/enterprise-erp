import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, MoreHorizontal } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/erp';
import { downloadCsv } from '../../lib/csv';

interface OrdersTableProps { orders: Order[]; query: string; onStatusChange: (id: string, status: OrderStatus) => void; onViewAll: () => void; onExport: () => void; }
const statuses: OrderStatus[] = ['Paid', 'Processing', 'Pending', 'Refunded'];
export function OrdersTable({ orders, query, onStatusChange, onViewAll, onExport }: OrdersTableProps) {
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [page, setPage] = useState(1);
  const [openActions, setOpenActions] = useState<string | null>(null);
  const pageSize = 5;
  const filtered = useMemo(() => orders.filter((order) => `${order.id} ${order.customer} ${order.email} ${order.status}`.toLowerCase().includes(query.toLowerCase()) && (statusFilter === 'All statuses' || order.status === statusFilter)), [orders, query, statusFilter]);
  useEffect(() => { setPage(1); }, [query, statusFilter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const exportFiltered = () => { downloadCsv('northstar-orders.csv', ['Order ID', 'Customer', 'Email', 'Date', 'Status', 'Amount'], filtered.map((order) => [order.id, order.customer, order.email, order.date, order.status, order.amount])); onExport(); };
  const from = filtered.length ? (page - 1) * pageSize + 1 : 0;
  return <section className="panel orders-panel"><div className="panel-heading orders-heading"><div><div className="eyebrow">LATEST ACTIVITY</div><h2>Recent orders <span className="count-pill">{filtered.length}</span></h2><p>Keep track of your latest transactions</p></div><div className="orders-heading-actions"><button className="subtle-button" onClick={exportFiltered}>Export CSV <ArrowDown size={13} /></button><button className="subtle-button" onClick={onViewAll}>View all orders <ArrowUpRight size={15} /></button></div></div>
    <div className="orders-filter-row"><label>Filter by status <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label><span>{filtered.length} matching orders</span></div>
    <div className="table-scroll"><table><thead><tr><th>ORDER <ArrowDown size={12} /></th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th><th /></tr></thead><tbody>{visible.map((order) => <tr key={order.id}><td className="order-id">{order.id}</td><td><div className="customer-cell"><div className={`customer-avatar ${order.color}`}>{order.initials}</div><div><strong>{order.customer}</strong><small>{order.email}</small></div></div></td><td className="date-cell">{order.date}</td><td><span className={`status-pill ${order.status.toLowerCase()}`}><i />{order.status}</span></td><td className="amount-cell">${order.amount.toLocaleString('en-US')}.00</td><td className="row-actions-cell"><button className="icon-button more-button" aria-label={`More options for ${order.id}`} aria-expanded={openActions === order.id} onClick={() => setOpenActions(openActions === order.id ? null : order.id)}><MoreHorizontal size={17} /></button>{openActions === order.id && <div className="order-actions-menu">{statuses.map((status) => <button key={status} onClick={() => { onStatusChange(order.id, status); setOpenActions(null); }}><span>{status}</span>{order.status === status && <Check size={13} />}</button>)}</div>}</td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No orders match your search or filters.</div>}</div>
    <div className="table-footer"><span>Showing <strong>{from}–{Math.min(page * pageSize, filtered.length)}</strong> of <strong>{filtered.length}</strong> orders</span><div><button disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button><span className="page-number">Page {page} of {pageCount}</span><button disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next <ArrowUpRight size={13} /></button></div></div>
  </section>;
}

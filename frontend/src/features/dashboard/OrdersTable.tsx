import { ArrowDown, ArrowUpRight, MoreHorizontal } from 'lucide-react';
import type { Order } from '../../types/erp';

interface OrdersTableProps { orders: Order[]; query: string; }
export function OrdersTable({ orders, query }: OrdersTableProps) {
  const filtered = orders.filter((order) => `${order.id} ${order.customer} ${order.email} ${order.status}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="panel orders-panel"><div className="panel-heading orders-heading"><div><div className="eyebrow">LATEST ACTIVITY</div><h2>Recent orders <span className="count-pill">{orders.length}</span></h2><p>Keep track of your latest transactions</p></div><button className="subtle-button">View all orders <ArrowUpRight size={15} /></button></div>
    <div className="table-scroll"><table><thead><tr><th>ORDER <ArrowDown size={12} /></th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th><th /></tr></thead><tbody>{filtered.map((order) => <tr key={order.id}><td className="order-id">{order.id}</td><td><div className="customer-cell"><div className={`customer-avatar ${order.color}`}>{order.initials}</div><div><strong>{order.customer}</strong><small>{order.email}</small></div></div></td><td className="date-cell">{order.date}</td><td><span className={`status-pill ${order.status.toLowerCase()}`}><i />{order.status}</span></td><td className="amount-cell">${order.amount.toLocaleString('en-US')}.00</td><td><button className="icon-button more-button" aria-label={`More options for ${order.id}`}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No orders match “{query}”.</div>}</div>
    <div className="table-footer"><span>Showing <strong>{filtered.length}</strong> of <strong>{orders.length}</strong> orders</span><div><button disabled>Previous</button><button>Next <ArrowUpRight size={13} /></button></div></div>
  </section>;
}

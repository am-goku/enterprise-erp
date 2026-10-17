import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Download, Plus, Sparkles } from 'lucide-react';
import { CreateRecordDialog } from './components/CreateRecordDialog';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ActivityFeed } from './features/dashboard/ActivityFeed';
import { OrdersTable } from './features/dashboard/OrdersTable';
import { RevenueChart } from './features/dashboard/RevenueChart';
import { ModuleWorkspace } from './features/modules/ModuleWorkspace';
import { dashboardApi } from './lib/mock-api';
import { moduleApi } from './lib/module-api';
import { downloadCsv } from './lib/csv';
import { writeMockData } from './lib/mock-storage';
import type { Activity, InvoiceStatus, Metric, Order, OrderStatus, RevenuePoint } from './types/erp';
import type { Invoice, Product, PurchaseOrder, SavedReport, TeamMember } from './types/modules';
import './styles.css';

const pageDescriptions: Record<string, string> = {
  Overview: 'Here’s what’s happening with your business today.', Sales: 'Manage orders and customer revenue.', Inventory: 'Know what you have, where it is, and what needs attention.',
  Purchasing: 'Keep supplier orders on track, from request to delivery.', People: 'Your team, roles, and departments in one place.', Finance: 'A clear view of invoices and cash flow.',
  Reports: 'Understand trends and make informed decisions.', Activity: 'Stay up to date with changes across your workspace.', Settings: 'Configure your organization workspace.', 'Help center': 'Answers and support for your team.',
};

function displayDate(date = new Date()) { return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); }
function initialsFor(name: string) { return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join(''); }
function todayLabel(date = new Date()) { return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }

function App() {
  const [activePage, setActivePage] = useState('Overview');
  const [query, setQuery] = useState('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [people, setPeople] = useState<TeamMember[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [notice, setNotice] = useState('');
  const [dialogPage, setDialogPage] = useState('');
  useEffect(() => { void Promise.all([
    dashboardApi.getMetrics(), dashboardApi.getRevenue(), dashboardApi.getOrders(), dashboardApi.getActivity(),
    moduleApi.getProducts(), moduleApi.getPurchaseOrders(), moduleApi.getTeam(), moduleApi.getInvoices(), moduleApi.getReports(),
  ]).then(([m, r, o, a, p, po, t, i, rp]) => { setMetrics(m); setRevenue(r); setOrders(o); setActivity(a); setProducts(p); setPurchases(po); setPeople(t); setInvoices(i); setReports(rp); }); }, []);
  const announce = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const navigate = (page: string) => { setActivePage(page); setQuery(''); };
  const saveRecord = (page: string, values: Record<string, string>) => {
    const now = new Date();
    if (page === 'Sales') {
      const record: Order = { id: `ORD-${Date.now().toString().slice(-6)}`, customer: values.customer, initials: initialsFor(values.customer), email: values.email, date: displayDate(now), amount: Number(values.amount), status: 'Pending', color: 'blue' };
      setOrders((current) => { const next = [record, ...current]; writeMockData('orders', next); return next; });
    } else if (page === 'Inventory') {
      const record: Product = { id: `P-${Date.now().toString().slice(-6)}`, name: values.name, sku: values.sku.toUpperCase(), category: values.category, stock: Number(values.stock), price: Number(values.price), warehouse: values.warehouse };
      setProducts((current) => { const next = [record, ...current]; writeMockData('products', next); return next; });
    } else if (page === 'Purchasing') {
      const record: PurchaseOrder = { id: `PO-${Date.now().toString().slice(-6)}`, supplier: values.supplier, items: Number(values.items), date: displayDate(now), expected: values.expected, amount: Number(values.amount), status: 'Awaiting approval' };
      setPurchases((current) => { const next = [record, ...current]; writeMockData('purchases', next); return next; });
    } else if (page === 'People') {
      const record: TeamMember = { id: `TM-${Date.now().toString().slice(-5)}`, name: values.name, initials: initialsFor(values.name), email: values.email, role: values.role, department: values.department, status: 'Active', color: 'blue' };
      setPeople((current) => { const next = [record, ...current]; writeMockData('people', next); return next; });
    } else if (page === 'Finance') {
      const record: Invoice = { id: `INV-${Date.now().toString().slice(-6)}`, client: values.client, date: displayDate(now), due: values.due, amount: Number(values.amount), status: 'Pending' };
      setInvoices((current) => { const next = [record, ...current]; writeMockData('invoices', next); return next; });
    } else if (page === 'Reports') {
      const record: SavedReport = { id: `RPT-${Date.now().toString().slice(-4)}`, name: values.name, description: values.description, updated: 'Just now', owner: 'Gokul Krishna' };
      setReports((current) => { const next = [record, ...current]; writeMockData('reports', next); return next; });
    }
    const event: Activity = { id: `a-${Date.now()}`, title: `${page} record created`, description: values.name ?? values.customer ?? values.client ?? values.supplier ?? 'A new workspace record was created', time: 'Just now', kind: page === 'Sales' ? 'order' : page === 'Inventory' || page === 'Purchasing' ? 'inventory' : page === 'People' ? 'people' : 'finance' };
    setActivity((current) => { const next = [event, ...current]; writeMockData('activity', next); return next; });
    setDialogPage('');
    setActivePage(page);
    setQuery('');
    announce(`${page} record added to your demo workspace.`);
  };
  const changeOrderStatus = (id: string, status: OrderStatus) => setOrders((current) => { const next = current.map((order) => order.id === id ? { ...order, status } : order); writeMockData('orders', next); return next; });
  const changeInvoiceStatus = (id: string, status: InvoiceStatus) => setInvoices((current) => { const next = current.map((invoice) => invoice.id === id ? { ...invoice, status } : invoice); writeMockData('invoices', next); return next; });
  const filteredActivity = activity.filter((item) => `${item.title} ${item.description} ${item.kind}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="app-shell"><Sidebar active={activePage} onNavigate={navigate} /><main className="main-shell"><Topbar page={activePage} query={query} searchable={!['Settings', 'Help center'].includes(activePage)} onQueryChange={setQuery} onOpenNotifications={() => announce('You’re all caught up.')} /><div className="page-content">
    {activePage === 'Overview' ? <>
      <div className="welcome-row"><div><div className="welcome-kicker"><span className="live-indicator" /> YOUR BUSINESS AT A GLANCE</div><h1>Good morning, Gokul<span className="greeting-sparkle">✳</span></h1><p>{pageDescriptions.Overview}</p></div><div className="welcome-actions"><button className="outline-button" onClick={() => downloadAllOrders(orders, announce)}><Download size={16} /> Export report</button><button className="primary-button" onClick={() => setDialogPage('Sales')}><Plus size={17} /> Create new</button></div></div>
      <div className="date-strip"><CalendarDays size={14} /><span>{todayLabel()}</span><span className="date-separator">·</span><span>Data updated just now</span><button onClick={() => announce('Showing today’s sample workspace data.')}>Today <span>⌄</span></button></div>
      <section className="metric-grid" aria-label="Business metrics">{metrics.length ? metrics.map((metric, index) => <article className="metric-card" key={metric.id}><div className="metric-top"><span>{metric.label}</span><span className={`metric-icon metric-icon-${index}`}>{['↗', '▤', '◎', '◫'][index]}</span></div><div className="metric-value">{metric.value}</div><div className="metric-footer"><span className={`metric-change ${metric.trend}`}>{metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{metric.change}</span><span>{metric.detail}</span><Sparkles size={13} className="metric-sparkle" /></div><div className={`metric-sparkline spark-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article>) : Array.from({ length: 4 }, (_, index) => <div className="metric-card metric-skeleton" key={index} />)}</section>
      <div className="dashboard-grid"><RevenueChart points={revenue} /><ActivityFeed items={activity} /></div><OrdersTable orders={orders} query={query} onStatusChange={changeOrderStatus} onViewAll={() => navigate('Sales')} onExport={() => downloadAllOrders(orders, announce)} />
    </> : <><div className="module-welcome"><div><div className="welcome-kicker"><span className="live-indicator" /> NORTHSTAR WORKSPACE</div><h1>{activePage}</h1><p>{pageDescriptions[activePage]}</p></div><span className="module-updated"><span className="date-dot" /> Updated just now</span></div><ModuleWorkspace page={activePage} query={query} orders={orders} revenue={revenue} activities={filteredActivity} products={products} purchases={purchases} people={people} invoices={invoices} reports={reports} onAction={announce} onCreateRequest={setDialogPage} onChangeOrderStatus={changeOrderStatus} onChangeInvoiceStatus={changeInvoiceStatus} /></>}
    <footer className="page-footer"><span>© 2026 Northstar Inc.</span><span>All systems operational <i className="live-indicator" /></span><a href="mailto:support@northstar.example">Support <span>↗</span></a></footer>
  </div></main>{notice && <div className="toast" role="status">{notice}</div>}{dialogPage && <CreateRecordDialog page={dialogPage} onClose={() => setDialogPage('')} onSubmit={saveRecord} />}</div>;
}

function downloadAllOrders(orders: Order[], announce: (message: string) => void) {
  downloadCsv('northstar-orders.csv', ['Order ID', 'Customer', 'Email', 'Date', 'Status', 'Amount'], orders.map((order) => [order.id, order.customer, order.email, order.date, order.status, order.amount]));
  announce('Orders exported as CSV.');
}
export default App;

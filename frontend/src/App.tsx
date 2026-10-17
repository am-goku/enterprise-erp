import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronDown, Download, Plus, Sparkles } from 'lucide-react';
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
import { readMockData, writeMockData } from './lib/mock-storage';
import { defaultWorkspacePreferences, formatWorkspaceDate } from './lib/workspace-preferences';
import type { WorkspacePreferences } from './lib/workspace-preferences';
import type { Activity, InvoiceStatus, Metric, Order, OrderStatus, RevenuePoint } from './types/erp';
import type { Invoice, Product, PurchaseOrder, SavedReport, TeamMember } from './types/modules';
import './styles.css';

const pageDescriptions: Record<string, string> = {
  Overview: 'Here’s what’s happening with your business today.', Sales: 'Manage orders and customer revenue.', Inventory: 'Know what you have, where it is, and what needs attention.',
  Purchasing: 'Keep supplier orders on track, from request to delivery.', People: 'Your team, roles, and departments in one place.', Finance: 'A clear view of invoices and cash flow.',
  Reports: 'Understand trends and make informed decisions.', Activity: 'Stay up to date with changes across your workspace.', Settings: 'Configure your organization workspace.', 'Help center': 'Answers and support for your team.',
};

function displayDate(date = new Date(), timezone = defaultWorkspacePreferences.timezone) { return formatWorkspaceDate(date, timezone); }
function initialsFor(name: string) { return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join(''); }
function todayLabel(date = new Date(), timezone = defaultWorkspacePreferences.timezone) { return formatWorkspaceDate(date, timezone, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
type AppearancePreferences = { theme: 'light' | 'dark'; textSize: 'small' | 'normal' | 'large' };
function pageFromHash() { try { const page = decodeURIComponent(window.location.hash.slice(1)); return pageDescriptions[page] ? page : 'Overview'; } catch { return 'Overview'; } }

function App() {
  const [activePage, setActivePage] = useState(pageFromHash);
  const [appearance, setAppearance] = useState<AppearancePreferences>(() => readMockData('appearance', { theme: 'light', textSize: 'normal' }));
  const [workspacePreferences, setWorkspacePreferences] = useState<WorkspacePreferences>(() => readMockData('workspace-preferences', defaultWorkspacePreferences));
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 680px)').matches);
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
  useEffect(() => { const syncPage = () => setActivePage(pageFromHash()); window.addEventListener('hashchange', syncPage); return () => window.removeEventListener('hashchange', syncPage); }, []);
  useEffect(() => { document.documentElement.dataset.theme = appearance.theme; document.documentElement.dataset.textSize = appearance.textSize; writeMockData('appearance', appearance); }, [appearance]);
  useEffect(() => { writeMockData('workspace-preferences', workspacePreferences); }, [workspacePreferences]);
  useEffect(() => { const media = window.matchMedia('(max-width: 680px)'); const syncMobile = () => setIsMobile(media.matches); media.addEventListener('change', syncMobile); return () => media.removeEventListener('change', syncMobile); }, []);
  useEffect(() => { void Promise.all([
    dashboardApi.getMetrics(), dashboardApi.getRevenue(), dashboardApi.getOrders(), dashboardApi.getActivity(),
    moduleApi.getProducts(), moduleApi.getPurchaseOrders(), moduleApi.getTeam(), moduleApi.getInvoices(), moduleApi.getReports(),
  ]).then(([m, r, o, a, p, po, t, i, rp]) => { setMetrics(m); setRevenue(r); setOrders(o); setActivity(a); setProducts(p); setPurchases(po); setPeople(t); setInvoices(i); setReports(rp); }); }, []);
  const announce = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const navigate = (page: string) => { setActivePage(page); setQuery(''); if (window.location.hash !== `#${encodeURIComponent(page)}`) window.location.hash = encodeURIComponent(page); };
  const saveRecord = (page: string, values: Record<string, string>) => {
    const now = new Date();
    if (page === 'Sales') {
      const record: Order = { id: `ORD-${Date.now().toString().slice(-6)}`, customer: values.customer, initials: initialsFor(values.customer), email: values.email, date: displayDate(now, workspacePreferences.timezone), amount: Number(values.amount), status: 'Pending', color: 'blue' };
      setOrders((current) => { const next = [record, ...current]; writeMockData('orders', next); return next; });
    } else if (page === 'Inventory') {
      const record: Product = { id: `P-${Date.now().toString().slice(-6)}`, name: values.name, sku: values.sku.toUpperCase(), category: values.category, stock: Number(values.stock), price: Number(values.price), warehouse: values.warehouse };
      setProducts((current) => { const next = [record, ...current]; writeMockData('products', next); return next; });
    } else if (page === 'Purchasing') {
      const record: PurchaseOrder = { id: `PO-${Date.now().toString().slice(-6)}`, supplier: values.supplier, items: Number(values.items), date: displayDate(now, workspacePreferences.timezone), expected: values.expected, amount: Number(values.amount), status: 'Awaiting approval' };
      setPurchases((current) => { const next = [record, ...current]; writeMockData('purchases', next); return next; });
    } else if (page === 'People') {
      const record: TeamMember = { id: `TM-${Date.now().toString().slice(-5)}`, name: values.name, initials: initialsFor(values.name), email: values.email, role: values.role, department: values.department, status: 'Active', color: 'blue' };
      setPeople((current) => { const next = [record, ...current]; writeMockData('people', next); return next; });
    } else if (page === 'Finance') {
      const record: Invoice = { id: `INV-${Date.now().toString().slice(-6)}`, client: values.client, date: displayDate(now, workspacePreferences.timezone), due: values.due, amount: Number(values.amount), status: 'Pending' };
      setInvoices((current) => { const next = [record, ...current]; writeMockData('invoices', next); return next; });
    } else if (page === 'Reports') {
      const record: SavedReport = { id: `RPT-${Date.now().toString().slice(-4)}`, name: values.name, description: values.description, updated: 'Just now', owner: 'Jordan Lee' };
      setReports((current) => { const next = [record, ...current]; writeMockData('reports', next); return next; });
    }
    const event: Activity = { id: `a-${Date.now()}`, title: `${page} record created`, description: values.name ?? values.customer ?? values.client ?? values.supplier ?? 'A new workspace record was created', time: 'Just now', kind: page === 'Sales' ? 'order' : page === 'Inventory' || page === 'Purchasing' ? 'inventory' : page === 'People' ? 'people' : 'finance' };
    setActivity((current) => { const next = [event, ...current]; writeMockData('activity', next); return next; });
    setDialogPage('');
    setActivePage(page);
    window.location.hash = encodeURIComponent(page);
    setQuery('');
    announce(`${page} record added to your demo workspace.`);
  };
  const changeOrderStatus = (id: string, status: OrderStatus) => setOrders((current) => { const next = current.map((order) => order.id === id ? { ...order, status } : order); writeMockData('orders', next); return next; });
  const changeInvoiceStatus = (id: string, status: InvoiceStatus) => setInvoices((current) => { const next = current.map((invoice) => invoice.id === id ? { ...invoice, status } : invoice); writeMockData('invoices', next); return next; });
  const localizedActivity = activity.map((item) => ({ ...item, description: item.description.replace(/\$([\d,]+(?:\.\d{2})?)/g, (_, amount: string) => new Intl.NumberFormat('en-US', { style: 'currency', currency: workspacePreferences.currency, minimumFractionDigits: amount.includes('.') ? 2 : 0, maximumFractionDigits: amount.includes('.') ? 2 : 0 }).format(Number(amount.replace(/,/g, '')))) }));
  const filteredActivity = localizedActivity.filter((item) => `${item.title} ${item.description} ${item.kind}`.toLowerCase().includes(query.toLowerCase()));
  return <div className={`app-shell${isMobile ? ' mobile-summary-mode' : ''}`}><Sidebar active={activePage} onNavigate={navigate} /><main className="main-shell"><Topbar page={activePage} query={query} searchable={!['Settings', 'Help center'].includes(activePage)} onQueryChange={setQuery} onOpenNotifications={() => announce('You’re all caught up.')} timezone={workspacePreferences.timezone} />{isMobile && <div className="mobile-experience-notice" role="note">You’re viewing key summaries. Open this workspace on a desktop for full tables and detailed workflows.</div>}<div className="page-content">
    {activePage === 'Overview' ? <>
      <div className="welcome-row"><div><div className="welcome-kicker"><span className="live-indicator" /> YOUR BUSINESS AT A GLANCE</div><h1>Good morning, Jordan<span className="greeting-sparkle">✳</span></h1><p>{pageDescriptions.Overview}</p></div><div className="welcome-actions"><button className="outline-button" onClick={() => downloadAllOrders(orders, announce)}><Download size={16} /> Export report</button><button className="primary-button" onClick={() => setDialogPage('Sales')}><Plus size={17} /> Create new</button></div></div>
      <div className="date-strip"><CalendarDays size={14} /><span>{todayLabel(new Date(), workspacePreferences.timezone)}</span><span className="date-separator">·</span><span>Data updated just now</span><button onClick={() => announce('Showing today’s sample workspace data.')}>Today <ChevronDown size={13} /></button></div>
      <section className="metric-grid" aria-label="Business metrics">{metrics.length ? metrics.map((metric, index) => <article className="metric-card" key={metric.id}><div className="metric-top"><span>{metric.label}</span><span className={`metric-icon metric-icon-${index}`}>{['↗', '▤', '◎', '◫'][index]}</span></div><div className="metric-value">{metric.id === 'revenue' || metric.id === 'inventory' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: workspacePreferences.currency, maximumFractionDigits: 0 }).format(Number(metric.value.replace(/[^\d.]/g, ''))) : metric.value}</div><div className="metric-footer"><span className={`metric-change ${metric.trend}`}>{metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{metric.change}</span><span>{metric.detail}</span><Sparkles size={13} className="metric-sparkle" /></div><div className={`metric-sparkline spark-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article>) : Array.from({ length: 4 }, (_, index) => <div className="metric-card metric-skeleton" key={index} />)}</section>
      <div className="dashboard-grid"><RevenueChart points={revenue} currency={workspacePreferences.currency} /><ActivityFeed items={localizedActivity} /></div><OrdersTable orders={orders} query={query} onStatusChange={changeOrderStatus} onViewAll={() => navigate('Sales')} onExport={() => downloadAllOrders(orders, announce)} currency={workspacePreferences.currency} />
    </> : <><div className="module-welcome"><div><div className="welcome-kicker"><span className="live-indicator" /> NORTHSTAR WORKSPACE</div><h1>{activePage}</h1><p>{pageDescriptions[activePage]}</p></div><span className="module-updated"><span className="date-dot" /> Updated just now</span></div><ModuleWorkspace page={activePage} query={query} orders={orders} revenue={revenue} activities={filteredActivity} products={products} purchases={purchases} people={people} invoices={invoices} reports={reports} appearance={appearance} onAppearanceChange={setAppearance} workspacePreferences={workspacePreferences} onWorkspacePreferencesChange={setWorkspacePreferences} onAction={announce} onCreateRequest={setDialogPage} onChangeOrderStatus={changeOrderStatus} onChangeInvoiceStatus={changeInvoiceStatus} /></>}
    <footer className="page-footer"><span>© 2026 Northstar Inc.</span><span>All systems operational <i className="live-indicator" /></span><a href="mailto:support@northstar.example">Support <span>↗</span></a></footer>
  </div></main>{notice && <div className="toast" role="status">{notice}</div>}{dialogPage && <CreateRecordDialog page={dialogPage} onClose={() => setDialogPage('')} onSubmit={saveRecord} currency={workspacePreferences.currency} />}</div>;
}

function downloadAllOrders(orders: Order[], announce: (message: string) => void) {
  downloadCsv('northstar-orders.csv', ['Order ID', 'Customer', 'Email', 'Date', 'Status', 'Amount'], orders.map((order) => [order.id, order.customer, order.email, order.date, order.status, order.amount]));
  announce('Orders exported as CSV.');
}
export default App;

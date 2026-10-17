import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Download, Plus, Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ActivityFeed } from './features/dashboard/ActivityFeed';
import { OrdersTable } from './features/dashboard/OrdersTable';
import { RevenueChart } from './features/dashboard/RevenueChart';
import { ModuleWorkspace } from './features/modules/ModuleWorkspace';
import { dashboardApi } from './lib/mock-api';
import { moduleApi } from './lib/module-api';
import type { Activity, Metric, Order, RevenuePoint } from './types/erp';
import type { Invoice, Product, PurchaseOrder, SavedReport, TeamMember } from './types/modules';
import './styles.css';

const pageDescriptions: Record<string, string> = {
  Overview: 'Here’s what’s happening with your business today.', Sales: 'Manage orders and customer revenue.', Inventory: 'Know what you have, where it is, and what needs attention.',
  Purchasing: 'Keep supplier orders on track, from request to delivery.', People: 'Your team, roles, and departments in one place.', Finance: 'A clear view of invoices and cash flow.',
  Reports: 'Understand trends and make informed decisions.', Activity: 'Stay up to date with changes across your workspace.', Settings: 'Configure your organization workspace.', 'Help center': 'Answers and support for your team.',
};
const primaryActions: Record<string, string> = { Sales: 'Create order', Inventory: 'Add product', Purchasing: 'Create purchase order', People: 'Invite teammate', Finance: 'Create invoice', Reports: 'Build a report', Activity: 'Export log' };

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
  useEffect(() => { void Promise.all([
    dashboardApi.getMetrics(), dashboardApi.getRevenue(), dashboardApi.getOrders(), dashboardApi.getActivity(),
    moduleApi.getProducts(), moduleApi.getPurchaseOrders(), moduleApi.getTeam(), moduleApi.getInvoices(), moduleApi.getReports(),
  ]).then(([m, r, o, a, p, po, t, i, rp]) => { setMetrics(m); setRevenue(r); setOrders(o); setActivity(a); setProducts(p); setPurchases(po); setPeople(t); setInvoices(i); setReports(rp); }); }, []);
  const announce = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const navigate = (page: string) => { setActivePage(page); setQuery(''); };
  const createAction = () => announce(activePage === 'Overview' ? 'New order form opened locally.' : `${primaryActions[activePage] ?? 'Action'} form opened locally.`);
  const filteredActivity = activity.filter((item) => `${item.title} ${item.description} ${item.kind}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="app-shell"><Sidebar active={activePage} onNavigate={navigate} /><main className="main-shell"><Topbar page={activePage} query={query} searchable={!['Settings', 'Help center'].includes(activePage)} onQueryChange={setQuery} onOpenNotifications={() => announce('You’re all caught up.')} /><div className="page-content">
    {activePage === 'Overview' ? <>
      <div className="welcome-row"><div><div className="welcome-kicker"><span className="live-indicator" /> YOUR BUSINESS AT A GLANCE</div><h1>Good morning, Gokul<span className="greeting-sparkle">✳</span></h1><p>{pageDescriptions.Overview}</p></div><div className="welcome-actions"><button className="outline-button" onClick={() => announce('Your report is being prepared.')}><Download size={16} /> Export report</button><button className="primary-button" onClick={createAction}><Plus size={17} /> Create new</button></div></div>
      <div className="date-strip"><CalendarDays size={14} /><span>Friday, October 17, 2026</span><span className="date-separator">·</span><span>Data updated just now</span><button onClick={() => announce('Showing today’s sample workspace data.')}>Today <span>⌄</span></button></div>
      <section className="metric-grid" aria-label="Business metrics">{metrics.length ? metrics.map((metric, index) => <article className="metric-card" key={metric.id}><div className="metric-top"><span>{metric.label}</span><span className={`metric-icon metric-icon-${index}`}>{['↗', '▤', '◎', '◫'][index]}</span></div><div className="metric-value">{metric.value}</div><div className="metric-footer"><span className={`metric-change ${metric.trend}`}>{metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{metric.change}</span><span>{metric.detail}</span><Sparkles size={13} className="metric-sparkle" /></div><div className={`metric-sparkline spark-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article>) : Array.from({ length: 4 }, (_, index) => <div className="metric-card metric-skeleton" key={index} />)}</section>
      <div className="dashboard-grid"><RevenueChart points={revenue} /><ActivityFeed items={activity} /></div><OrdersTable orders={orders} query={query} />
    </> : <><div className="module-welcome"><div><div className="welcome-kicker"><span className="live-indicator" /> NORTHSTAR WORKSPACE</div><h1>{activePage}</h1><p>{pageDescriptions[activePage]}</p></div><span className="module-updated"><span className="date-dot" /> Updated just now</span></div><ModuleWorkspace page={activePage} query={query} orders={orders} revenue={revenue} activities={filteredActivity} products={products} purchases={purchases} people={people} invoices={invoices} reports={reports} onAction={announce} /></>}
    <footer className="page-footer"><span>© 2026 Northstar Inc.</span><span>All systems operational <i className="live-indicator" /></span><a href="mailto:support@northstar.example">Support <span>↗</span></a></footer>
  </div></main>{notice && <div className="toast" role="status">{notice}</div>}</div>;
}
export default App;

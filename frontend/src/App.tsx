import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Download, Plus, Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ActivityFeed } from './features/dashboard/ActivityFeed';
import { OrdersTable } from './features/dashboard/OrdersTable';
import { RevenueChart } from './features/dashboard/RevenueChart';
import { dashboardApi } from './lib/mock-api';
import type { Activity, Metric, Order, RevenuePoint } from './types/erp';
import './styles.css';

function App() {
  const [activePage, setActivePage] = useState('Overview');
  const [query, setQuery] = useState('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [notice, setNotice] = useState('');
  useEffect(() => { void Promise.all([dashboardApi.getMetrics(), dashboardApi.getRevenue(), dashboardApi.getOrders(), dashboardApi.getActivity()]).then(([m, r, o, a]) => { setMetrics(m); setRevenue(r); setOrders(o); setActivity(a); }); }, []);
  const announce = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  return <div className="app-shell"><Sidebar active={activePage} onNavigate={setActivePage} /><main className="main-shell"><Topbar query={query} onQueryChange={setQuery} onOpenNotifications={() => announce('You’re all caught up.')} /><div className="page-content"><div className="welcome-row"><div><div className="welcome-kicker"><span className="live-indicator" /> YOUR BUSINESS AT A GLANCE</div><h1>{activePage === 'Overview' ? 'Good morning, Gokul' : activePage}<span className="greeting-sparkle">✳</span></h1><p>Here’s what’s happening with your business today.</p></div><div className="welcome-actions"><button className="outline-button" onClick={() => announce('Your report is being prepared.')}><Download size={16} /> Export report</button><button className="primary-button" onClick={() => announce('New order form is coming soon.')}><Plus size={17} /> Create new</button></div></div>
    <div className="date-strip"><CalendarDays size={14} /><span>Friday, October 17, 2026</span><span className="date-separator">·</span><span>Data updated just now</span><button onClick={() => announce('Showing today’s sample workspace data.')}>Today <span>⌄</span></button></div>
    <section className="metric-grid" aria-label="Business metrics">{metrics.length ? metrics.map((metric, index) => <article className="metric-card" key={metric.id}><div className="metric-top"><span>{metric.label}</span><span className={`metric-icon metric-icon-${index}`}>{['↗', '▤', '◎', '◫'][index]}</span></div><div className="metric-value">{metric.value}</div><div className="metric-footer"><span className={`metric-change ${metric.trend}`}>{metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{metric.change}</span><span>{metric.detail}</span><Sparkles size={13} className="metric-sparkle" /></div><div className={`metric-sparkline spark-${index}`}><i /><i /><i /><i /><i /><i /><i /></div></article>) : Array.from({ length: 4 }, (_, index) => <div className="metric-card metric-skeleton" key={index} />)}</section>
    <div className="dashboard-grid"><RevenueChart points={revenue} /><ActivityFeed items={activity} /></div><OrdersTable orders={orders} query={query} />
    <footer className="page-footer"><span>© 2026 Northstar Inc.</span><span>All systems operational <i className="live-indicator" /></span><a href="mailto:support@northstar.example">Support <span>↗</span></a></footer>
  </div></main>{notice && <div className="toast" role="status">{notice}</div>}</div>;
}
export default App;

import { useState } from 'react';
import type { RevenuePoint } from '../../types/erp';
import { formatCurrency } from '../../lib/workspace-preferences';
import type { CurrencyCode } from '../../lib/workspace-preferences';

interface RevenueChartProps { points: RevenuePoint[]; currency?: CurrencyCode; template?: boolean; }
export function RevenueChart({ points, currency = 'USD', template = false }: RevenueChartProps) {
  const [range, setRange] = useState('12 months');
  const axisCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 }).format(value);
  const visiblePoints = range === '12 months' ? points : range === '6 months' ? points.slice(-6) : points.slice(-1);
  const max = Math.max(...visiblePoints.map((point) => point.revenue)) * 1.15;
  return <section className={`panel revenue-panel${template ? ' revenue-template-panel' : ''}`}>{!template && <div className="panel-heading"><div><div className="eyebrow">PERFORMANCE</div><h2>Revenue overview</h2><p>Revenue and expenses over time</p></div><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Chart time range"><option>12 months</option><option>6 months</option><option>30 days</option></select></div>}
    <div className="chart-legend"><span><i className="legend-revenue" /> Revenue <b>{formatCurrency(284600, currency)}</b></span><span><i className="legend-expenses" /> Expenses <b>{formatCurrency(96200, currency)}</b></span></div>
    <div className="chart-wrap"><div className="chart-y-labels">{[120,90,60,30,0].map((value) => <span key={value}>{axisCurrency(value * 1000)}</span>)}</div><div className="chart-content"><div className="chart-grid">{[0,1,2,3,4].map((line) => <div key={line} />)}</div><div className="bars">{visiblePoints.map((point, index) => <div className="bar-group" key={point.month} title={`${point.month}: revenue ${formatCurrency(point.revenue * 1000, currency)}, expenses ${formatCurrency(point.expenses * 1000, currency)}`}><div className="bar-pair"><i className="bar-expenses" style={{ height: `${point.expenses / max * 100}%`, animationDelay: `${index * 35}ms` }} /><i className="bar-revenue" style={{ height: `${point.revenue / max * 100}%`, animationDelay: `${index * 35 + 35}ms` }} /></div><small>{point.month}</small></div>)}</div></div></div>
  </section>;
}

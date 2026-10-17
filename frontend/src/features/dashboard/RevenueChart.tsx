import { useState } from 'react';
import type { RevenuePoint } from '../../types/erp';

interface RevenueChartProps { points: RevenuePoint[]; }
export function RevenueChart({ points }: RevenueChartProps) {
  const [range, setRange] = useState('12 months');
  const visiblePoints = range === '12 months' ? points : range === '6 months' ? points.slice(-6) : points.slice(-1);
  const max = Math.max(...visiblePoints.map((point) => point.revenue)) * 1.15;
  return <section className="panel revenue-panel"><div className="panel-heading"><div><div className="eyebrow">PERFORMANCE</div><h2>Revenue overview</h2><p>Revenue and expenses over time</p></div><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Chart time range"><option>12 months</option><option>6 months</option><option>30 days</option></select></div>
    <div className="chart-legend"><span><i className="legend-revenue" /> Revenue <b>$284.6k</b></span><span><i className="legend-expenses" /> Expenses <b>$96.2k</b></span></div>
    <div className="chart-wrap"><div className="chart-y-labels"><span>$120k</span><span>$90k</span><span>$60k</span><span>$30k</span><span>$0</span></div><div className="chart-content"><div className="chart-grid">{[0,1,2,3,4].map((line) => <div key={line} />)}</div><div className="bars">{visiblePoints.map((point) => <div className="bar-group" key={point.month} title={`${point.month}: revenue $${point.revenue}k, expenses $${point.expenses}k`}><div className="bar-pair"><i className="bar-expenses" style={{ height: `${point.expenses / max * 100}%` }} /><i className="bar-revenue" style={{ height: `${point.revenue / max * 100}%` }} /></div><small>{point.month}</small></div>)}</div></div></div>
  </section>;
}

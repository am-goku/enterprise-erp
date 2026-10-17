import { ArrowUpRight, BadgeDollarSign, Boxes, ShoppingBag, UserRoundPlus } from 'lucide-react';
import type { Activity } from '../../types/erp';
const icons = { order: ShoppingBag, inventory: Boxes, people: UserRoundPlus, finance: BadgeDollarSign };
interface ActivityFeedProps { items: Activity[]; }
export function ActivityFeed({ items }: ActivityFeedProps) {
  return <section className="panel activity-panel"><div className="panel-heading"><div><div className="eyebrow">WHAT'S HAPPENING</div><h2>Recent activity</h2><p>Updates across your workspace</p></div><button className="icon-button activity-more" aria-label="More activity options"><ArrowUpRight size={17} /></button></div><div className="activity-list">{items.map((item) => { const Icon = icons[item.kind]; return <div className="activity-item" key={item.id}><div className={`activity-icon ${item.kind}`}><Icon size={16} /></div><div className="activity-copy"><strong>{item.title}</strong><p>{item.description}</p></div><time>{item.time}</time></div>; })}</div><button className="activity-link">View activity log <ArrowUpRight size={14} /></button></section>;
}

import { Bell, ChevronDown, Command, Search } from 'lucide-react';

interface TopbarProps { query: string; onQueryChange: (value: string) => void; onOpenNotifications: () => void; }
export function Topbar({ query, onQueryChange, onOpenNotifications }: TopbarProps) {
  return <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Overview</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search anything..." aria-label="Search orders" /><kbd><Command size={10} /> K</kbd></label><button className="icon-button notification-button" aria-label="Notifications" onClick={onOpenNotifications}><Bell size={18} /><i /></button><div className="topbar-divider" /><button className="topbar-date"><span className="date-dot" /> Friday, October 17, 2026 <ChevronDown size={14} /></button></div></header>;
}

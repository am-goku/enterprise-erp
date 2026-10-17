import { Bell, ChevronDown, Command, Search } from 'lucide-react';

interface TopbarProps { page: string; query: string; searchable: boolean; onQueryChange: (value: string) => void; onOpenNotifications: () => void; }
export function Topbar({ page, query, searchable, onQueryChange, onOpenNotifications }: TopbarProps) {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  return <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{page}</strong></div><div className="topbar-actions">{searchable && <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={`Search ${page.toLowerCase()}...`} aria-label={`Search ${page.toLowerCase()}`} /><kbd><Command size={10} /> K</kbd></label>}<button className="icon-button notification-button" aria-label="Notifications" onClick={onOpenNotifications}><Bell size={18} /><i /></button><div className="topbar-divider" /><button className="topbar-date"><span className="date-dot" /> {today} <ChevronDown size={14} /></button></div></header>;
}

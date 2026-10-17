import { Bell, ChevronDown, Command, Search } from 'lucide-react';
import { defaultWorkspacePreferences, formatWorkspaceDate } from '../lib/workspace-preferences';

interface TopbarProps { page: string; query: string; searchable: boolean; onQueryChange: (value: string) => void; onOpenNotifications: () => void; timezone?: string; }
export function Topbar({ page, query, searchable, onQueryChange, onOpenNotifications, timezone = defaultWorkspacePreferences.timezone }: TopbarProps) {
  const today = formatWorkspaceDate(new Date(), timezone, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  return <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{page}</strong></div><div className="topbar-actions">{searchable && <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={`Search ${page.toLowerCase()}...`} aria-label={`Search ${page.toLowerCase()}`} /><kbd><Command size={10} /> K</kbd></label>}<button className="icon-button notification-button" aria-label="Notifications" onClick={onOpenNotifications}><Bell size={18} /><i /></button><div className="topbar-divider" /><button className="topbar-date"><span className="date-dot" /> {today} <ChevronDown size={14} /></button></div></header>;
}

import { useState } from 'react';
import { Activity, BadgeDollarSign, BarChart3, Boxes, ChevronDown, CircleHelp, Command, LayoutDashboard, LifeBuoy, Package, PanelLeftClose, PanelLeftOpen, Settings2, ShoppingBag, UsersRound } from 'lucide-react';

const sections = [
  { title: 'WORKSPACE', items: [
    { name: 'Overview', icon: LayoutDashboard }, { name: 'Sales', icon: ShoppingBag, badge: '12' },
    { name: 'Inventory', icon: Boxes }, { name: 'Purchasing', icon: Package },
  ] },
  { title: 'MANAGE', items: [
    { name: 'People', icon: UsersRound }, { name: 'Finance', icon: BadgeDollarSign },
    { name: 'Reports', icon: BarChart3 }, { name: 'Activity', icon: Activity },
  ] },
];

interface SidebarProps { active: string; onNavigate: (page: string) => void; }
export function Sidebar({ active, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  return <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <div className="brand-row"><div className="brand-mark"><Command size={19} strokeWidth={2.4} /></div>{!collapsed && <span className="brand-name">northstar<span>.</span></span>}<button className="icon-button sidebar-toggle" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</button></div>
    <button className="workspace-switch"><div className="workspace-avatar">N</div>{!collapsed && <><span className="workspace-copy"><strong>Northstar Inc.</strong><small>Enterprise plan</small></span><ChevronDown size={15} className="muted-icon" /></>}</button>
    <nav className="side-nav" aria-label="Main navigation">{sections.map((section) => <div className="nav-section" key={section.title}>{!collapsed && <div className="nav-heading">{section.title}</div>}{section.items.map(({ name, icon: Icon, badge }) => <button key={name} onClick={() => onNavigate(name)} className={`nav-item ${active === name ? 'active' : ''}`} title={collapsed ? name : undefined}><Icon size={18} strokeWidth={1.8} /><span>{!collapsed && name}</span>{badge && !collapsed && <i>{badge}</i>}</button>)}</div>)}</nav>
    <div className="sidebar-bottom"><button className={`nav-item ${active === 'Settings' ? 'active' : ''}`} onClick={() => onNavigate('Settings')}><Settings2 size={18} /><span>{!collapsed && 'Settings'}</span></button><button className={`nav-item ${active === 'Help center' ? 'active' : ''}`} onClick={() => onNavigate('Help center')}><CircleHelp size={18} /><span>{!collapsed && 'Help center'}</span></button>
      {!collapsed && <div className="help-card"><div className="help-icon"><LifeBuoy size={17} /></div><strong>Need a hand?</strong><p>Our team is here to help you get the most out of Northstar.</p><button onClick={() => onNavigate('Help center')}>Visit help center <span>↗</span></button></div>}
      <div className="profile-row"><div className="profile-photo">JL</div>{!collapsed && <><div className="profile-copy"><strong>Jordan Lee</strong><small>Admin</small></div><button className="icon-button profile-menu" aria-label="Profile menu"><ChevronDown size={15} /></button></>}</div>
    </div>
  </aside>;
}

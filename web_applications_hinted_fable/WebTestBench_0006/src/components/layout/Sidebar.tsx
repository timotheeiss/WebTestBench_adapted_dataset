import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  FolderOpen, 
  BarChart3, 
  Calculator,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/categories', label: 'Categories', icon: FolderOpen },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/tax-summary', label: 'Tax Summary', icon: Calculator },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border no-print">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">LedgerFlow</h1>
            <p className="text-xs text-sidebar-foreground/60">Bookkeeping Made Simple</p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-4 py-6 space-y-1"
          data-semtag-id="nav.sidebar"
          data-semtag-role="collection"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const slug = item.path === '/' ? 'dashboard' : item.path.slice(1);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                data-semtag-id={`nav.item.${slug}`}
                data-semtag-role="navigation"
                data-semtag-target={`${slug}.page`}
                className={cn(
                  'nav-item',
                  isActive && 'nav-item-active'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50">
            © 2024 LedgerFlow
          </p>
        </div>
      </div>
    </aside>
  );
}

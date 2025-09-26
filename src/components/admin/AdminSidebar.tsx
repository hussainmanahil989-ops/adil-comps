import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Blog Posts',
    href: '/admin/blog',
    icon: FileText,
  },
  {
    title: 'Portfolio',
    href: '/admin/portfolio',
    icon: Briefcase,
  },
  {
    title: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquare,
  },
  {
    title: 'Contact Leads',
    href: '/admin/leads',
    icon: Users,
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function AdminSidebar({ collapsed, onCollapsedChange }: AdminSidebarProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-youtube rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h2 className="font-semibold text-sidebar-primary">CMS Admin</h2>
                <p className="text-xs text-sidebar-foreground">Content Management</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/admin' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center space-x-3",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-youtube text-white">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-primary truncate">
                Admin
              </p>
              <p className="text-xs text-sidebar-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="mt-3 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs"
            >
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="flex-1 text-xs"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Home, Sliders, BarChart3, Settings, LogOut } from "lucide-react";

interface BottomNavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isLogout?: boolean;
}

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const bottomNavItems: BottomNavigationItem[] = [
    { path: "/", label: "Home", icon: Home },
    { path: "/control", label: "Control", icon: Sliders },
    { path: "/reports", label: "Reports", icon: BarChart3 },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/logout", label: "Logout", icon: LogOut, isLogout: true },
  ];

  const handleItemClick = (item: BottomNavigationItem) => {
    if (item.isLogout) {
      logout();
      // Redirect to login page after logout
      window.location.href = "/login";
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === location.pathname && !item.isLogout;

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={cn(
                "flex-1 h-12 w-12 rounded-lg transition-all duration-200 hover:bg-accent",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => handleItemClick(item)}
              title={item.label}
              aria-label={item.label}
            >
              <Icon
                className={`h-6 w-6 ${!isActive ? "dark:text-white" : ""}`}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

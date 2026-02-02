import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "../hooks/use-auth";
import { useTheme } from "../hooks/use-theme";
import { useIsMobile } from "../hooks/use-mobile";
import { BottomNavigation } from "./ui/bottom-navigation";
import { MobileProfileSheet } from "./mobile-profile-sheet";
import {
  Home,
  Settings,
  BarChart3,
  Sliders,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/control", label: "Control", icon: Sliders },
    { path: "/reports", label: "Reports", icon: BarChart3 },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Only show on desktop */}
      {!isMobile && (
        <div
          className={`fixed left-0 top-0 h-full bg-card border-border border-r flex flex-col transition-all duration-200 ease-out z-40 will-change-transform shadow-lg ${isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"}`}
          style={{ width: "256px" }}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">
              Dryer Dashboard
            </h1>
          </div>
          <nav className="flex-1 px-4 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start mb-2 px-4 transition-all duration-200 ease-out hover:cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4 mr-3 transition-all duration-200 ease-out" />
                  <span className="transition-opacity duration-200 ease-out">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </nav>
          <div className="p-4 border-t space-y-2 border-border">
            {user && (
              <div className="space-y-2 pb-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs capitalize truncate text-muted-foreground">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-out ${
          isMobile ? "ml-0" : isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-card border-border border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              )}
              <h2 className="text-xl font-semibold text-foreground">
                {
                  menuItems.find((item) => item.path === location.pathname)
                    ?.label
                }
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              {/* User Avatar - Desktop: Dropdown, Mobile: Profile Sheet */}
              {isMobile ? (
                <MobileProfileSheet />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 md:h-10 md:w-10 rounded-full"
                    >
                      <Avatar className="h-8 w-8 md:h-10 md:w-10">
                        <AvatarFallback>
                          {user ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 overflow-auto bg-background ${
          isMobile ? "p-4 pb-20" : "p-4 sm:p-6"
        }`}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, User, LogOut } from "lucide-react";

export const MobileProfileSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-lg"
          aria-label="Profile menu"
        >
          <User className="h-6 w-6 dark:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-0 bg-card animate-slide-up"
      >
        <div className="px-6 py-8 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 pb-6 border-b">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-bold">
                {user ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {user?.name || "Unknown User"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {user?.email || "No email"}
              </p>
              <Badge variant="secondary" className="w-fit capitalize">
                {user?.role || "guest"}
              </Badge>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Appearance</h4>
            <Button
              variant="outline"
              className="w-full justify-start dark:text-white"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="mr-3 h-5 w-5 dark:text-white" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-3 h-5 w-5 dark:text-white" />
                  Switch to Dark Mode
                </>
              )}
            </Button>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log Out
            </Button>
          </div>

          {/* Close Button */}
          <Button
            variant="outline"
            className="w-full dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

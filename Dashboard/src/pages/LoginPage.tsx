import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../hooks/use-auth";
import { useTheme } from "../hooks/use-theme";
import { Sun, Moon } from "lucide-react";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Login successful!");
      window.location.reload();
    } else {
      toast.error(
        'Invalid credentials. Use any email from the user list with password "password"',
      );
      setError("");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-background lg:p-4">
      <Card className="w-full h-screen rounded-none border-0 lg:h-auto lg:max-w-md lg:rounded-xl lg:border lg:mx-4">
        <CardHeader className="relative">
          <div className="absolute top-2 right-2">
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
          </div>
          <CardTitle>Dryer Dashboard</CardTitle>
          <CardDescription>
            Sign in to access the dryer control system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <div className="text-sm text-destructive-foreground bg-destructive/10 p-3 rounded">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-xs sm:text-sm text-muted-foreground lg:block">
            <p className="lg:mb-1">Demo users:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 lg:block">
              <p>john@dryer.com (Admin)</p>
              <p>jane@dryer.com (Operator)</p>
              <p>bob@dryer.com (Viewer)</p>
              <p>Password: password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

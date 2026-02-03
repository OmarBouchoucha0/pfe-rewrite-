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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { mockSettings, mockUsers } from "../lib/mockData";
import { useAuth } from "../hooks/use-auth";
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  Bell,
  Shield,
  Database,
  Smartphone,
  User as UserIcon,
  Mail,
} from "lucide-react";

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(mockSettings);
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "viewer",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    sessionComplete: true,
    temperatureAlerts: true,
    humidityAlerts: false,
    maintenance: true,
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    setSettings(mockSettings);
    toast("Settings reset to defaults");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your dryer settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>
              Manage your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                />
                <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={userProfile.role}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <div className="flex gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <Button onClick={handleSaveProfile} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Dryer Configuration
            </CardTitle>
            <CardDescription>
              Configure default dryer parameters and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxTemp">Maximum Temperature (°C)</Label>
              <Input
                id="maxTemp"
                type="number"
                value={settings.maxTemperature}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxTemperature: parseInt(e.target.value),
                  })
                }
                className="no-spinner"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minHumidity">Minimum Humidity (%)</Label>
              <Input
                id="minHumidity"
                type="number"
                value={settings.minHumidity}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    minHumidity: parseInt(e.target.value),
                  })
                }
                className="no-spinner"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoShutoff">Auto Shutoff</Label>
                <input
                  id="autoShutoff"
                  type="checkbox"
                  checked={settings.autoShutoff}
                  onChange={(e) =>
                    setSettings({ ...settings, autoShutoff: e.target.checked })
                  }
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">System Notifications</Label>
                <input
                  id="notifications"
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: e.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button onClick={handleSaveSettings} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
              <Button onClick={handleResetSettings} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to receive alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Notification Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                  </div>
                  <input
                    id="emailNotif"
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <Label htmlFor="pushNotif">Push Notifications</Label>
                  </div>
                  <input
                    id="pushNotif"
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <Label htmlFor="smsNotif">SMS Alerts</Label>
                  </div>
                  <input
                    id="smsNotif"
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        sms: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Alert Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionComplete">Session Complete</Label>
                  <input
                    id="sessionComplete"
                    type="checkbox"
                    checked={notifications.sessionComplete}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        sessionComplete: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="tempAlerts">Temperature Alerts</Label>
                  <input
                    id="tempAlerts"
                    type="checkbox"
                    checked={notifications.temperatureAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        temperatureAlerts: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="humidityAlerts">Humidity Alerts</Label>
                  <input
                    id="humidityAlerts"
                    type="checkbox"
                    checked={notifications.humidityAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        humidityAlerts: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">Maintenance Reminders</Label>
                  <input
                    id="maintenance"
                    type="checkbox"
                    checked={notifications.maintenance}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        maintenance: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Export and manage your dryer data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Export Options</h4>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Export All Data (CSV)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Export Session History (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Backup Configuration
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Data Retention</h4>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage security and access controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Active Users</h4>
              <div className="space-y-2">
                {mockUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {u.email}
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {u.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Security Options</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <input
                    id="twoFactor"
                    type="checkbox"
                    defaultChecked={false}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="120">120</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

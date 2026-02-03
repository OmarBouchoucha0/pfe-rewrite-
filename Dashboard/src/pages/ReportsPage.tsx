import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateHistoricalData,
  mockSessions,
  getProductIcon,
} from "../lib/mockData";
import { useIsMobile } from "../hooks/use-mobile";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { CheckCircle, Clock, AlertCircle, Play, Monitor, Smartphone, Download } from "lucide-react";

export const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30");
  const isMobile = useIsMobile();
  const historicalData = generateHistoricalData(parseInt(timeRange));

  // Simplify data on mobile for better performance
  const chartData = isMobile
    ? historicalData.filter((_, index) => index % 2 === 0)
    : historicalData;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return (
          <Play className="h-4 w-4 text-[var(--status-running-foreground)]" />
        );
      case "completed":
        return (
          <CheckCircle className="h-4 w-4 text-[var(--status-completed-foreground)]" />
        );
      case "failed":
        return (
          <AlertCircle className="h-4 w-4 text-[var(--status-failed-foreground)]" />
        );
      default:
        return (
          <Clock className="h-4 w-4 text-[var(--status-pending-foreground)]" />
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "status-running";
      case "completed":
        return "status-completed";
      case "failed":
        return "status-failed";
      default:
        return "status-pending";
    }
  };

  const exportData = () => {
    alert("Export functionality would download CSV/Excel report");
  };

  const filteredSessions = mockSessions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            View dryer performance history and analytics
          </p>
        </div>
        <div
          className={`${isMobile ? "flex flex-col gap-2" : "flex items-center gap-2"}`}
        >
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={exportData}
            variant="outline"
            className="w-full sm:w-auto dark:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        {/* Mobile-only system reminder */}
        {isMobile && (
          <TabsContent value="charts" className="space-y-4">
            <Card className="bg-muted/50 border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Charts Not Available on Mobile
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Charts and detailed analytics are not available on mobile
                  devices. Please use a desktop or tablet to view comprehensive
                  reports and analytics.
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Monitor className="h-4 w-4" />
                  <Smartphone className="h-4 w-4" />
                  <span>Available on desktop & tablet</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Desktop-only charts */}
        {!isMobile && (
          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature Trends</CardTitle>
                  <CardDescription>Daily average temperature</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={isMobile ? 200 : 300}
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: isMobile ? 10 : 11, fill: 'var(--foreground)' }}
                        angle={isMobile ? -90 : -45}
                        textAnchor="end"
                        height={isMobile ? 80 : 60}
                        interval={
                          isMobile
                            ? Math.floor(historicalData.length / 5)
                            : Math.max(
                              1,
                              Math.floor(historicalData.length / 10),
                            )
                        }
                      />
                      <YAxis tick={{ fill: 'var(--foreground)' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--popover)',
                          color: 'var(--popover-foreground)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          fontSize: '12px'
                        }}
                        labelStyle={{
                          color: 'var(--foreground)',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: 'var(--foreground)',
                          fontSize: '12px',
                          paddingTop: '16px'
                        }}
                        iconType="line"
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--chart-1)"
                        name="Temperature (°C)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Humidity Levels</CardTitle>
                  <CardDescription>
                    Daily average humidity levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={isMobile ? 200 : 300}
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: isMobile ? 10 : 11, fill: 'var(--foreground)' }}
                        angle={isMobile ? -90 : -45}
                        textAnchor="end"
                        height={isMobile ? 80 : 60}
                        interval={
                          isMobile
                            ? Math.floor(historicalData.length / 5)
                            : Math.max(
                              1,
                              Math.floor(historicalData.length / 10),
                            )
                        }
                      />
                      <YAxis tick={{ fill: 'var(--foreground)' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--popover)',
                          color: 'var(--popover-foreground)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          fontSize: '12px'
                        }}
                        labelStyle={{
                          color: 'var(--foreground)',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: 'var(--foreground)',
                          fontSize: '12px',
                          paddingTop: '16px'
                        }}
                        iconType="line"
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="var(--chart-2)"
                        name="Humidity (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Count</CardTitle>
                  <CardDescription>
                    Number of drying sessions per day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={isMobile ? 200 : 300}
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: isMobile ? 10 : 11, fill: 'var(--foreground)' }}
                        angle={isMobile ? -90 : -45}
                        textAnchor="end"
                        height={isMobile ? 80 : 60}
                        interval={
                          isMobile
                            ? Math.floor(historicalData.length / 5)
                            : Math.max(
                              1,
                              Math.floor(historicalData.length / 10),
                            )
                        }
                      />
                      <YAxis tick={{ fill: 'var(--foreground)' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--popover)',
                          color: 'var(--popover-foreground)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          fontSize: '12px'
                        }}
                        labelStyle={{
                          color: 'var(--foreground)',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: 'var(--foreground)',
                          fontSize: '12px',
                          paddingTop: '16px'
                        }}
                        iconType="rect"
                      />
                      <Bar dataKey="sessions" fill="var(--chart-3)" name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Combined Metrics</CardTitle>
                  <CardDescription>
                    Temperature vs Humidity comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={isMobile ? 200 : 300}
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: isMobile ? 10 : 11, fill: 'var(--foreground)' }}
                        angle={isMobile ? -90 : -45}
                        textAnchor="end"
                        height={isMobile ? 80 : 60}
                        interval={
                          isMobile
                            ? Math.floor(historicalData.length / 5)
                            : Math.max(
                              1,
                              Math.floor(historicalData.length / 10),
                            )
                        }
                      />
                      <YAxis tick={{ fill: 'var(--foreground)' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--popover)',
                          color: 'var(--popover-foreground)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          fontSize: '12px'
                        }}
                        labelStyle={{
                          color: 'var(--foreground)',
                          fontWeight: 'bold'
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: 'var(--foreground)',
                          fontSize: '12px',
                          paddingTop: '16px'
                        }}
                        iconType="line"
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--chart-1)"
                        name="Temperature (°C)"
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        name="Humidity (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>
                Detailed history of all drying sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`${isMobile ? "space-y-3" : "flex items-center justify-between"} p-4 border rounded-lg`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {React.createElement(getProductIcon(session.product), {
                          className: "h-4 w-4",
                        })}
                        <div className="font-medium">{session.product}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.startTime.toLocaleDateString()} at{" "}
                        {session.startTime.toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target: {session.targetTemperature}°C /{" "}
                        {session.targetHumidity}%
                      </div>
                    </div>
                    <div
                      className={`${isMobile ? "space-y-2" : "text-right space-y-2"}`}
                    >
                      <Badge variant="secondary" className={getStatusColor(session.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(session.status)}
                          {session.status}
                        </span>
                      </Badge>
                      {session.endTime && (
                        <div className="text-sm text-muted-foreground">
                          Duration:{" "}
                          {Math.floor(
                            (session.endTime.getTime() -
                              session.startTime.getTime()) /
                            1000 /
                            60,
                          )}
                          {" "}min{" "}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

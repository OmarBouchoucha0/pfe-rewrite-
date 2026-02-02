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
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30");
  const isMobile = useIsMobile();
  const historicalData = generateHistoricalData(parseInt(timeRange));
  
  // Simplify data on mobile for better performance
  const chartData = isMobile 
    ? historicalData.filter((_, index) => index % 2 === 0) // Show every other data point
    : historicalData;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "running":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSessions = mockSessions.filter((session) => {
    const sessionDate = session.startTime;
    const daysAgo = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    return sessionDate >= cutoffDate;
  });

  const totalSessions = filteredSessions.length;
  const completedSessions = filteredSessions.filter(
    (s) => s.status === "completed",
  ).length;
  const successRate =
    totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
  const averageTemp =
    historicalData.length > 0
      ? historicalData.reduce((sum, d) => sum + d.temperature, 0) /
        historicalData.length
      : 0;
  const averageHumidity =
    historicalData.length > 0
      ? historicalData.reduce((sum, d) => sum + d.humidity, 0) /
        historicalData.length
      : 0;

  const exportData = () => {
    alert("Export functionality would download CSV/Excel report");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            View dryer performance history and analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24 sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              In the last {timeRange} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedSessions} of {totalSessions} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Temperature
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTemp.toFixed(1)}°C</div>
            <p className="text-xs text-muted-foreground">
              Average operating temperature
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Humidity</CardTitle>
            <TrendingDown className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageHumidity.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average humidity level
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
                <CardDescription>Daily average temperature</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={Math.max(
                        1,
                        Math.floor(historicalData.length / 10),
                      )}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Humidity Trends</CardTitle>
                <CardDescription>Daily average humidity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: isMobile ? 10 : 11 }}
                      angle={isMobile ? -90 : -45}
                      textAnchor="end"
                      height={isMobile ? 80 : 60}
                      interval={Math.max(
                        1,
                        Math.floor(historicalData.length / 10),
                      )}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Sessions</CardTitle>
                <CardDescription>
                  Number of drying sessions per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: isMobile ? 10 : 11 }}
                      angle={isMobile ? -90 : -45}
                      textAnchor="end"
                      height={isMobile ? 80 : 60}
                      interval={isMobile ? Math.floor(historicalData.length / 5) : Math.max(
                        1,
                        Math.floor(historicalData.length / 10),
                      )}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" fill="#8b5cf6" name="Sessions" />
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
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: isMobile ? 10 : 11 }}
                      angle={isMobile ? -90 : -45}
                      textAnchor="end"
                      height={isMobile ? 80 : 60}
                      interval={isMobile ? Math.floor(historicalData.length / 5) : Math.max(
                        1,
                        Math.floor(historicalData.length / 10),
                      )}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
                    className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'} p-4 border rounded-lg`}
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
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(session.status)}>
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
                              (1000 * 60 * 60),
                          )}
                          h{" "}
                          {Math.floor(
                            ((session.endTime.getTime() -
                              session.startTime.getTime()) /
                              (1000 * 60)) %
                              60,
                          )}
                          m
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

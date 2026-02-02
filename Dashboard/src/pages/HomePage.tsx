import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generateMockSensorData, mockSessions, getProductIcon } from '../lib/mockData';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [sensorData, setSensorData] = useState(generateMockSensorData());

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateMockSensorData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeSessions = mockSessions.filter(s => s.status === 'running').length;

  const currentSession = mockSessions.find(s => s.status === 'running');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4 text-[var(--status-running-foreground)]" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-[var(--status-completed-foreground)]" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-[var(--status-failed-foreground)]" />;
      default:
        return <Clock className="h-4 w-4 text-[var(--status-pending-foreground)]" />;
    }
  };

   const getStatusColor = (status: string) => {
     switch (status) {
       case 'running':
         return 'bg-[var(--status-running)] text-[var(--status-running-foreground)]';
       case 'completed':
         return 'bg-[var(--status-completed)] text-[var(--status-completed-foreground)]';
       case 'failed':
         return 'bg-[var(--status-failed)] text-[var(--status-failed-foreground)]';
       default:
         return 'bg-[var(--status-pending)] text-[var(--status-pending-foreground)]';
     }
   };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your dryer performance and current status
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.temperature}°C</div>
            <p className="text-xs text-muted-foreground">
              Current dryer temperature
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.humidity}%</div>
            <p className="text-xs text-muted-foreground">
              Current humidity level
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Air Flow</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.airFlow} m³/h</div>
            <p className="text-xs text-muted-foreground">
              Current air circulation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Session</CardTitle>
            <CardDescription>
              {currentSession ? 'Currently drying' : 'No active session'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentSession ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Product:</span>
                  <div className="flex items-center space-x-2">
                    {React.createElement(getProductIcon(currentSession.product), { className: "h-4 w-4" })}
                    <span>{currentSession.product}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Target Temp:</span>
                  <span>{currentSession.targetTemperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Target Humidity:</span>
                  <span>{currentSession.targetHumidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>
                    {Math.floor((Date.now() - currentSession.startTime.getTime()) / (1000 * 60 * 60))}h {Math.floor(((Date.now() - currentSession.startTime.getTime()) / (1000 * 60)) % 60)}m
                  </span>
                </div>
                <Badge className={getStatusColor(currentSession.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(currentSession.status)}
                    {currentSession.status}
                  </span>
                </Badge>
              </div>
            ) : (
              <p className="text-muted-foreground">No drying session is currently active.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Latest drying activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {React.createElement(getProductIcon(session.product), { className: "h-4 w-4" })}
                      <span className="font-medium">{session.product}</span>
                    </div>
                    <Badge className={getStatusColor(session.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(session.status)}
                        {session.status}
                      </span>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.startTime.toLocaleDateString()} {session.startTime.toLocaleTimeString()}
                    {session.endTime && (
                      <>
                        <br />
                        Duration: {Math.floor((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60 * 60))}h {Math.floor(((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)) % 60)}m
                      </>
                    )}
                  </div>
                  {session.id !== mockSessions[0].id && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
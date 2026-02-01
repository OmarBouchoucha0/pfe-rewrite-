export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
}

export interface SensorData {
  temperature: number;
  humidity: number;
  airFlow: number;
  timestamp: Date;
}

export interface DryerSession {
  id: string;
  product: string;
  startTime: Date;
  endTime?: Date;
  targetTemperature: number;
  targetHumidity: number;
  status: 'running' | 'completed' | 'paused' | 'failed';
}

export interface DryerSettings {
  maxTemperature: number;
  minHumidity: number;
  autoShutoff: boolean;
  notifications: boolean;
}
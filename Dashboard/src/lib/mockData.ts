import type { User, SensorData, DryerSession, DryerSettings } from '../types';
import { 
  Apple, 
  Banana, 
  Grape, 
  Cherry, 
  Circle, 
  Carrot
} from 'lucide-react';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@dryer.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@dryer.com', role: 'operator' },
  { id: '3', name: 'Bob Wilson', email: 'bob@dryer.com', role: 'viewer' },
];

export const productIcons: { [key: string]: React.ComponentType<any> } = {
  'Apples': Apple,
  'Bananas': Banana,
  'Mangoes': Circle,
  'Strawberries': Cherry,
  'Blueberries': Grape,
  'Peaches': Apple,
  'Plums': Circle,
  'Tomatoes': Cherry,
  'Carrots': Carrot,
  'Potatoes': Circle,
  'Onions': Circle,
  'Garlic': Circle,
};

export const getProductIcon = (productName: string) => {
  return productIcons[productName] || Apple;
};

export const generateMockSensorData = (): SensorData => ({
  temperature: Math.floor(Math.random() * 20) + 50,
  humidity: Math.floor(Math.random() * 30) + 20,
  airFlow: Math.floor(Math.random() * 10) + 5,
  timestamp: new Date(),
});

export const mockSessions: DryerSession[] = [
  {
    id: '1',
    product: 'Apples',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    targetTemperature: 60,
    targetHumidity: 25,
    status: 'completed',
  },
  {
    id: '2',
    product: 'Bananas',
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    targetTemperature: 55,
    targetHumidity: 30,
    status: 'running',
  },
  {
    id: '3',
    product: 'Tomatoes',
    startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    targetTemperature: 65,
    targetHumidity: 20,
    status: 'completed',
  },
];

export const mockSettings: DryerSettings = {
  maxTemperature: 80,
  minHumidity: 10,
  autoShutoff: true,
  notifications: true,
};

export const products = [
  'Apples',
  'Bananas',
  'Tomatoes',
  'Mangoes',
  'Strawberries',
  'Blueberries',
  'Peaches',
  'Plums',
  'Carrots',
  'Potatoes',
  'Onions',
  'Garlic',
];

export const generateHistoricalData = () => {
  const data: any[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperature: Math.floor(Math.random() * 20) + 50,
      humidity: Math.floor(Math.random() * 30) + 20,
      sessions: Math.floor(Math.random() * 5) + 1,
    });
  }
  return data;
};

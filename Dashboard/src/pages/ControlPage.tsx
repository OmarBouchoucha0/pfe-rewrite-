import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, mockSessions } from "../lib/mockData";
import {
  Play,
  Pause,
  Square,
  Settings as SettingsIcon,
  Thermometer,
  Droplets,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const ControlPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState("Bananas");
  const [targetTemp, setTargetTemp] = useState("55");
  const [targetHumidity, setTargetHumidity] = useState("30");
  const [dryingTime, setDryingTime] = useState("6");
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentSession = mockSessions.find((s) => s.status === "running");

  const handleStart = () => {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSelectedProduct("");
    setTargetTemp("60");
    setTargetHumidity("25");
    setDryingTime("4");
  };

  const productSettings: {
    [key: string]: { temp: string; humidity: string; time: string };
  } = {
    Apples: { temp: "60", humidity: "25", time: "4" },
    Bananas: { temp: "55", humidity: "30", time: "6" },
    Tomatoes: { temp: "65", humidity: "20", time: "3" },
    Mangoes: { temp: "55", humidity: "35", time: "8" },
    Strawberries: { temp: "50", humidity: "40", time: "5" },
    Blueberries: { temp: "50", humidity: "35", time: "6" },
    Peaches: { temp: "60", humidity: "30", time: "4" },
    Plums: { temp: "55", humidity: "25", time: "5" },
    Carrots: { temp: "70", humidity: "15", time: "3" },
    Potatoes: { temp: "65", humidity: "20", time: "4" },
    Onions: { temp: "60", humidity: "25", time: "3" },
    Garlic: { temp: "55", humidity: "20", time: "2" },
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    const settings = productSettings[value];
    if (settings) {
      setTargetTemp(settings.temp);
      setTargetHumidity(settings.humidity);
      setDryingTime(settings.time);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dryer Control</h1>
        <p className="text-muted-foreground">
          Control your dryer operations and configure drying parameters
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Drying Session</CardTitle>
            <CardDescription>
              {currentSession
                ? "Session in progress"
                : "Start a new drying session"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 hidden lg:block">
              <Label htmlFor="product">Product Type</Label>
              <Select
                value={selectedProduct}
                onValueChange={handleProductChange}
                disabled={isRunning}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2 lg:hidden">
                <Label htmlFor="product-mobile">Product Type</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={handleProductChange}
                  disabled={isRunning}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temp">Temperature</Label>
                <Select
                  value={targetTemp}
                  onValueChange={setTargetTemp}
                  disabled={isRunning}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 40).map(
                      (temp) => (
                        <SelectItem key={temp} value={temp.toString()}>
                          {temp}°C
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity</Label>
                <Select
                  value={targetHumidity}
                  onValueChange={setTargetHumidity}
                  disabled={isRunning}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 41 }, (_, i) => i + 10).map(
                      (humidity) => (
                        <SelectItem key={humidity} value={humidity.toString()}>
                          {humidity}%
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Duration</Label>
                <Select
                  value={dryingTime}
                  onValueChange={setDryingTime}
                  disabled={isRunning}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours}h
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-2">
              {!isRunning ? (
                <Button onClick={handleStart} className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Start Drying
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    className="flex-1"
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={handleStop}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                </>
              )}
            </div>

            {isRunning && (
              <div className="space-y-2">
                <Badge variant={isPaused ? "secondary" : "default"}>
                  {isPaused ? "Paused" : "Running"}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Session started at {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
            <CardDescription>Real-time dryer status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-[var(--chart-1)]" />
                  <span className="text-sm font-medium">Current Temp</span>
                </div>
                <div className="text-2xl font-bold">
                  {isRunning ? targetTemp : "--"}°C
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-[var(--chart-2)]" />
                  <span className="text-sm font-medium">Current Humidity</span>
                </div>
                <div className="text-2xl font-bold">
                  {isRunning ? targetHumidity : "--"}%
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--status-completed)]" />
                <span className="text-sm font-medium">Elapsed Time</span>
              </div>
              <div className="text-2xl font-bold">
                {isRunning ? `${Math.floor(Math.random() * 60)}m` : "--"}
              </div>
            </div>

            {selectedProduct && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4 text-[var(--chart-3)]" />
                  <span className="text-sm font-medium">Product Settings</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Optimal for {selectedProduct}</div>
                  <div>
                    • Target: {targetTemp}°C / {targetHumidity}%
                  </div>
                  <div>• Duration: {dryingTime} hours</div>
                </div>
              </div>
            )}

            {!isRunning && (
              <div className="bg-muted/50 border-border rounded-lg p-3">
                <div className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">No active session</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Configure parameters and press Start to begin drying
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Presets</CardTitle>
          <CardDescription>Common drying configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(productSettings)
              .slice(0, 8)
              .map(([product, settings]) => (
                <Button
                  key={product}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => handleProductChange(product)}
                  disabled={isRunning}
                >
                  <div className="font-medium">{product}</div>
                  <div className="text-xs text-muted-foreground">
                    {settings.temp}°C / {settings.humidity}% / {settings.time}h
                  </div>
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

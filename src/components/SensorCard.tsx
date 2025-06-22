
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Weight, Droplets, Thermometer, Activity, Zap } from "lucide-react";

interface SensorCardProps {
  bin: {
    id: number;
    location: string;
    fillLevel: number;
    wasteType: string;
    status: string;
    sensors: {
      weight: number;
      moisture: number;
      temperature: number;
    };
  };
}

const SensorCard: React.FC<SensorCardProps> = ({ bin }) => {
  const getSensorStatus = (value: number, type: 'weight' | 'moisture' | 'temperature') => {
    switch (type) {
      case 'weight':
        return value > 10 ? 'high' : value > 5 ? 'medium' : 'low';
      case 'moisture':
        return value > 60 ? 'high' : value > 30 ? 'medium' : 'low';
      case 'temperature':
        return value > 30 ? 'high' : value > 20 ? 'medium' : 'low';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            {bin.location}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Bin #{bin.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weight Sensor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Weight Sensor</span>
            </div>
            <Badge 
              className={`${getStatusColor(getSensorStatus(bin.sensors.weight, 'weight'))} text-white text-xs`}
            >
              {bin.sensors.weight} kg
            </Badge>
          </div>
          <Progress 
            value={(bin.sensors.weight / 15) * 100} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 kg</span>
            <span>15 kg (max)</span>
          </div>
        </div>

        {/* Moisture Sensor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Moisture Level</span>
            </div>
            <Badge 
              className={`${getStatusColor(getSensorStatus(bin.sensors.moisture, 'moisture'))} text-white text-xs`}
            >
              {bin.sensors.moisture}%
            </Badge>
          </div>
          <Progress 
            value={bin.sensors.moisture} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Dry</span>
            <span>Wet</span>
          </div>
        </div>

        {/* Temperature Sensor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <Badge 
              className={`${getStatusColor(getSensorStatus(bin.sensors.temperature, 'temperature'))} text-white text-xs`}
            >
              {bin.sensors.temperature}°C
            </Badge>
          </div>
          <Progress 
            value={(bin.sensors.temperature / 50) * 100} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0°C</span>
            <span>50°C</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Sensor Status
            </span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Online
            </Badge>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash2, 
  Recycle, 
  Leaf, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Droplets,
  Weight,
  Zap
} from "lucide-react";
import SensorCard from "@/components/SensorCard";
import WasteChart from "@/components/WasteChart";
import BinMap from "@/components/BinMap";
import CollectionSchedule from "@/components/CollectionSchedule";

const Index = () => {
  const binData = [
    {
      id: 1,
      location: "Campus Main Gate",
      fillLevel: 85,
      wasteType: "Mixed",
      lastCollection: "2 hours ago",
      status: "needs-collection",
      sensors: {
        weight: 12.5,
        moisture: 45,
        temperature: 24
      }
    },
    {
      id: 2,
      location: "Library Entrance",
      fillLevel: 32,
      wasteType: "Paper",
      lastCollection: "1 day ago",
      status: "normal",
      sensors: {
        weight: 4.2,
        moisture: 12,
        temperature: 23
      }
    },
    {
      id: 3,
      location: "Cafeteria",
      fillLevel: 67,
      wasteType: "Organic",
      lastCollection: "4 hours ago",
      status: "normal",
      sensors: {
        weight: 8.9,
        moisture: 68,
        temperature: 26
      }
    }
  ];

  const totalWasteCollected = 245.7;
  const recyclingRate = 78;
  const carbonSaved = 156.3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-full">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Smart Recycling Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time monitoring and management of IoT-enabled smart recycling bins
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Waste Collected</p>
                  <p className="text-3xl font-bold">{totalWasteCollected} kg</p>
                </div>
                <Trash2 className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Recycling Rate</p>
                  <p className="text-3xl font-bold">{recyclingRate}%</p>
                </div>
                <Recycle className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Carbon Saved</p>
                  <p className="text-3xl font-bold">{carbonSaved} kg</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Active Bins</p>
                  <p className="text-3xl font-bold">{binData.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Sensors
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Bin Status Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {binData.map((bin) => (
                <Card key={bin.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{bin.location}</CardTitle>
                      <Badge 
                        variant={bin.status === 'needs-collection' ? 'destructive' : 'default'}
                        className={bin.status === 'needs-collection' ? 'bg-red-500' : 'bg-green-500'}
                      >
                        {bin.status === 'needs-collection' ? (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {bin.status === 'needs-collection' ? 'Collection Needed' : 'Normal'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fill Level</span>
                        <span className="font-medium">{bin.fillLevel}%</span>
                      </div>
                      <Progress 
                        value={bin.fillLevel} 
                        className="h-2"
                        style={{
                          background: bin.fillLevel > 80 ? '#fee2e2' : '#f0fdf4'
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Waste Type</p>
                        <p className="font-medium">{bin.wasteType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Collection</p>
                        <p className="font-medium">{bin.lastCollection}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Weight className="h-3 w-3 text-gray-500" />
                          <span>{bin.sensors.weight} kg</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-blue-500" />
                          <span>{bin.sensors.moisture}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-orange-500">🌡️</span>
                          <span>{bin.sensors.temperature}°C</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Analytics Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Collection Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <WasteChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {binData.map((bin) => (
                <SensorCard key={bin.id} bin={bin} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bin Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <BinMap bins={binData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <CollectionSchedule bins={binData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

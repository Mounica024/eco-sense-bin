
import React from 'react';
import { MapPin, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BinMapProps {
  bins: Array<{
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
  }>;
}

const BinMap: React.FC<BinMapProps> = ({ bins }) => {
  // Simulated map positions
  const binPositions = [
    { id: 1, x: 25, y: 30 },
    { id: 2, x: 60, y: 45 },
    { id: 3, x: 40, y: 70 },
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Map Area */}
      <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 h-96 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 opacity-20"></div>
        
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-lg">
          <Navigation className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">Campus Map View</span>
        </div>

        {/* Map Pins */}
        {binPositions.map((pos) => {
          const bin = bins.find(b => b.id === pos.id);
          if (!bin) return null;
          
          return (
            <div
              key={pos.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className={`relative p-2 rounded-full ${
                bin.status === 'needs-collection' 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-green-500'
              } shadow-lg hover:scale-110 transition-transform duration-200`}>
                <MapPin className="h-6 w-6 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-white rounded-lg shadow-lg p-3 min-w-48">
                  <div className="text-sm font-medium">{bin.location}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Fill Level: {bin.fillLevel}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Type: {bin.wasteType}
                  </div>
                  <Badge 
                    variant={bin.status === 'needs-collection' ? 'destructive' : 'default'}
                    className="mt-2 text-xs"
                  >
                    {bin.status === 'needs-collection' ? 'Needs Collection' : 'Normal'}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 space-y-2">
          <div className="text-xs font-medium text-gray-700">Legend</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Normal Status</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>Needs Collection</span>
          </div>
        </div>
      </div>

      {/* Bin Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bins.map((bin) => (
          <Card key={bin.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-sm">{bin.location}</span>
                </div>
                {bin.status === 'needs-collection' ? (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bin ID:</span>
                  <span>#{bin.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fill Level:</span>
                  <span className={bin.fillLevel > 80 ? 'text-red-600 font-medium' : 'text-green-600'}>
                    {bin.fillLevel}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Waste Type:</span>
                  <span>{bin.wasteType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>{bin.sensors.weight} kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BinMap;

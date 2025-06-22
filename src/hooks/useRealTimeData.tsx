
import { useState, useEffect } from 'react';

interface BinData {
  id: number;
  location: string;
  fillLevel: number;
  wasteType: string;
  lastCollection: string;
  status: string;
  sensors: {
    weight: number;
    moisture: number;
    temperature: number;
  };
}

export const useRealTimeData = () => {
  const [binData, setBinData] = useState<BinData[]>([
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
  ]);

  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);

  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      setBinData(prevData => 
        prevData.map(bin => {
          // Simulate sensor fluctuations
          const weightChange = (Math.random() - 0.5) * 0.5;
          const moistureChange = (Math.random() - 0.5) * 5;
          const tempChange = (Math.random() - 0.5) * 2;
          const fillChange = Math.random() < 0.3 ? (Math.random() - 0.5) * 3 : 0;

          const newFillLevel = Math.max(0, Math.min(100, bin.fillLevel + fillChange));
          const newWeight = Math.max(0, bin.sensors.weight + weightChange);
          const newMoisture = Math.max(0, Math.min(100, bin.sensors.moisture + moistureChange));
          const newTemperature = Math.max(15, Math.min(40, bin.sensors.temperature + tempChange));

          // Update status based on fill level
          const newStatus = newFillLevel > 80 ? 'needs-collection' : 'normal';

          return {
            ...bin,
            fillLevel: Math.round(newFillLevel),
            status: newStatus,
            sensors: {
              weight: Math.round(newWeight * 10) / 10,
              moisture: Math.round(newMoisture),
              temperature: Math.round(newTemperature)
            }
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const toggleRealTime = () => {
    setIsRealTimeEnabled(prev => !prev);
  };

  return {
    binData,
    isRealTimeEnabled,
    toggleRealTime
  };
};

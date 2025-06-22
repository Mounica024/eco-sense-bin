
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Truck, CheckCircle, AlertTriangle, Plus } from 'lucide-react';

interface CollectionScheduleProps {
  bins: Array<{
    id: number;
    location: string;
    fillLevel: number;
    wasteType: string;
    status: string;
    lastCollection: string;
  }>;
}

const CollectionSchedule: React.FC<CollectionScheduleProps> = ({ bins }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduleData = [
    {
      id: 1,
      time: '08:00',
      location: 'Campus Main Gate',
      binId: 1,
      status: 'pending',
      priority: 'high',
      estimatedWeight: '12.5 kg',
      collector: 'Team A'
    },
    {
      id: 2,
      time: '10:30',
      location: 'Library Entrance',
      binId: 2,
      status: 'completed',
      priority: 'medium',
      estimatedWeight: '4.2 kg',
      collector: 'Team B'
    },
    {
      id: 3,
      time: '14:00',
      location: 'Cafeteria',
      binId: 3,
      status: 'pending',
      priority: 'medium',
      estimatedWeight: '8.9 kg',
      collector: 'Team A'
    }
  ];

  const upcomingCollections = scheduleData.filter(item => item.status === 'pending');
  const completedCollections = scheduleData.filter(item => item.status === 'completed');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Schedule Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Collection Schedule</h2>
          <p className="text-gray-600">Manage and track waste collection activities</p>
        </div>
        <div className="flex gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Collection
          </Button>
        </div>
      </div>

      {/* Schedule Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Pending Collections</p>
                <p className="text-2xl font-bold">{upcomingCollections.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed Today</p>
                <p className="text-2xl font-bold">{completedCollections.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">High Priority</p>
                <p className="text-2xl font-bold">
                  {scheduleData.filter(item => item.priority === 'high' && item.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Pending Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingCollections.map((collection) => (
              <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{collection.time}</div>
                    <div className="text-xs text-gray-500">Scheduled</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{collection.location}</span>
                      <Badge 
                        className={`${getPriorityColor(collection.priority)} text-white text-xs`}
                      >
                        {collection.priority} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Bin #{collection.binId} • Est. Weight: {collection.estimatedWeight} • {collection.collector}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Truck className="h-4 w-4 mr-1" />
                    Collect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Completed Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedCollections.map((collection) => (
              <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{collection.time}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{collection.location}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Completed
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Bin #{collection.binId} • Collected: {collection.estimatedWeight} • {collection.collector}
                    </div>
                  </div>
                </div>

                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionSchedule;


import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Activity, Pause } from 'lucide-react';

interface RealTimeToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const RealTimeToggle: React.FC<RealTimeToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2">
        {isEnabled ? (
          <Activity className="h-4 w-4 text-green-600 animate-pulse" />
        ) : (
          <Pause className="h-4 w-4 text-gray-500" />
        )}
        <span className="text-sm font-medium">Real-time Monitoring</span>
      </div>
      <Switch 
        checked={isEnabled} 
        onCheckedChange={onToggle}
      />
      <Badge 
        variant={isEnabled ? "default" : "secondary"}
        className={isEnabled ? "bg-green-600 text-white" : ""}
      >
        {isEnabled ? "Live" : "Paused"}
      </Badge>
    </div>
  );
};

export default RealTimeToggle;

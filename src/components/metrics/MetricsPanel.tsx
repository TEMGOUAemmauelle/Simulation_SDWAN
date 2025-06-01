import React from 'react';
import { BarChart, PieChart, Activity } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Label } from '../ui/Label';
import { BandwidthChart } from './BandwidthChart';
import { LatencyChart } from './LatencyChart';
import { PacketLossChart } from './PacketLossChart';
import { NetworkSummary } from './NetworkSummary';

export const MetricsPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Network Metrics</h3>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="timeRange" className="sr-only">Time Range</Label>
          <Select defaultValue="realtime">
            <SelectTrigger id="timeRange" className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="1min">Last 1 min</SelectItem>
              <SelectItem value="5min">Last 5 min</SelectItem>
              <SelectItem value="15min">Last 15 min</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <NetworkSummary />
      
      <Tabs defaultValue="bandwidth" className="mt-4 flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="bandwidth">
            <BarChart className="h-4 w-4 mr-2" />
            Bandwidth
          </TabsTrigger>
          <TabsTrigger value="latency">
            <Activity className="h-4 w-4 mr-2" />
            Latency
          </TabsTrigger>
          <TabsTrigger value="packetLoss">
            <PieChart className="h-4 w-4 mr-2" />
            Packet Loss
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bandwidth" className="flex-1 flex flex-col mt-4">
          <BandwidthChart />
        </TabsContent>
        
        <TabsContent value="latency" className="flex-1 flex flex-col mt-4">
          <LatencyChart />
        </TabsContent>
        
        <TabsContent value="packetLoss" className="flex-1 flex flex-col mt-4">
          <PacketLossChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};
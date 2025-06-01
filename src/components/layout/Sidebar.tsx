import React, { useState } from 'react';
import { 
  Network, 
  Server, 
  Cloud, 
  Router, 
  BarChart4, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  MonitorPlay
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { NetworkTools } from '../network/NetworkTools';
import { SimulationSettings } from '../simulation/SimulationSettings';
import { MetricsPanel } from '../metrics/MetricsPanel';
import { ScenarioPanel } from '../scenarios/ScenarioPanel';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
      collapsed ? 'w-14' : 'w-80'
    }`}>
      <div className="flex justify-end p-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {collapsed ? (
        <div className="flex flex-col items-center space-y-4 mt-4">
          <Button variant="ghost" size="icon">
            <Network className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MonitorPlay className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <BarChart4 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="network" className="flex-1 flex flex-col">
          <TabsList className="mx-4 mb-4 grid grid-cols-4">
            <TabsTrigger value="network">
              <Network className="h-4 w-4 mr-2" />
              Topology
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <MonitorPlay className="h-4 w-4 mr-2" />
              Traffic
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <BarChart4 className="h-4 w-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="scenarios">
              <Settings className="h-4 w-4 mr-2" />
              Scenarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="flex-1 overflow-auto px-4">
            <NetworkTools />
          </TabsContent>
          <TabsContent value="simulation" className="flex-1 overflow-auto px-4">
            <SimulationSettings />
          </TabsContent>
          <TabsContent value="metrics" className="flex-1 overflow-auto px-4">
            <MetricsPanel />
          </TabsContent>
          <TabsContent value="scenarios" className="flex-1 overflow-auto px-4">
            <ScenarioPanel />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
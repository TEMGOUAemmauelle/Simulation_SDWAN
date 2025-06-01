import React from 'react';
import { useSimulationStore } from '../../stores/simulationStore';
import { useNetworkStore } from '../../stores/networkStore';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Separator } from '../ui/Separator';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { Switch } from '../ui/Switch';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';

export const SimulationSettings: React.FC = () => {
  const { 
    trafficPattern,
    packetSize,
    packetRate,
    routingAlgorithm,
    fecEnabled,
    setTrafficPattern,
    setPacketSize,
    setPacketRate,
    setRoutingAlgorithm,
    setFecEnabled
  } = useSimulationStore();
  
  const { nodes } = useNetworkStore();
  const sites = nodes.filter(node => node.type === 'site');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Traffic Generation</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trafficPattern">Traffic Pattern</Label>
          <Select value={trafficPattern} onValueChange={setTrafficPattern}>
            <SelectTrigger id="trafficPattern">
              <SelectValue placeholder="Select traffic pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uniform">Uniform (All Sites)</SelectItem>
              <SelectItem value="hub-spoke">Hub and Spoke</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {trafficPattern === 'custom' && (
          <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">Select source and destination sites</p>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sites.map(site => (
                <div key={site.id} className="flex items-center space-x-2">
                  <Checkbox id={`site-${site.id}`} />
                  <Label htmlFor={`site-${site.id}`}>{site.name}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packetSize">Packet Size (bytes)</Label>
            <Input
              id="packetSize"
              type="number"
              value={packetSize}
              onChange={(e) => setPacketSize(Number(e.target.value))}
              min={64}
              max={1500}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="packetRate">Packet Rate</Label>
              <span className="text-sm">{packetRate} pps</span>
            </div>
            <Slider
              id="packetRate"
              value={[packetRate]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setPacketRate(value[0])}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <h3 className="text-lg font-medium">Traffic Types</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <Label htmlFor="voiceTraffic">Voice</Label>
          </div>
          <Input 
            id="voiceTraffic" 
            type="number" 
            className="w-16" 
            defaultValue="20" 
            min="0"
            max="100"
          />
          <span className="text-sm">%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <Label htmlFor="videoTraffic">Video</Label>
          </div>
          <Input 
            id="videoTraffic" 
            type="number" 
            className="w-16" 
            defaultValue="30" 
            min="0"
            max="100"
          />
          <span className="text-sm">%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <Label htmlFor="dataTraffic">Data</Label>
          </div>
          <Input 
            id="dataTraffic" 
            type="number" 
            className="w-16" 
            defaultValue="50" 
            min="0"
            max="100"
          />
          <span className="text-sm">%</span>
        </div>
      </div>
      
      <Separator />
      
      <h3 className="text-lg font-medium">Routing Settings</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="routingAlgorithm">Routing Algorithm</Label>
          <Select value={routingAlgorithm} onValueChange={setRoutingAlgorithm}>
            <SelectTrigger id="routingAlgorithm">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shortest-path">Shortest Path</SelectItem>
              <SelectItem value="least-cost">Least Cost</SelectItem>
              <SelectItem value="load-balance">Load Balanced</SelectItem>
              <SelectItem value="application-aware">Application Aware</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="fecEnabled" 
            checked={fecEnabled}
            onCheckedChange={setFecEnabled}
          />
          <Label htmlFor="fecEnabled">Enable Forward Error Correction (FEC)</Label>
        </div>
      </div>
    </div>
  );
};
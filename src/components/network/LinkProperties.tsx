import React from 'react';
import { LinkType } from '../../types/network';
import { useNetworkStore } from '../../stores/networkStore';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Slider } from '../ui/Slider';
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/Separator';

interface LinkPropertiesProps {
  link: LinkType;
}

export const LinkProperties: React.FC<LinkPropertiesProps> = ({ link }) => {
  const { updateLink, removeLink } = useNetworkStore();

  const handleTypeChange = (value: string) => {
    updateLink(link.id, { ...link, type: value as 'overlay' | 'underlay' | 'mpls' | 'internet' | 'lte' });
  };

  const handlePropertyChange = (key: string, value: any) => {
    const updatedProperties = { ...link.properties, [key]: value };
    updateLink(link.id, { ...link, properties: updatedProperties });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Link Properties</h3>
      
      <div className="space-y-2">
        <Label htmlFor="linkType">Link Type</Label>
        <Select value={link.type} onValueChange={handleTypeChange}>
          <SelectTrigger id="linkType">
            <SelectValue placeholder="Select link type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overlay">Overlay</SelectItem>
            <SelectItem value="underlay">Underlay</SelectItem>
            <SelectItem value="mpls">MPLS</SelectItem>
            <SelectItem value="internet">Internet</SelectItem>
            <SelectItem value="lte">LTE/5G</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <Label htmlFor="linkBandwidth">Bandwidth (Mbps)</Label>
        <Input 
          id="linkBandwidth" 
          type="number" 
          value={link.properties.bandwidth || '100'}
          onChange={(e) => handlePropertyChange('bandwidth', Number(e.target.value))} 
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="linkLatency">Latency (ms)</Label>
          <span className="text-sm">{link.properties.latency || 20} ms</span>
        </div>
        <Slider
          id="linkLatency"
          defaultValue={[link.properties.latency || 20]}
          max={500}
          min={1}
          step={1}
          onValueChange={(value) => handlePropertyChange('latency', value[0])}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="linkPacketLoss">Packet Loss (%)</Label>
          <span className="text-sm">{link.properties.packetLoss || 0}%</span>
        </div>
        <Slider
          id="linkPacketLoss"
          defaultValue={[link.properties.packetLoss || 0]}
          max={10}
          min={0}
          step={0.1}
          onValueChange={(value) => handlePropertyChange('packetLoss', value[0])}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="linkJitter">Jitter (ms)</Label>
          <span className="text-sm">{link.properties.jitter || 0} ms</span>
        </div>
        <Slider
          id="linkJitter"
          defaultValue={[link.properties.jitter || 0]}
          max={50}
          min={0}
          step={1}
          onValueChange={(value) => handlePropertyChange('jitter', value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkCost">Cost Metric</Label>
        <Input 
          id="linkCost" 
          type="number" 
          value={link.properties.cost || '10'}
          onChange={(e) => handlePropertyChange('cost', Number(e.target.value))} 
        />
      </div>
      
      <div className="pt-4">
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => removeLink(link.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Link
        </Button>
      </div>
    </div>
  );
};
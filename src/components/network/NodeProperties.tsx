import React from 'react';
import { NodeType } from '../../types/network';
import { useNetworkStore } from '../../stores/networkStore';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Trash2 } from 'lucide-react';

interface NodePropertiesProps {
  node: NodeType;
}

export const NodeProperties: React.FC<NodePropertiesProps> = ({ node }) => {
  const { updateNode, removeNode } = useNetworkStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNode(node.id, { ...node, name: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    updateNode(node.id, { ...node, type: value as 'site' | 'router' | 'cloud' });
  };

  const handlePropertyChange = (key: string, value: string) => {
    const updatedProperties = { ...node.properties, [key]: value };
    updateNode(node.id, { ...node, properties: updatedProperties });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Node Properties</h3>
      
      <div className="space-y-2">
        <Label htmlFor="nodeName">Name</Label>
        <Input 
          id="nodeName" 
          value={node.name} 
          onChange={handleNameChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nodeType">Type</Label>
        <Select value={node.type} onValueChange={handleTypeChange}>
          <SelectTrigger id="nodeType">
            <SelectValue placeholder="Select node type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="site">Site</SelectItem>
            <SelectItem value="router">Router</SelectItem>
            <SelectItem value="cloud">Cloud</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {node.type === 'site' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="siteCapacity">Bandwidth Capacity (Mbps)</Label>
            <Input 
              id="siteCapacity" 
              type="number" 
              value={node.properties.bandwidth || '100'}
              onChange={(e) => handlePropertyChange('bandwidth', e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteLocation">Location</Label>
            <Input 
              id="siteLocation" 
              value={node.properties.location || ''}
              onChange={(e) => handlePropertyChange('location', e.target.value)} 
              placeholder="e.g., New York, USA"
            />
          </div>
        </>
      )}
      
      {node.type === 'router' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="routerModel">Router Model</Label>
            <Input 
              id="routerModel" 
              value={node.properties.model || ''}
              onChange={(e) => handlePropertyChange('model', e.target.value)} 
              placeholder="e.g., Cisco vEdge"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routerCapacity">Processing Capacity (pps)</Label>
            <Input 
              id="routerCapacity" 
              type="number" 
              value={node.properties.capacity || '10000'}
              onChange={(e) => handlePropertyChange('capacity', e.target.value)} 
            />
          </div>
        </>
      )}
      
      {node.type === 'cloud' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cloudProvider">Cloud Provider</Label>
            <Select 
              value={node.properties.provider || 'aws'} 
              onValueChange={(value) => handlePropertyChange('provider', value)}
            >
              <SelectTrigger id="cloudProvider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">Google Cloud</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cloudRegion">Region</Label>
            <Input 
              id="cloudRegion" 
              value={node.properties.region || ''}
              onChange={(e) => handlePropertyChange('region', e.target.value)} 
              placeholder="e.g., us-east-1"
            />
          </div>
        </>
      )}
      
      <div className="pt-4">
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => removeNode(node.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Node
        </Button>
      </div>
    </div>
  );
};
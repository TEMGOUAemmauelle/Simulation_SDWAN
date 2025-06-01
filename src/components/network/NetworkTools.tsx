import React from 'react';
import { Server, Router, Cloud, Link, Plus } from 'lucide-react';
import { useNetworkStore } from '../../stores/networkStore';
import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';
import { NodeProperties } from './NodeProperties';
import { LinkProperties } from './LinkProperties';

export const NetworkTools: React.FC = () => {
  const { nodes, links, selectedNodeId, selectedLinkId, addNode, selectNode, selectLink } = useNetworkStore();

  const handleAddNode = (type: 'site' | 'router' | 'cloud') => {
    const center = { x: 300, y: 300 };
    addNode({
      id: `node-${Date.now()}`,
      type,
      x: center.x + (Math.random() * 100 - 50),
      y: center.y + (Math.random() * 100 - 50),
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      properties: {}
    });
  };

  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  const selectedLink = links.find(link => link.id === selectedLinkId);

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium mb-4">Network Tools</h3>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button variant="outline" onClick={() => handleAddNode('site')} className="flex flex-col items-center py-4">
          <Server className="h-6 w-6 mb-1" />
          <span className="text-xs">Site</span>
        </Button>
        <Button variant="outline" onClick={() => handleAddNode('router')} className="flex flex-col items-center py-4">
          <Router className="h-6 w-6 mb-1" />
          <span className="text-xs">Router</span>
        </Button>
        <Button variant="outline" onClick={() => handleAddNode('cloud')} className="flex flex-col items-center py-4">
          <Cloud className="h-6 w-6 mb-1" />
          <span className="text-xs">Cloud</span>
        </Button>
      </div>

      <div className="mb-4">
        <Button variant="outline" className="w-full justify-start">
          <Link className="h-4 w-4 mr-2" />
          <span>Create Link</span>
          <span className="ml-auto text-xs text-gray-500">(Select two nodes)</span>
        </Button>
      </div>

      <Separator className="my-4" />
      
      <div className="flex-1 overflow-auto">
        {selectedNode && (
          <NodeProperties node={selectedNode} />
        )}
        
        {selectedLink && (
          <LinkProperties link={selectedLink} />
        )}
        
        {!selectedNode && !selectedLink && (
          <div className="text-center py-8 text-gray-500">
            <p>Select a node or link to edit properties</p>
            <p className="text-sm mt-2">Or double-click on canvas to add a new node</p>
          </div>
        )}
      </div>
    </div>
  );
};
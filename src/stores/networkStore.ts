import { create } from 'zustand';
import { NodeType, LinkType } from '../types/network';

interface NetworkState {
  nodes: NodeType[];
  links: LinkType[];
  selectedNodeId: string | null;
  selectedLinkId: string | null;
  
  // Node actions
  addNode: (node: NodeType) => void;
  updateNode: (id: string, updatedNode: NodeType) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  selectNode: (id: string | null) => void;
  
  // Link actions
  addLink: (link: LinkType) => void;
  updateLink: (id: string, updatedLink: LinkType) => void;
  removeLink: (id: string) => void;
  selectLink: (id: string | null) => void;
}

// Initial network with some example nodes and links
const initialNodes: NodeType[] = [
  { id: 'site-1', type: 'site', name: 'HQ', x: 300, y: 200, properties: { bandwidth: 1000, location: 'New York' } },
  { id: 'site-2', type: 'site', name: 'Branch 1', x: 500, y: 300, properties: { bandwidth: 500, location: 'Los Angeles' } },
  { id: 'site-3', type: 'site', name: 'Branch 2', x: 400, y: 400, properties: { bandwidth: 500, location: 'Chicago' } },
  { id: 'router-1', type: 'router', name: 'Edge Router 1', x: 200, y: 300, properties: { model: 'vEdge 2000', capacity: 5000 } },
  { id: 'cloud-1', type: 'cloud', name: 'Cloud Services', x: 600, y: 200, properties: { provider: 'aws', region: 'us-east-1' } },
];

const initialLinks: LinkType[] = [
  { 
    id: 'link-1', 
    source: initialNodes[0], 
    target: initialNodes[3], 
    type: 'overlay', 
    properties: { bandwidth: 1000, latency: 10, packetLoss: 0.1, jitter: 2, cost: 10 } 
  },
  { 
    id: 'link-2', 
    source: initialNodes[1], 
    target: initialNodes[3], 
    type: 'overlay', 
    properties: { bandwidth: 500, latency: 20, packetLoss: 0.2, jitter: 5, cost: 20 } 
  },
  { 
    id: 'link-3', 
    source: initialNodes[2], 
    target: initialNodes[3], 
    type: 'overlay', 
    properties: { bandwidth: 500, latency: 15, packetLoss: 0.3, jitter: 3, cost: 15 } 
  },
  { 
    id: 'link-4', 
    source: initialNodes[3], 
    target: initialNodes[4], 
    type: 'overlay', 
    properties: { bandwidth: 1000, latency: 5, packetLoss: 0.1, jitter: 1, cost: 5 } 
  },
  { 
    id: 'link-5', 
    source: initialNodes[0], 
    target: initialNodes[1], 
    type: 'underlay', 
    properties: { bandwidth: 500, latency: 30, packetLoss: 0.5, jitter: 10, cost: 30 } 
  },
];

export const useNetworkStore = create<NetworkState>((set) => ({
  nodes: initialNodes,
  links: initialLinks,
  selectedNodeId: null,
  selectedLinkId: null,
  
  // Node actions
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  updateNode: (id, updatedNode) => set((state) => ({
    nodes: state.nodes.map(node => node.id === id ? updatedNode : node),
    // Also update any links that use this node as source or target
    links: state.links.map(link => {
      if ((link.source as NodeType).id === id) {
        return { ...link, source: updatedNode };
      }
      if ((link.target as NodeType).id === id) {
        return { ...link, target: updatedNode };
      }
      return link;
    })
  })),
  
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    // Also remove any links connected to this node
    links: state.links.filter(link => 
      (link.source as NodeType).id !== id && (link.target as NodeType).id !== id
    ),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
  })),
  
  updateNodePosition: (id, x, y) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, x, y } : node
    )
  })),
  
  selectNode: (id) => set(() => ({
    selectedNodeId: id,
    selectedLinkId: null // Deselect any selected link
  })),
  
  // Link actions
  addLink: (link) => set((state) => ({
    links: [...state.links, link]
  })),
  
  updateLink: (id, updatedLink) => set((state) => ({
    links: state.links.map(link => link.id === id ? updatedLink : link)
  })),
  
  removeLink: (id) => set((state) => ({
    links: state.links.filter(link => link.id !== id),
    selectedLinkId: state.selectedLinkId === id ? null : state.selectedLinkId
  })),
  
  selectLink: (id) => set(() => ({
    selectedLinkId: id,
    selectedNodeId: null // Deselect any selected node
  }))
}));
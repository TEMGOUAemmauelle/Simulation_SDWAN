export interface NodeType {
  id: string;
  type: 'site' | 'router' | 'cloud';
  name: string;
  x: number;
  y: number;
  fx?: number | null; // For D3 force simulation
  fy?: number | null; // For D3 force simulation
  properties: Record<string, any>;
}

export interface LinkType {
  id: string;
  source: NodeType;
  target: NodeType;
  type: 'overlay' | 'underlay' | 'mpls' | 'internet' | 'lte';
  properties: {
    bandwidth?: number;
    latency?: number;
    packetLoss?: number;
    jitter?: number;
    cost?: number;
    [key: string]: any;
  };
}

export interface PacketType {
  id: string;
  linkId: string;
  trafficType: 'voice' | 'video' | 'data' | 'backup';
  size: number;
  progress: number; // 0 to 1, representing position along the link
  properties?: Record<string, any>;
}

export interface ScenarioType {
  id: string;
  name: string;
  description: string;
  setupFn: () => void;
}

export interface PolicyType {
  id: string;
  name: string;
  criteria: {
    trafficType?: 'voice' | 'video' | 'data' | 'backup';
    minBandwidth?: number;
    maxLatency?: number;
    maxPacketLoss?: number;
    priority?: number;
    [key: string]: any;
  };
  action: {
    preferredLinkTypes?: Array<'mpls' | 'internet' | 'lte'>;
    fallbackLinkTypes?: Array<'mpls' | 'internet' | 'lte'>;
    [key: string]: any;
  };
}
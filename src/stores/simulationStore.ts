import { create } from 'zustand';
import { NodeType, LinkType, PacketType } from '../types/network';
import { useNetworkStore } from './networkStore';

interface SimulationState {
  isRunning: boolean;
  speed: number;
  packets: PacketType[];
  trafficPattern: 'uniform' | 'hub-spoke' | 'custom';
  packetSize: number;
  packetRate: number;
  routingAlgorithm: 'shortest-path' | 'least-cost' | 'load-balance' | 'application-aware';
  fecEnabled: boolean;
  
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepForward: () => void;
  setSpeed: (speed: number) => void;
  loadScenario: (scenarioId: string) => void;
  
  // Traffic settings
  setTrafficPattern: (pattern: 'uniform' | 'hub-spoke' | 'custom') => void;
  setPacketSize: (size: number) => void;
  setPacketRate: (rate: number) => void;
  setRoutingAlgorithm: (algorithm: 'shortest-path' | 'least-cost' | 'load-balance' | 'application-aware') => void;
  setFecEnabled: (enabled: boolean) => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  isRunning: false,
  speed: 1,
  packets: [],
  trafficPattern: 'uniform',
  packetSize: 512,
  packetRate: 50,
  routingAlgorithm: 'shortest-path',
  fecEnabled: false,
  
  // Simulation controls
  startSimulation: () => {
    set({ isRunning: true });
    
    // Example packet generation (would be more complex in a real app)
    const simulationInterval = setInterval(() => {
      const { links } = useNetworkStore.getState();
      const { packets, packetRate, speed } = get();
      
      // Generate new packets based on packet rate and speed
      const newPackets: PacketType[] = [];
      const packetCount = Math.floor(packetRate * speed / 10); // Adjust based on rate
      
      for (let i = 0; i < packetCount; i++) {
        if (links.length === 0) continue;
        
        const randomLinkIndex = Math.floor(Math.random() * links.length);
        const randomLink = links[randomLinkIndex];
        
        const trafficTypes = ['voice', 'video', 'data'];
        const randomTrafficType = trafficTypes[Math.floor(Math.random() * trafficTypes.length)] as 'voice' | 'video' | 'data';
        
        newPackets.push({
          id: `packet-${Date.now()}-${i}`,
          linkId: randomLink.id,
          trafficType: randomTrafficType,
          size: get().packetSize,
          progress: 0
        });
      }
      
      // Update progress of existing packets
      const updatedPackets = packets.map(packet => {
        const newProgress = packet.progress + 0.05 * speed; // Speed affects packet movement
        return newProgress >= 1
          ? null // Remove packets that have reached their destination
          : { ...packet, progress: newProgress };
      }).filter(Boolean) as PacketType[];
      
      set({ packets: [...updatedPackets, ...newPackets] });
    }, 100); // Update every 100ms
    
    // Store the interval ID for cleanup
    (window as any).simulationInterval = simulationInterval;
  },
  
  pauseSimulation: () => {
    set({ isRunning: false });
    
    // Clear the simulation interval
    clearInterval((window as any).simulationInterval);
  },
  
  stepForward: () => {
    const { links } = useNetworkStore.getState();
    const { packets } = get();
    
    // Generate a small batch of packets
    const newPackets: PacketType[] = [];
    const packetCount = 5; // Fixed number for a single step
    
    for (let i = 0; i < packetCount; i++) {
      if (links.length === 0) continue;
      
      const randomLinkIndex = Math.floor(Math.random() * links.length);
      const randomLink = links[randomLinkIndex];
      
      const trafficTypes = ['voice', 'video', 'data'];
      const randomTrafficType = trafficTypes[Math.floor(Math.random() * trafficTypes.length)] as 'voice' | 'video' | 'data';
      
      newPackets.push({
        id: `packet-${Date.now()}-${i}`,
        linkId: randomLink.id,
        trafficType: randomTrafficType,
        size: get().packetSize,
        progress: 0
      });
    }
    
    // Update progress of existing packets
    const updatedPackets = packets.map(packet => {
      const newProgress = packet.progress + 0.1; // Fixed step amount
      return newProgress >= 1
        ? null // Remove packets that have reached their destination
        : { ...packet, progress: newProgress };
    }).filter(Boolean) as PacketType[];
    
    set({ packets: [...updatedPackets, ...newPackets] });
  },
  
  setSpeed: (speed) => set({ speed }),
  
  loadScenario: (scenarioId) => {
    // Example implementation for loading predefined scenarios
    switch (scenarioId) {
      case 'link-failure':
        // Would update network store to simulate a link failure
        alert('Scenario "Link Failure" loaded. In a complete implementation, this would modify the network topology.');
        break;
        
      case 'congestion':
        // Would update link properties to simulate congestion
        alert('Scenario "Network Congestion" loaded. In a complete implementation, this would modify link properties.');
        break;
        
      case 'ddos':
        // Would generate a flood of packets
        alert('Scenario "DDoS Attack" loaded. In a complete implementation, this would generate attack traffic.');
        break;
        
      case 'policy-change':
        // Would update routing policies
        alert('Scenario "Policy Change" loaded. In a complete implementation, this would modify routing policies.');
        break;
        
      case 'high-availability':
        // Would test controller failover
        alert('Scenario "High Availability" loaded. In a complete implementation, this would simulate controller failures.');
        break;
        
      default:
        console.error(`Unknown scenario: ${scenarioId}`);
    }
  },
  
  // Traffic settings
  setTrafficPattern: (pattern) => set({ trafficPattern: pattern }),
  setPacketSize: (size) => set({ packetSize: size }),
  setPacketRate: (rate) => set({ packetRate: rate }),
  setRoutingAlgorithm: (algorithm) => set({ routingAlgorithm: algorithm }),
  setFecEnabled: (enabled) => set({ fecEnabled: enabled })
}));
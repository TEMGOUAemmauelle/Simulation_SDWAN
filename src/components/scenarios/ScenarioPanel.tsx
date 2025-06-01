import React from 'react';
import { useSimulationStore } from '../../stores/simulationStore';
import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';
import { AlertTriangle, Link2Off, RefreshCw, Waves, Cpu } from 'lucide-react';
import { ScenarioCard } from './ScenarioCard';

export const ScenarioPanel: React.FC = () => {
  const { loadScenario } = useSimulationStore();

  const scenarios = [
    {
      id: 'link-failure',
      title: 'Link Failure',
      description: 'Simulates a WAN link failure to test failover capabilities',
      icon: Link2Off,
      complexity: 'Basic'
    },
    {
      id: 'congestion',
      title: 'Network Congestion',
      description: 'Simulates high traffic congestion on primary links',
      icon: Waves,
      complexity: 'Moderate'
    },
    {
      id: 'ddos',
      title: 'DDoS Attack',
      description: 'Simulates a distributed denial of service attack scenario',
      icon: AlertTriangle,
      complexity: 'Advanced'
    },
    {
      id: 'policy-change',
      title: 'Policy Change',
      description: 'Changes routing policies to test dynamic adaptation',
      icon: RefreshCw,
      complexity: 'Moderate'
    },
    {
      id: 'high-availability',
      title: 'High Availability',
      description: 'Tests failover between redundant SD-WAN controllers',
      icon: Cpu,
      complexity: 'Advanced'
    }
  ];

  const handleScenarioLoad = (scenarioId: string) => {
    loadScenario(scenarioId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Predefined Scenarios</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a scenario to test SD-WAN resilience and adaptation capabilities
        </p>
      </div>
      
      <div className="grid gap-3">
        {scenarios.map(scenario => (
          <ScenarioCard 
            key={scenario.id}
            scenario={scenario}
            onLoad={() => handleScenarioLoad(scenario.id)}
          />
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div>
        <h4 className="text-md font-medium mb-2">Custom Scenario</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Create your own scenario with specific network conditions
        </p>
        
        <Button className="w-full">
          Create Custom Scenario
        </Button>
      </div>
    </div>
  );
};
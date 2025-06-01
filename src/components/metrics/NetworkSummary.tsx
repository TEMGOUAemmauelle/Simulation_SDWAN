import React from 'react';
import { useNetworkStore } from '../../stores/networkStore';
import { useSimulationStore } from '../../stores/simulationStore';
import { Check, X, AlertTriangle, Network, Activity } from 'lucide-react';

export const NetworkSummary: React.FC = () => {
  const { nodes, links } = useNetworkStore();
  const { isRunning, routingAlgorithm } = useSimulationStore();

  // Count node types
  const siteCount = nodes.filter(node => node.type === 'site').length;
  const routerCount = nodes.filter(node => node.type === 'router').length;
  const cloudCount = nodes.filter(node => node.type === 'cloud').length;

  // Count link types
  const overlayCount = links.filter(link => link.type === 'overlay').length;
  const underlayCount = links.filter(link => link.type === 'underlay').length;

  // Example summary values (in a real app, these would be calculated from the simulation)
  const healthStatus = "Healthy";
  const avgLatency = "35ms";
  const avgPacketLoss = "0.4%";
  const linkUtilization = "68%";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          <Network className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-medium">Network</h4>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Sites:</span>
            <span>{siteCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Routers:</span>
            <span>{routerCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Links:</span>
            <span>{links.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          {healthStatus === "Healthy" ? (
            <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
          ) : healthStatus === "Warning" ? (
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
          ) : (
            <X className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
          )}
          <h4 className="text-sm font-medium">Health</h4>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className={`font-medium ${
              healthStatus === "Healthy" ? "text-green-600 dark:text-green-400" :
              healthStatus === "Warning" ? "text-yellow-600 dark:text-yellow-400" :
              "text-red-600 dark:text-red-400"
            }`}>{healthStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Simulation:</span>
            <span>{isRunning ? "Running" : "Stopped"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Algorithm:</span>
            <span>{routingAlgorithm}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          <Activity className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-medium">Performance</h4>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Avg. Latency:</span>
            <span>{avgLatency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Packet Loss:</span>
            <span>{avgPacketLoss}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Utilization:</span>
            <span>{linkUtilization}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          <Network className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-medium">Connectivity</h4>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Overlay:</span>
            <span>{overlayCount} links</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Underlay:</span>
            <span>{underlayCount} links</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Cloud:</span>
            <span>{cloudCount} nodes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
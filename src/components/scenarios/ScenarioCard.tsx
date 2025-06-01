import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface ScenarioType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  complexity: 'Basic' | 'Moderate' | 'Advanced';
}

interface ScenarioCardProps {
  scenario: ScenarioType;
  onLoad: () => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onLoad }) => {
  const complexityColor = {
    'Basic': 'text-green-600 dark:text-green-400',
    'Moderate': 'text-yellow-600 dark:text-yellow-400',
    'Advanced': 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-start">
      <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 flex-shrink-0 mr-4">
        <scenario.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{scenario.title}</h4>
          <span className={`text-xs ${complexityColor[scenario.complexity]}`}>
            {scenario.complexity}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">
          {scenario.description}
        </p>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full"
          onClick={onLoad}
        >
          Load Scenario
        </Button>
      </div>
    </div>
  );
};
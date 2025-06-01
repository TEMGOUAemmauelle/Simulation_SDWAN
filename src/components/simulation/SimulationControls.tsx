import React from 'react';
import { Play, Pause, SkipForward, ChevronRight, ChevronLeft } from 'lucide-react';
import { useSimulationStore } from '../../stores/simulationStore';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';

export const SimulationControls: React.FC = () => {
  const { 
    isRunning, 
    speed, 
    startSimulation, 
    pauseSimulation, 
    setSpeed, 
    stepForward 
  } = useSimulationStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center space-x-4">
      <div className="flex space-x-2">
        {isRunning ? (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={pauseSimulation}
          >
            <Pause className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={startSimulation}
          >
            <Play className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={stepForward}
          disabled={isRunning}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <ChevronLeft className="h-4 w-4 text-gray-500" />
        <Slider
          value={[speed]}
          min={1}
          max={10}
          step={1}
          className="w-32"
          onValueChange={(value) => setSpeed(value[0])}
        />
        <ChevronRight className="h-4 w-4 text-gray-500" />
        <span className="text-xs text-gray-500 min-w-12">
          {speed}x speed
        </span>
      </div>
    </div>
  );
};
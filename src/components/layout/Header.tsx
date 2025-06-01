import React from 'react';
import { Network as NetworkNodes, Settings, Moon, Sun, Save, Upload } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 flex items-center px-4 py-2 shadow-sm">
      <div className="flex items-center space-x-2">
        <NetworkNodes className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold">SD-WAN Simulator</h1>
      </div>
      
      <div className="ml-auto flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
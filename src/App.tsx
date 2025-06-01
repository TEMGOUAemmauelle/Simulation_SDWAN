import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NetworkCanvas } from './components/network/NetworkCanvas';
import { SimulationControls } from './components/simulation/SimulationControls';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden relative">
              <NetworkCanvas />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <SimulationControls />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
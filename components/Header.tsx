
import React from 'react';
import { WifiIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center border-b border-slate-700 pb-4">
      <div className="flex items-center gap-3">
        <div className="bg-sky-500/10 p-2 rounded-lg">
          <WifiIcon className="h-6 w-6 text-sky-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">IoT Environment Monitor</h1>
          <p className="text-sm text-slate-400">Real-time sensor dashboard</p>
        </div>
      </div>
    </header>
  );
};

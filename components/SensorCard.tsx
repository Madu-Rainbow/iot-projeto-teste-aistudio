
import React from 'react';

interface SensorCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  statusColor: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ icon, label, value, unit, statusColor }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-slate-500 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-300">{label}</h2>
        <div className="text-slate-400">{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-6xl font-black text-slate-50 tracking-tighter">
          {value}
        </p>
        <span className="text-3xl font-bold text-slate-400 pb-1">{unit}</span>
      </div>
      <div className={`w-full h-1.5 ${statusColor} rounded-full mt-6`}></div>
    </div>
  );
};

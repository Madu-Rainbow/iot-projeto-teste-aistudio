
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SensorCard } from './components/SensorCard';
import { TemperatureIcon, HumidityIcon, LoaderIcon, LuminosityIcon } from './components/Icons';
import type { SensorData } from './types';
import { iotService } from './services/iotService';

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Don't show loader on subsequent fetches for a smoother experience
        // setIsLoading(true); 
        const data = await iotService.fetchSensorData();
        setSensorData(data);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError('Failed to fetch sensor data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const getStatusColor = () => {
    if (error) return 'bg-red-500';
    if (isLoading) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (isLoading) return 'Connecting...';
    return 'Live';
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getStatusColor()} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${getStatusColor()}`}></span>
              </span>
              <span className="text-lg font-medium text-slate-300">{getStatusText()}</span>
            </div>
            {lastUpdated && !error && (
               <p className="text-sm text-slate-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <LoaderIcon className="animate-spin h-12 w-12 mb-4" />
              <p className="text-xl">Initializing sensor connection...</p>
            </div>
          ) : error ? (
             <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SensorCard 
                icon={<TemperatureIcon />}
                label="Temperature"
                value={sensorData?.temperature.toFixed(1) ?? 'N/A'}
                unit="°C"
                statusColor="bg-orange-500"
              />
              <SensorCard 
                icon={<HumidityIcon />}
                label="Humidity"
                value={sensorData?.humidity.toFixed(1) ?? 'N/A'}
                unit="%"
                statusColor="bg-sky-500"
              />
              <SensorCard 
                icon={<LuminosityIcon />}
                label="Luminosity"
                value={sensorData?.luminosity.toFixed(0) ?? 'N/A'}
                unit="lx"
                statusColor="bg-yellow-500"
              />
            </div>
          )}
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Designed for real-time environmental monitoring.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

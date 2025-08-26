
import type { SensorData } from '../types';

// This is a mock service that simulates an API call to a backend.
// In a real application, this would be an actual HTTP fetch request.
class IotService {
  private lastTemperature: number = 22.5;
  private lastHumidity: number = 45.0;
  private lastLuminosity: number = 750;

  public fetchSensorData(): Promise<SensorData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate slight fluctuations in sensor readings
        const tempFluctuation = (Math.random() - 0.5) * 0.5; // +/- 0.25
        const humidityFluctuation = (Math.random() - 0.5) * 2; // +/- 1.0
        const luminosityFluctuation = (Math.random() - 0.5) * 50; // +/- 25

        this.lastTemperature += tempFluctuation;
        this.lastHumidity += humidityFluctuation;
        this.lastLuminosity += luminosityFluctuation;

        // Clamp values to realistic ranges
        this.lastTemperature = Math.max(18, Math.min(30, this.lastTemperature));
        this.lastHumidity = Math.max(30, Math.min(70, this.lastHumidity));
        this.lastLuminosity = Math.max(100, Math.min(1200, this.lastLuminosity));

        const data: SensorData = {
          temperature: this.lastTemperature,
          humidity: this.lastHumidity,
          luminosity: this.lastLuminosity,
        };
        resolve(data);
      }, 300 + Math.random() * 200); // Simulate network latency
    });
  }
}

export const iotService = new IotService();

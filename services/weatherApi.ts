interface WeatherData {
  current: {
    condition: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    rainChance: number;
  };
  hourly: Array<{
    time: string;
    condition: string;
    temp: number;
    rain: number;
  }>;
  demandImpact: {
    text: string;
    color: string;
  };
}

class WeatherApiService {
  async getWeatherData(city: string = 'Birmingham'): Promise<WeatherData> {
    try {
      return this.getMockWeatherData();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData();
    }
  }

  private getMockWeatherData(): WeatherData {
    const current = {
      condition: 'Light Rain',
      temperature: 12,
      humidity: 78,
      windSpeed: 15,
      rainChance: 85,
    };

    const hourly = [
      { time: '14:00', condition: 'rain', temp: 12, rain: 85 },
      { time: '15:00', condition: 'rain', temp: 11, rain: 90 },
      { time: '16:00', condition: 'cloud', temp: 11, rain: 60 },
      { time: '17:00', condition: 'cloud', temp: 10, rain: 40 },
      { time: '18:00', condition: 'sun', temp: 10, rain: 20 },
    ];

    const demandImpact = this.calculateDemandImpact(current.rainChance);

    return {
      current,
      hourly,
      demandImpact,
    };
  }

  private calculateDemandImpact(rainChance: number) {
    if (rainChance >= 80) return { text: 'High demand expected', color: '#10B981' };
    if (rainChance >= 60) return { text: 'Moderate demand increase', color: '#F59E0B' };
    return { text: 'Normal demand', color: '#6B7280' };
  }
}

export const weatherApi = new WeatherApiService();
export type { WeatherData };
interface FlightData {
  number: string;
  airline: string;
  aircraft: string;
  origin: string;
  scheduledTime: string;
  actualTime?: string;
  terminal: string;
  status: string;
  passengers?: number;
}

interface TrainData {
  service: string;
  operator: string;
  origin: string;
  scheduledTime: string;
  actualTime?: string;
  platform: string;
  status: string;
  coaches?: number;
}

interface CoachData {
  service: string;
  operator: string;
  origin: string;
  scheduledTime: string;
  actualTime?: string;
  bay: string;
  status: string;
  capacity?: number;
}

interface HourlyData {
  hour: string;
  count: number;
  totalPassengers: number;
  items: (FlightData | TrainData | CoachData)[];
}

class TransportApiService {
  private flightApiKey = '8301f8c387msh12139157bfaee9bp116ab6jsn0633ba721fa9';
  private transportAppId = '5e5633f2';
  private transportAppKey = '6343d100ba8457e103909d2a8b586631';

  async getFlightData(airport: string = 'BHX'): Promise<HourlyData[]> {
    try {
      const today = new Date();
      const startTime = today.toISOString().split('T')[0] + 'T10:00';
      const endTime = today.toISOString().split('T')[0] + 'T22:00';

      const headers = {
        'X-RapidAPI-Key': this.flightApiKey,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      };

      const url = `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${airport}/${startTime}/${endTime}?withLeg=true&direction=Both&withCancelled=true&withCodeshared=true&withCargo=true&withPrivate=true&withLocation=false`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.warn(`Flight API error: ${response.status}`);
        return this.getMockFlightData();
      }

      const data = await response.json();
      const arrivals =
        data.arrivals.filter(
          (flight: any) => flight.codeshareStatus === 'IsOperator'
        ) || [];

      const allFlights = [...arrivals];

      return this.groupFlightsByHour(allFlights);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      return this.getMockFlightData();
    }
  }

  async getTrainData(station: string = 'BHM'): Promise<HourlyData[]> {
    try {
      const url = `https://transportapi.com/v3/uk/train/station/${station}/live.json?app_id=${this.transportAppId}&app_key=${this.transportAppKey}&calling_at=&train_status=passenger`;

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Train API error: ${response.status}`);
        return this.getMockTrainData();
      }

      const data = await response.json();
      return this.groupTrainsByHour(data.departures?.all || []);
    } catch (error) {
      console.error('Error fetching train data:', error);
      return this.getMockTrainData();
    }
  }

  async getCoachData(station: string = 'BHMCOST'): Promise<HourlyData[]> {
    try {
      const url = `https://transportapi.com/v3/uk/bus/stop/${station}/live.json?app_id=${this.transportAppId}&app_key=${this.transportAppKey}&group=route&limit=50`;

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Coach API error: ${response.status}`);
        return this.getMockCoachData();
      }

      const data = await response.json();
      return this.groupCoachesByHour(data.departures || {});
    } catch (error) {
      console.error('Error fetching coach data:', error);
      return this.getMockCoachData();
    }
  }

  private groupFlightsByHour(flights: any[]): HourlyData[] {
    const hourlyGroups: { [key: string]: FlightData[] } = {};

    flights.forEach((flight) => {
      const timeData = flight.arrival || flight.departure;
      if (!timeData?.scheduledTime?.local) return;

      const hour = new Date(timeData.scheduledTime.local).getHours();
      const hourKey = `${hour.toString().padStart(2, '0')}:00`;

      if (!hourlyGroups[hourKey]) {
        hourlyGroups[hourKey] = [];
      }

      const passengers = this.estimatePassengers(flight.aircraft?.model || '');

      hourlyGroups[hourKey].push({
        number: flight.number || 'N/A',
        airline: flight.airline?.name || 'Unknown',
        aircraft: flight.aircraft?.model || 'Unknown',
        origin:
          flight.departure?.airport?.name ||
          flight.arrival?.airport?.name ||
          'Unknown',
        scheduledTime: timeData.scheduledTime.local,
        actualTime: timeData.actualTime?.local,
        terminal: timeData.terminal || 'N/A',
        status: flight.status || 'Unknown',
        passengers,
      });
    });

    return Object.entries(hourlyGroups)
      .map(([hour, items]) => ({
        hour,
        count: items.length,
        totalPassengers: items.reduce(
          (sum, item) => sum + (item.passengers || 0),
          0
        ),
        items,
      }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
  }

  private groupTrainsByHour(trains: any[]): HourlyData[] {
    const hourlyGroups: { [key: string]: TrainData[] } = {};

    trains.forEach((train) => {
      if (!train.aimed_departure_time) return;

      const hour = new Date(
        `2024-01-01T${train.aimed_departure_time}`
      ).getHours();
      const hourKey = `${hour.toString().padStart(2, '0')}:00`;

      if (!hourlyGroups[hourKey]) {
        hourlyGroups[hourKey] = [];
      }

      hourlyGroups[hourKey].push({
        service: train.train_uid || train.service_timetable?.id || 'N/A',
        operator: train.operator_name || 'Unknown',
        origin: train.origin_name || 'Unknown',
        scheduledTime: train.aimed_departure_time,
        actualTime: train.expected_departure_time,
        platform: train.platform || 'TBC',
        status: train.status || 'On Time',
        coaches: Math.floor(Math.random() * 8) + 4,
      });
    });

    return Object.entries(hourlyGroups)
      .map(([hour, items]) => ({
        hour,
        count: items.length,
        totalPassengers: items.reduce(
          (sum, item) => sum + (item.coaches || 0) * 70,
          0
        ),
        items,
      }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
  }

  private groupCoachesByHour(coaches: any): HourlyData[] {
    const hourlyGroups: { [key: string]: CoachData[] } = {};

    Object.values(coaches).forEach((routeData: any) => {
      if (!routeData.departures) return;

      routeData.departures.forEach((coach: any) => {
        if (!coach.aimed_departure_time) return;

        const hour = new Date(
          `2024-01-01T${coach.aimed_departure_time}`
        ).getHours();
        const hourKey = `${hour.toString().padStart(2, '0')}:00`;

        if (!hourlyGroups[hourKey]) {
          hourlyGroups[hourKey] = [];
        }

        hourlyGroups[hourKey].push({
          service: coach.line_name || 'N/A',
          operator: coach.operator_name || 'Unknown',
          origin: coach.direction || 'Unknown',
          scheduledTime: coach.aimed_departure_time,
          actualTime: coach.expected_departure_time,
          bay: coach.stand || 'TBC',
          status: coach.status || 'On Time',
          capacity: Math.floor(Math.random() * 30) + 25,
        });
      });
    });

    return Object.entries(hourlyGroups)
      .map(([hour, items]) => ({
        hour,
        count: items.length,
        totalPassengers: items.reduce(
          (sum, item) => sum + (item.capacity || 0),
          0
        ),
        items,
      }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
  }

  private estimatePassengers(aircraftModel: string): number {
    const aircraftCapacity: { [key: string]: number } = {
      A380: 550,
      A350: 350,
      A330: 300,
      A320: 180,
      A319: 150,
      A318: 130,
      B777: 350,
      B787: 290,
      B767: 250,
      B757: 200,
      B737: 160,
      B747: 400,
      E190: 100,
      E175: 80,
    };

    for (const [model, capacity] of Object.entries(aircraftCapacity)) {
      if (aircraftModel.includes(model)) {
        return Math.floor(capacity * (0.7 + Math.random() * 0.3));
      }
    }

    return Math.floor(Math.random() * 200) + 100;
  }

  private getMockFlightData(): HourlyData[] {
    return [
      {
        hour: '14:00',
        count: 3,
        totalPassengers: 662,
        items: [
          {
            number: 'BA123',
            airline: 'British Airways',
            aircraft: 'Boeing 777',
            origin: 'New York JFK',
            scheduledTime: '14:30',
            terminal: 'T5',
            status: 'On Time',
            passengers: 298,
          },
          {
            number: 'EK005',
            airline: 'Emirates',
            aircraft: 'Airbus A380',
            origin: 'Dubai',
            scheduledTime: '14:45',
            terminal: 'T3',
            status: 'Delayed 15m',
            passengers: 364,
          },
        ],
      },
      {
        hour: '15:00',
        count: 2,
        totalPassengers: 186,
        items: [
          {
            number: 'LH901',
            airline: 'Lufthansa',
            aircraft: 'Airbus A320',
            origin: 'Frankfurt',
            scheduledTime: '15:00',
            terminal: 'T2',
            status: 'On Time',
            passengers: 186,
          },
        ],
      },
    ];
  }

  private getMockTrainData(): HourlyData[] {
    return [
      {
        hour: '14:00',
        count: 2,
        totalPassengers: 630,
        items: [
          {
            service: '1A45',
            operator: 'LNER',
            origin: 'Edinburgh',
            scheduledTime: '14:25',
            platform: '8',
            status: 'On Time',
            coaches: 9,
          },
        ],
      },
    ];
  }

  private getMockCoachData(): HourlyData[] {
    return [
      {
        hour: '14:00',
        count: 1,
        totalPassengers: 53,
        items: [
          {
            service: 'NX101',
            operator: 'National Express',
            origin: 'Birmingham',
            scheduledTime: '14:40',
            bay: 'A2',
            status: 'On Time',
            capacity: 53,
          },
        ],
      },
    ];
  }
}

export const transportApi = new TransportApiService();
export type { HourlyData, FlightData, TrainData, CoachData };

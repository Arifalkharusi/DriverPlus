import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Plane, Brain as Train, Bus, Clock, Users, CircleAlert as AlertCircle } from 'lucide-react-native';

interface TransportCardProps {
  type: 'flight' | 'train' | 'coach';
  data: any;
}

export function TransportCard({ type, data }: TransportCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'flight':
        return <Plane color="#2563EB" size={24} />;
      case 'train':
        return <Train color="#10B981" size={24} />;
      case 'coach':
        return <Bus color="#F59E0B" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Delayed')) return '#EF4444';
    if (status === 'On Time') return '#10B981';
    return '#6b7280';
  };

  const renderFlightCard = () => (
    <View style={styles.card}>
      <View style={styles.header}>
        {getIcon()}
        <View style={styles.headerInfo}>
          <Text style={styles.serviceNumber}>{data.flight}</Text>
          <Text style={styles.operator}>{data.airline}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: getStatusColor(data.status) }]}>
            {data.status}
          </Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.from}>From {data.from}</Text>
        <View style={styles.arrivalInfo}>
          <Clock color="#6b7280" size={16} />
          <Text style={styles.arrivalTime}>{data.arrivalTime}</Text>
          <Text style={styles.terminal}>Terminal {data.terminal}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Users color="#6b7280" size={16} />
          <Text style={styles.detailText}>{data.passengers} passengers</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.aircraft}>{data.aircraft}</Text>
        </View>
      </View>

      {data.passengers > 250 && (
        <View style={styles.opportunityBadge}>
          <AlertCircle color="#F59E0B" size={16} />
          <Text style={styles.opportunityText}>High volume arrival - Great opportunity!</Text>
        </View>
      )}
    </View>
  );

  const renderTrainCard = () => (
    <View style={styles.card}>
      <View style={styles.header}>
        {getIcon()}
        <View style={styles.headerInfo}>
          <Text style={styles.serviceNumber}>{data.service}</Text>
          <Text style={styles.operator}>{data.operator}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: getStatusColor(data.status) }]}>
            {data.status}
          </Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.from}>From {data.from}</Text>
        <View style={styles.arrivalInfo}>
          <Clock color="#6b7280" size={16} />
          <Text style={styles.arrivalTime}>{data.arrivalTime}</Text>
          <Text style={styles.terminal}>Platform {data.platform}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailText}>{data.coaches} coaches</Text>
        </View>
      </View>
    </View>
  );

  const renderCoachCard = () => (
    <View style={styles.card}>
      <View style={styles.header}>
        {getIcon()}
        <View style={styles.headerInfo}>
          <Text style={styles.serviceNumber}>{data.service}</Text>
          <Text style={styles.operator}>{data.operator}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: getStatusColor(data.status) }]}>
            {data.status}
          </Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.from}>From {data.from}</Text>
        <View style={styles.arrivalInfo}>
          <Clock color="#6b7280" size={16} />
          <Text style={styles.arrivalTime}>{data.arrivalTime}</Text>
          <Text style={styles.terminal}>Bay {data.bay}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Capacity: {data.capacity} passengers</Text>
        </View>
      </View>
    </View>
  );

  const renderCard = () => {
    switch (type) {
      case 'flight':
        return renderFlightCard();
      case 'train':
        return renderTrainCard();
      case 'coach':
        return renderCoachCard();
    }
  };

  return renderCard();
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  operator: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  routeInfo: {
    marginBottom: 12,
  },
  from: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  arrivalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrivalTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 6,
    marginRight: 12,
  },
  terminal: {
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  aircraft: {
    fontSize: 14,
    color: '#6b7280',
  },
  opportunityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  opportunityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 6,
  },
});
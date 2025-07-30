import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Car, Smartphone, Shield, Wrench, MapPin, Receipt, Camera } from 'lucide-react-native';

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  receipt: boolean;
}

interface ExpenseCardProps {
  expense: Expense;
}

const categoryIcons = {
  fuel: Car,
  maintenance: Wrench,
  insurance: Shield,
  phone: Smartphone,
  parking: MapPin,
  other: Receipt,
};

const categoryColors = {
  fuel: '#EF4444',
  maintenance: '#F59E0B',
  insurance: '#2563EB',
  phone: '#8B5CF6',
  parking: '#10B981',
  other: '#6b7280',
};

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const IconComponent = categoryIcons[expense.category as keyof typeof categoryIcons] || Receipt;
  const color = categoryColors[expense.category as keyof typeof categoryColors] || '#6b7280';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <IconComponent color={color} size={20} />
        </View>
        <View style={styles.details}>
          <Text style={styles.description}>{expense.description}</Text>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.amount}>£{expense.amount.toFixed(2)}</Text>
        {expense.receipt && (
          <View style={styles.receiptBadge}>
            <Camera color="#10B981" size={12} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 4,
  },
  receiptBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 10,
    padding: 4,
  },
});
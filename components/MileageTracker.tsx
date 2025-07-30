import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Car, MapPin, Calculator, Calendar } from 'lucide-react-native';

export function MileageTracker() {
  const [weekData, setWeekData] = useState({
    businessMiles: '',
    personalMiles: '',
    fuelCost: '',
    notes: '',
  });

  const calculateTotalMiles = () => {
    const business = parseFloat(weekData.businessMiles) || 0;
    const personal = parseFloat(weekData.personalMiles) || 0;
    return business + personal;
  };

  const calculateMileageRate = () => {
    const business = parseFloat(weekData.businessMiles) || 0;
    const fuel = parseFloat(weekData.fuelCost) || 0;
    if (business === 0) return 0;
    return fuel / business;
  };

  const handleSubmit = () => {
    if (!weekData.businessMiles || !weekData.fuelCost) {
      Alert.alert('Error', 'Please fill in business miles and fuel cost');
      return;
    }

    Alert.alert('Success', 'Weekly mileage saved successfully!');
    
    // Reset form
    setWeekData({
      businessMiles: '',
      personalMiles: '',
      fuelCost: '',
      notes: '',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Car color="#2563EB" size={24} />
        <Text style={styles.title}>Weekly Mileage Entry</Text>
      </View>

      <Text style={styles.subtitle}>
        Track your weekly mileage for accurate tax deductions
      </Text>

      <View style={styles.form}>
        <View style={styles.inputSection}>
          <Text style={styles.label}>Business Miles *</Text>
          <View style={styles.inputContainer}>
            <MapPin color="#6b7280" size={20} />
            <TextInput
              style={styles.input}
              value={weekData.businessMiles}
              onChangeText={(value) => setWeekData(prev => ({ ...prev, businessMiles: value }))}
              placeholder="0"
              keyboardType="decimal-pad"
            />
            <Text style={styles.unit}>miles</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Personal Miles</Text>
          <View style={styles.inputContainer}>
            <MapPin color="#6b7280" size={20} />
            <TextInput
              style={styles.input}
              value={weekData.personalMiles}
              onChangeText={(value) => setWeekData(prev => ({ ...prev, personalMiles: value }))}
              placeholder="0"
              keyboardType="decimal-pad"
            />
            <Text style={styles.unit}>miles</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Total Fuel Cost *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>£</Text>
            <TextInput
              style={styles.input}
              value={weekData.fuelCost}
              onChangeText={(value) => setWeekData(prev => ({ ...prev, fuelCost: value }))}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.textArea}
            value={weekData.notes}
            onChangeText={(value) => setWeekData(prev => ({ ...prev, notes: value }))}
            placeholder="Any additional notes about this week's driving"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Calculations */}
        <View style={styles.calculationsCard}>
          <View style={styles.calculationHeader}>
            <Calculator color="#2563EB" size={20} />
            <Text style={styles.calculationTitle}>Calculations</Text>
          </View>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Total Miles</Text>
            <Text style={styles.calculationValue}>{calculateTotalMiles().toFixed(1)} miles</Text>
          </View>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Cost per Business Mile</Text>
            <Text style={styles.calculationValue}>£{calculateMileageRate().toFixed(3)}</Text>
          </View>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Business Percentage</Text>
            <Text style={styles.calculationValue}>
              {calculateTotalMiles() > 0 ? ((parseFloat(weekData.businessMiles) || 0) / calculateTotalMiles() * 100).toFixed(1) : 0}%
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Weekly Mileage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  form: {
    flex: 1,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    marginLeft: 8,
    color: '#1f2937',
  },
  unit: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  textArea: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    textAlignVertical: 'top',
  },
  calculationsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  calculationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  calculationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calculationLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  calculationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Car, Smartphone, Shield, Wrench, MapPin, Receipt, Camera, Calendar } from 'lucide-react-native';

interface ExpenseFormProps {
  onClose: () => void;
}

export function ExpenseForm({ onClose }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('fuel');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    { key: 'fuel', label: 'Fuel', icon: Car, color: '#EF4444' },
    { key: 'maintenance', label: 'Maintenance', icon: Wrench, color: '#F59E0B' },
    { key: 'insurance', label: 'Insurance', icon: Shield, color: '#2563EB' },
    { key: 'phone', label: 'Phone', icon: Smartphone, color: '#8B5CF6' },
    { key: 'parking', label: 'Parking', icon: MapPin, color: '#10B981' },
    { key: 'other', label: 'Other', icon: Receipt, color: '#6b7280' },
  ];

  const handleSubmit = () => {
    if (!amount || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would normally save the expense
    Alert.alert('Success', 'Expense added successfully', [
      { text: 'OK', onPress: onClose }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Amount Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Amount *</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>£</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            maxLength={10}
          />
        </View>
      </View>

      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryButton,
                  category === cat.key && [styles.categoryButtonActive, { borderColor: cat.color }],
                ]}
                onPress={() => setCategory(cat.key)}
              >
                <IconComponent 
                  color={category === cat.key ? cat.color : '#6b7280'} 
                  size={24} 
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    category === cat.key && { color: cat.color },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Description Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter expense description"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Date Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <View style={styles.dateContainer}>
          <Calendar color="#6b7280" size={20} />
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
        </View>
      </View>

      {/* Receipt Photo */}
      <View style={styles.section}>
        <Text style={styles.label}>Receipt (Optional)</Text>
        <TouchableOpacity style={styles.photoButton}>
          <Camera color="#6b7280" size={24} />
          <Text style={styles.photoButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Expense</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 16,
    color: '#1f2937',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryButton: {
    width: '33.33%',
    aspectRatio: 1,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  categoryButtonActive: {
    borderWidth: 2,
    borderRadius: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  textInput: {
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    marginLeft: 12,
    color: '#1f2937',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    paddingVertical: 20,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});
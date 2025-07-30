import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTargets } from '@/hooks/useTargets';
import { TargetCard } from '@/components/TargetCard';
import { SetTargetModal } from '@/components/SetTargetModal';

export default function TargetsTab() {
  const { user } = useAuth();
  const { targets, loading, addTarget, updateTarget } = useTargets();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTarget = async (targetData: any) => {
    await addTarget(targetData);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading targets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Target size={28} color="#3B82F6" />
            <Text style={styles.title}>My Targets</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.statValue}>{targets.filter(t => t.progress >= 100).length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={20} color="#F59E0B" />
            <Text style={styles.statValue}>{targets.filter(t => t.progress < 100).length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>

        <View style={styles.targetsContainer}>
          {targets.length === 0 ? (
            <View style={styles.emptyState}>
              <Target size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No targets set</Text>
              <Text style={styles.emptyDescription}>
                Set your first target to start tracking your progress
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => setShowAddModal(true)}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.emptyButtonText}>Add Target</Text>
              </TouchableOpacity>
            </View>
          ) : (
            targets.map((target) => (
              <TargetCard
                key={target.id}
                target={target}
                onUpdate={updateTarget}
              />
            ))
          )}
        </View>
      </ScrollView>

      <SetTargetModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddTarget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  targetsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 40,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
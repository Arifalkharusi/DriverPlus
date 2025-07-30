import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { X, Smartphone, Shield, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react-native';

interface PlatformConnectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PlatformConnectionModal({ visible, onClose }: PlatformConnectionModalProps) {
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    uber: false,
    bolt: false,
  });

  const connectPlatform = (platform: 'uber' | 'bolt') => {
    // Simulate OAuth connection
    Alert.alert(
      'Connect to ' + (platform === 'uber' ? 'Uber' : 'Bolt'),
      'This will redirect you to ' + (platform === 'uber' ? 'Uber' : 'Bolt') + ' to authorize access to your earnings data.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => {
            // Simulate successful connection
            setTimeout(() => {
              setConnectedPlatforms(prev => ({ ...prev, [platform]: true }));
              Alert.alert('Success', `Connected to ${platform === 'uber' ? 'Uber' : 'Bolt'} successfully!`);
            }, 1500);
          }
        }
      ]
    );
  };

  const disconnectPlatform = (platform: 'uber' | 'bolt') => {
    Alert.alert(
      'Disconnect Platform',
      `Are you sure you want to disconnect from ${platform === 'uber' ? 'Uber' : 'Bolt'}? This will stop syncing your earnings data.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Disconnect', 
          style: 'destructive',
          onPress: () => {
            setConnectedPlatforms(prev => ({ ...prev, [platform]: false }));
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Platform Connections</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#6b7280" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.introSection}>
            <Smartphone color="#2563EB" size={32} />
            <Text style={styles.introTitle}>Connect Your Platforms</Text>
            <Text style={styles.introText}>
              Securely connect your Uber and Bolt accounts to automatically sync your earnings data
            </Text>
          </View>

          {/* Uber Connection */}
          <View style={styles.platformCard}>
            <View style={styles.platformHeader}>
              <View style={styles.platformInfo}>
                <Text style={styles.platformLogo}>🚗</Text>
                <View>
                  <Text style={styles.platformName}>Uber</Text>
                  <Text style={styles.platformDescription}>Connect to sync earnings automatically</Text>
                </View>
              </View>
              {connectedPlatforms.uber && (
                <CheckCircle color="#10B981" size={24} />
              )}
            </View>

            <View style={styles.platformFeatures}>
              <View style={styles.feature}>
                <TrendingUp color="#6b7280" size={16} />
                <Text style={styles.featureText}>Automatic earnings sync</Text>
              </View>
              <View style={styles.feature}>
                <Shield color="#6b7280" size={16} />
                <Text style={styles.featureText}>Secure OAuth 2.0 connection</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.connectButton,
                connectedPlatforms.uber ? styles.disconnectButton : styles.primaryButton
              ]}
              onPress={() => connectedPlatforms.uber ? disconnectPlatform('uber') : connectPlatform('uber')}
            >
              <Text style={[
                styles.connectButtonText,
                connectedPlatforms.uber ? styles.disconnectButtonText : styles.primaryButtonText
              ]}>
                {connectedPlatforms.uber ? 'Disconnect' : 'Connect Uber'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bolt Connection */}
          <View style={styles.platformCard}>
            <View style={styles.platformHeader}>
              <View style={styles.platformInfo}>
                <Text style={styles.platformLogo}>⚡</Text>
                <View>
                  <Text style={styles.platformName}>Bolt</Text>
                  <Text style={styles.platformDescription}>Connect to sync earnings automatically</Text>
                </View>
              </View>
              {connectedPlatforms.bolt && (
                <CheckCircle color="#10B981" size={24} />
              )}
            </View>

            <View style={styles.platformFeatures}>
              <View style={styles.feature}>
                <TrendingUp color="#6b7280" size={16} />
                <Text style={styles.featureText}>Automatic earnings sync</Text>
              </View>
              <View style={styles.feature}>
                <Shield color="#6b7280" size={16} />
                <Text style={styles.featureText}>Secure OAuth 2.0 connection</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.connectButton,
                connectedPlatforms.bolt ? styles.disconnectButton : styles.primaryButton
              ]}
              onPress={() => connectedPlatforms.bolt ? disconnectPlatform('bolt') : connectPlatform('bolt')}
            >
              <Text style={[
                styles.connectButtonText,
                connectedPlatforms.bolt ? styles.disconnectButtonText : styles.primaryButtonText
              ]}>
                {connectedPlatforms.bolt ? 'Disconnect' : 'Connect Bolt'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.securityNote}>
            <Shield color="#6b7280" size={20} />
            <Text style={styles.securityText}>
              Your login credentials are never stored. We use secure OAuth 2.0 to access only your earnings data.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  platformCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformLogo: {
    fontSize: 32,
    marginRight: 12,
  },
  platformName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  platformDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  platformFeatures: {
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  connectButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  disconnectButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  disconnectButtonText: {
    color: '#EF4444',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  securityText: {
    fontSize: 14,
    color: '#0369a1',
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
});
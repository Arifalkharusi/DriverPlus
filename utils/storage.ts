import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  EARNINGS_DATA: 'earnings_data',
  EXPENSES_DATA: 'expenses_data',
  TARGETS_DATA: 'targets_data',
  SETTINGS: 'app_settings',
  PLATFORM_TOKENS: 'platform_tokens',
} as const;

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

// Specific storage functions
export const storeUserToken = async (token: string): Promise<void> => {
  await storeData(STORAGE_KEYS.USER_TOKEN, token);
};

export const getUserToken = async (): Promise<string | null> => {
  return await getData(STORAGE_KEYS.USER_TOKEN);
};

export const removeUserToken = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.USER_TOKEN);
};

export const storeUserProfile = async (profile: any): Promise<void> => {
  await storeData(STORAGE_KEYS.USER_PROFILE, profile);
};

export const getUserProfile = async (): Promise<any> => {
  return await getData(STORAGE_KEYS.USER_PROFILE);
};

export const storeEarningsData = async (earnings: any[]): Promise<void> => {
  await storeData(STORAGE_KEYS.EARNINGS_DATA, earnings);
};

export const getEarningsData = async (): Promise<any[]> => {
  return (await getData(STORAGE_KEYS.EARNINGS_DATA)) || [];
};

export const storeExpensesData = async (expenses: any[]): Promise<void> => {
  await storeData(STORAGE_KEYS.EXPENSES_DATA, expenses);
};

export const getExpensesData = async (): Promise<any[]> => {
  return (await getData(STORAGE_KEYS.EXPENSES_DATA)) || [];
};

export const storeTargetsData = async (targets: any): Promise<void> => {
  await storeData(STORAGE_KEYS.TARGETS_DATA, targets);
};

export const getTargetsData = async (): Promise<any> => {
  return await getData(STORAGE_KEYS.TARGETS_DATA);
};

export const storeAppSettings = async (settings: any): Promise<void> => {
  await storeData(STORAGE_KEYS.SETTINGS, settings);
};

export const getAppSettings = async (): Promise<any> => {
  return (await getData(STORAGE_KEYS.SETTINGS)) || {
    currency: 'GBP',
    notifications: {
      earnings: true,
      targets: true,
      transport: false,
      insights: true,
    },
  };
};
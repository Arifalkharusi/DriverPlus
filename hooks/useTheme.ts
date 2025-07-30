import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    loadTheme();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemColorScheme : theme;
    if (isMountedRef.current) setIsDark(resolvedTheme === 'dark');
  }, [theme, systemColorScheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        if (isMountedRef.current) setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const updateTheme = async (newTheme: Theme) => {
    try {
      if (isMountedRef.current) setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    theme,
    isDark,
    updateTheme,
  };
}
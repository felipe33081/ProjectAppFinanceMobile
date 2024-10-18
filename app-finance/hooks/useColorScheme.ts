import { useContext, useState } from 'react';
import themeContext from '@/theme/themeContext';

type ThemeContext = 'light' | 'dark';

export function useColorScheme(): ThemeContext {
  const theme = useContext(themeContext);

  return theme.theme === 'dark' ? 'dark' : 'light';
}
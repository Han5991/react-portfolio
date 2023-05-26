import {useEffect, useState} from 'react';

const useThemeMode = () => {
  const getInitialColorMode = () => {
    let isDarkMode = false;
    if (typeof window !== 'undefined') {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return isDarkMode ? 'dark' : 'light';
  };

  const [colorMode, setColorMode] = useState(getInitialColorMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setColorMode(getInitialColorMode());
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorMode;
};

export default useThemeMode;

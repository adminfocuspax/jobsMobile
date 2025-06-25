import React, { useEffect, useState } from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { setFlushStyles } from '@gluestack-ui/nativewind-utils/flush';
import { config } from './config';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  });

  useEffect(() => {
    if (mode === 'system') {
      setColorScheme(systemColorScheme === 'dark' ? 'light' : 'light');
    } else {
      setColorScheme(mode);
    }
  }, [mode, systemColorScheme]);

  // Flush CSS variables to NativeWind
  useEffect(() => {
    let cssVariablesWithMode = ``;
    Object.keys(config).forEach(configKey => {
      cssVariablesWithMode +=
        configKey === 'dark' ? `\n .dark {\n ` : `\n:root {\n`;
      const cssVariables = Object.keys(
        config[configKey as keyof typeof config]
      ).reduce((acc: string, curr: string) => {
        acc += `${curr}:${config[configKey as keyof typeof config][curr]}; `;
        return acc;
      }, '');
      cssVariablesWithMode += `${cssVariables} \n}`;
    });

    setFlushStyles(cssVariablesWithMode);
  }, [colorScheme]);

  return (
    <View
      style={[
        config[colorScheme],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}

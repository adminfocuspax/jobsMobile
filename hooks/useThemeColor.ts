/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

export function useThemeColors(
  props: { light?: string; dark?: string },
  colorNames: (keyof typeof Colors.light)[]
) {
  const theme = useColorScheme() ?? 'light';
  const result: Record<string, string> = {};

  colorNames.forEach(colorName => {
    const colorFromProps = props[theme];

    if (colorFromProps) {
      result[colorName] = colorFromProps;
    } else {
      result[colorName] = Colors[theme][colorName];
    }
  });

  return result;
}

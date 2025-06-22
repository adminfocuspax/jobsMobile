import { useRef, useCallback } from 'react';
import { useRouter, Href } from 'expo-router';

interface NavigationOptions {
  pathname: string;
  params?: Record<string, any>;
}

interface UseNavigationGuardOptions {
  debounceTime?: number; // Time in milliseconds to prevent multiple navigations
}

/**
 * Custom hook to prevent multiple navigation calls
 * @param options Configuration options for the navigation guard
 * @returns Object with safeNavigate function and navigation state
 */
export const useNavigationGuard = (options: UseNavigationGuardOptions = {}) => {
  const { debounceTime = 1000 } = options;
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Safe navigation function that prevents multiple rapid calls
   * @param navigationOptions Navigation options including pathname and params
   * @param callback Optional callback to execute after navigation
   */
  const safeNavigate = useCallback(
    (navigationOptions: NavigationOptions, callback?: () => void) => {
      // Prevent multiple navigation calls
      if (isNavigatingRef.current) {
        console.warn('Navigation already in progress, ignoring duplicate call');
        return;
      }

      isNavigatingRef.current = true;

      try {
        // Navigate to the specified route
        if (navigationOptions.params) {
          router.push({
            pathname: navigationOptions.pathname,
            params: navigationOptions.params,
          } as Href);
        } else {
          router.push(navigationOptions.pathname as Href);
        }

        // Execute callback if provided
        callback?.();
      } catch (error) {
        console.error('Navigation error:', error);
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset the flag after the debounce time
      timeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
        timeoutRef.current = null;
      }, debounceTime);
    },
    [router, debounceTime]
  );

  /**
   * Replace current route safely
   * @param navigationOptions Navigation options including pathname and params
   * @param callback Optional callback to execute after navigation
   */
  const safeReplace = useCallback(
    (navigationOptions: NavigationOptions, callback?: () => void) => {
      // Prevent multiple navigation calls
      if (isNavigatingRef.current) {
        console.warn('Navigation already in progress, ignoring duplicate call');
        return;
      }

      isNavigatingRef.current = true;

      try {
        // Replace current route
        if (navigationOptions.params) {
          router.replace({
            pathname: navigationOptions.pathname,
            params: navigationOptions.params,
          } as Href);
        } else {
          router.replace(navigationOptions.pathname as Href);
        }

        // Execute callback if provided
        callback?.();
      } catch (error) {
        console.error('Navigation error:', error);
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset the flag after the debounce time
      timeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
        timeoutRef.current = null;
      }, debounceTime);
    },
    [router, debounceTime]
  );

  /**
   * Go back safely
   */
  const safeGoBack = useCallback(() => {
    if (isNavigatingRef.current) {
      console.warn('Navigation already in progress, ignoring duplicate call');
      return;
    }

    isNavigatingRef.current = true;

    try {
      router.back();
    } catch (error) {
      console.error('Navigation error:', error);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset the flag after the debounce time
    timeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      timeoutRef.current = null;
    }, debounceTime);
  }, [router, debounceTime]);

  /**
   * Force reset the navigation guard (use with caution)
   */
  const resetNavigationGuard = useCallback(() => {
    isNavigatingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    safeNavigate,
    safeReplace,
    safeGoBack,
    resetNavigationGuard,
    isNavigating: isNavigatingRef.current,
  };
};

export default useNavigationGuard;
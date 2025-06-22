# Navigation Guard Hook

A reusable React hook that prevents multiple navigation calls in React Native/Expo applications.

## Problem

When users rapidly tap navigation buttons, it can cause multiple navigation calls, leading to:
- Multiple screens being pushed to the navigation stack
- Unexpected navigation behavior
- Poor user experience

## Solution

The `useNavigationGuard` hook provides a debounced navigation system that prevents multiple rapid navigation calls.

## Installation

The hook is already available in your project at `hooks/useNavigationGuard.ts`.

## Basic Usage

```typescript
import { useNavigationGuard } from '@/hooks';

const MyComponent = () => {
  const { safeNavigate } = useNavigationGuard();

  const handleNavigate = () => {
    safeNavigate({ pathname: '/some-route' });
  };

  return (
    <Button onPress={handleNavigate}>
      <ButtonText>Navigate</ButtonText>
    </Button>
  );
};
```

## API Reference

### `useNavigationGuard(options?)`

#### Options
- `debounceTime?: number` - Time in milliseconds to prevent multiple navigations (default: 1000)

#### Returns
- `safeNavigate(navigationOptions, callback?)` - Navigate to a new route safely
- `safeReplace(navigationOptions, callback?)` - Replace current route safely
- `safeGoBack()` - Go back safely
- `resetNavigationGuard()` - Force reset the navigation guard
- `isNavigating: boolean` - Current navigation state

### Navigation Options
```typescript
interface NavigationOptions {
  pathname: string;
  params?: Record<string, any>;
}
```

## Examples

### 1. Simple Navigation
```typescript
const { safeNavigate } = useNavigationGuard();

const handleNavigate = () => {
  safeNavigate({ pathname: '/profile' });
};
```

### 2. Navigation with Parameters
```typescript
const { safeNavigate } = useNavigationGuard();

const handleNavigateToJob = (jobId: string) => {
  safeNavigate({
    pathname: '/pages/jobDetails',
    params: { jobId }
  });
};
```

### 3. Navigation with Callback
```typescript
const { safeNavigate } = useNavigationGuard();

const handleNavigate = () => {
  safeNavigate(
    { pathname: '/dashboard' },
    () => {
      // This runs after navigation
      console.log('Navigation completed');
      analytics.track('navigated_to_dashboard');
    }
  );
};
```

### 4. Custom Debounce Time
```typescript
const { safeNavigate } = useNavigationGuard({ debounceTime: 500 });
```

### 5. Replace Navigation
```typescript
const { safeReplace } = useNavigationGuard();

const handleLogin = () => {
  safeReplace({ pathname: '/dashboard' });
};
```

### 6. Safe Back Navigation
```typescript
const { safeGoBack } = useNavigationGuard();

const handleGoBack = () => {
  safeGoBack();
};
```

### 7. Disable Button During Navigation
```typescript
const { safeNavigate, isNavigating } = useNavigationGuard();

return (
  <Button onPress={handleNavigate} disabled={isNavigating}>
    <ButtonText>Navigate</ButtonText>
  </Button>
);
```

## Migration from Direct Router Usage

### Before
```typescript
import { useRouter } from 'expo-router';

const MyComponent = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push({ pathname: '/some-route' });
  };
};
```

### After
```typescript
import { useNavigationGuard } from '@/hooks';

const MyComponent = () => {
  const { safeNavigate } = useNavigationGuard();

  const handleNavigate = () => {
    safeNavigate({ pathname: '/some-route' });
  };
};
```

## Best Practices

1. **Use consistent debounce times** across your app (default 1000ms is recommended)
2. **Disable buttons during navigation** to provide visual feedback
3. **Use callbacks for side effects** that should happen after navigation
4. **Use `safeReplace` for login/logout flows** to prevent back navigation
5. **Test on slower devices** to ensure the debounce time works well

## Features

- ✅ Prevents multiple rapid navigation calls
- ✅ Supports navigation with parameters
- ✅ Supports callbacks after navigation
- ✅ Provides navigation state for UI feedback
- ✅ Supports push, replace, and back navigation
- ✅ Configurable debounce time
- ✅ Automatic cleanup of timeouts
- ✅ Error handling for navigation failures
- ✅ TypeScript support

## Notes

- The hook uses `useRef` to track navigation state without causing re-renders
- Timeouts are automatically cleaned up to prevent memory leaks
- Console warnings are shown when duplicate navigation calls are prevented
- The hook is compatible with Expo Router and React Navigation
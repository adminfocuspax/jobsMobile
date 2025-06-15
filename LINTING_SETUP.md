# ESLint and Prettier Setup

This project is configured with ESLint and Prettier for code quality and formatting.

## Configuration

### ESLint
- **Base Configuration**: Airbnb TypeScript configuration
- **Extensions**: 
  - `airbnb` - Airbnb's base ESLint rules
  - `airbnb-typescript` - TypeScript-specific Airbnb rules
  - `airbnb/hooks` - React Hooks rules
  - `plugin:@typescript-eslint/recommended` - TypeScript ESLint rules
  - `expo` - Expo-specific rules
  - `plugin:react-native/all` - React Native rules
  - `prettier` - Prettier integration

### Prettier
- **Single Quotes**: Enabled for JavaScript/TypeScript
- **Semicolons**: Required
- **Print Width**: 80 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 compatible

## Available Scripts

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Check Prettier formatting
npm run format:check

# Type checking
npm run type-check
```

## VS Code Integration

The project includes VS Code settings for:
- Format on save with Prettier
- Auto-fix ESLint issues on save
- Proper file associations

### Recommended Extensions
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- TypeScript (`ms-vscode.vscode-typescript-next`)
- Tailwind CSS (`bradlc.vscode-tailwindcss`)
- Expo Tools (`expo.vscode-expo-tools`)

## Key Rules

### React/React Native Specific
- `react/react-in-jsx-scope`: OFF (not needed in React 17+)
- `react/prop-types`: OFF (using TypeScript)
- `react/jsx-filename-extension`: Only `.tsx` and `.jsx` files
- `react-native/no-inline-styles`: WARN
- `react-native/no-unused-styles`: WARN

### TypeScript Specific
- `@typescript-eslint/no-unused-vars`: ERROR (with underscore prefix exception)
- `@typescript-eslint/no-explicit-any`: WARN
- `@typescript-eslint/explicit-function-return-type`: OFF

### Import Rules
- `import/extensions`: Never for JS/TS files
- `import/prefer-default-export`: OFF
- Proper import ordering enforced

## Ignored Files

The following files/directories are ignored:
- `node_modules/`
- `.expo/`
- `android/`
- `ios/`
- `web-build/`
- `*.config.js`
- `*.config.ts`
- `babel.config.js`
- `metro.config.js`
- `scripts/`

## Common Issues and Solutions

### React Hooks Rules
The configuration includes proper React Hooks rules:
- `react-hooks/rules-of-hooks`: ERROR
- `react-hooks/exhaustive-deps`: WARN

### Unused Variables
Variables starting with underscore (`_`) are allowed to be unused:
```typescript
const [_unused, setValue] = useState();
```

### Console Statements
Console statements are set to WARN instead of ERROR for development convenience.

## Customization

To modify rules, edit `.eslintrc.js`:

```javascript
rules: {
  // Add or override rules here
  'rule-name': 'off', // or 'warn' or 'error'
}
```

To modify Prettier settings, edit `.prettierrc.js`.
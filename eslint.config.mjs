import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.agent/**',
      'coverage/**',
      'node_modules/**',
      'out/**',
      'public/**',
      'scripts/**',
      'next-env.d.ts',
      '*.config.js',
      '*.config.ts',
      '*.d.ts',
      '**/._*',
    ],
  },
  ...nextVitals,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/no-unescaped-entities': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default eslintConfig;

module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['react-app', 'prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'jsx-a11y', 'import', 'react-hooks'],
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
		'prettier/prettier': 'error',
		'no-console': ['error', { allow: ['tron'] }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};

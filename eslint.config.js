import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		// Configuração para arquivos TypeScript
		files: ['**/*.ts', '*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		rules: {
			'semi': ['error', 'always'],
			'indent': ['error', 'tab']
		}
	},
	{
		// Configuração para arquivos JavaScript (SEM o project)
		files: ['**/*.js', '*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
			// Note: SEM parser e SEM project aqui
		},
		rules: {
			'semi': ['error', 'always'],
			'indent': ['error', 'tab']
		}
	}
];
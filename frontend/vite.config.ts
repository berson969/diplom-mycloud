import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Загружаем переменные окружения
	const env = loadEnv(mode, process.cwd(), '')

	// Выводим конфигурацию для отладки
	console.log('Vite config:', {
		base: env.VITE_BUILD_PREFIX ?? '/',
		'process.env.VITE_BASE_QUERY_URL': env.VITE_BASE_QUERY_URL,
		'process.env.VITE_BUILD_PREFIX': env.VITE_BUILD_PREFIX
	})

	return {
		base: env.VITE_BUILD_PREFIX ?? '/',
		plugins: [react()],
		define: {
			'process.env.VITE_BASE_QUERY_URL': JSON.stringify(env.VITE_BASE_QUERY_URL),
			'process.env.VITE_BUILD_PREFIX': JSON.stringify(env.VITE_BUILD_PREFIX)
		},
		server: {
			https: {
				key: fs.readFileSync(path.resolve(__dirname, '../nginx/ssl/mysite.key')),
				cert: fs.readFileSync(path.resolve(__dirname, '../nginx/ssl/mysite.crt')),
			},
			host: env.VITE_BASE_HOST,
			port: 5173,
		},
	};
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({ base: process.env.SITE_BASE || '/', plugins: [react()], resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } }, css: { postcss: { plugins: [tailwindcss()] } }, build: { outDir: 'out' }, server: { host: '127.0.0.1' } });

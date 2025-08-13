import { defineConfig } from 'vite';
export default defineConfig({
  base: '/pomodoro-app/',
  build: { outDir: 'docs', emptyOutDir: true },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(),svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use '@/assets/scss/variables/colors' as *;
        @use '@/assets/scss/mixins/media-queries' as *;
        @use '@/assets/scss/variables/font' as *;
        `
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
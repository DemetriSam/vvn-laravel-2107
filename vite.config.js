import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost',
        },

        port: 5174,
        strictPort: true,
    },
    plugins: [
        laravel({
            input: [
                'resources/scss/style.scss',
                'resources/js/swiper-bundle.js',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});

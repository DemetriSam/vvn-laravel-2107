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
                'resources/js/src_js/files/dynamic-header.js',
                'resources/js/src_js/files/functions.js',
                'resources/js/src_js/libs/swiper-bundle.min.js',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});

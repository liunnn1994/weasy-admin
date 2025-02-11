import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import vuetify from 'vite-plugin-vuetify';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    vuetify({
      styles: {
        configFile: 'src/assets/vuetify.scss',
      },
    }),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({ compiler: 'vue3' }),
    AutoImport({
      vueTemplate: true,
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          '@vueuse/router': ['useRouteHash', 'useRouteParams', 'useRouteQuery'],
          'await-to-js': [
            // default imports
            ['default', 'to'],
          ],
          '@vueuse/shared': ['promiseTimeout'],
        },
      ],

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ['./src/components/**', './src/constants/**', './src/hooks/**', './src/utils/**'],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: './auto-imports.d.ts',

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [],

      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});

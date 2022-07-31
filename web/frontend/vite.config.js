import { defineConfig, loadEnv } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('SHOPIFY_API_SECRET: ', env);
  if (env.npm_lifecycle_event === 'build' && !env.CI && !env.SHOPIFY_API_KEY) {
    console.warn(
      '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n',
    );
  }

  const proxyOptions = {
    target: `http://127.0.0.1:${env.BACKEND_PORT}`,
    changeOrigin: false,
    secure: true,
    ws: false,
  };

  const host = env.HOST ? env.HOST.replace(/https:\/\//, '') : undefined;

  // HMR doesn't work on Firefox using localhost, so you can temporarily get that to work by setting the
  // SHOPIFY_VITE_HMR_USE_POLLING env var when running this
  let hmrConfig;
  if (env.SHOPIFY_VITE_HMR_USE_POLLING) {
    hmrConfig = {
      server: https.createServer(),
    };
  } else if (env.SHOPIFY_VITE_HMR_USE_WSS) {
    hmrConfig = {
      protocol: host ? 'wss' : 'ws',
      host: host || 'localhost',
      port: env.FRONTEND_PORT,
      clientPort: 443,
    };
  } else {
    hmrConfig = {
      protocol: 'ws',
      host: 'localhost',
      port: 64999,
      clientPort: 64999,
    };
  }

  return {
    root: dirname(fileURLToPath(import.meta.url)),
    define: {
      'process.env.SHOPIFY_API_KEY': JSON.stringify(env.SHOPIFY_API_KEY),
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
    resolve: {
      preserveSymlinks: true,
    },
    server: {
      host: env.SHOPIFY_VITE_HMR_USE_WSS ? '0.0.0.0' : 'localhost',
      port: env.FRONTEND_PORT,
      hmr: hmrConfig,
      proxy: {
        '^/(\\?.*)?$': proxyOptions,
        '^/api(/|(\\?.*)?$)': proxyOptions,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.js',
      deps: {
        inline: ['@shopify/react-testing'],
      },
    },
  };
});

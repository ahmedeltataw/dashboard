import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import purgecss from "astro-purgecss";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            let extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          }

          // 
        }
      }
    }
  },

  compressHTML: true,
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), purgecss(), compressor({
    gzip: true,
    brotli: false
  }),]
});
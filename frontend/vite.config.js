// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // const {createProxyMiddleware} = require('http-proxy-middleware')

// // module.exports = function(app){
// //   app.use(
// //     '/api',
// //     createProxyMiddleware({
// //       target: 'http://localhost:8000',
// //       changeOrigin: true,
// //     })
// //   )
// // }

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', 
        changeOrigin: true, 
      },
    },
  },
  plugins: [react()],
});

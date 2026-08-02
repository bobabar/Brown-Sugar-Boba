import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        home: `${root}index.html`,
        privacy: `${root}privacy.html`,
        accountDeletion: `${root}account-deletion.html`,
      },
    },
  },
})

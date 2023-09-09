import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import alias from "vite-tsconfig-paths"
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), alias(), svgr({ include: '**/*.svg' })],
})

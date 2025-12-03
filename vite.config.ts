import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포를 위한 base 경로
// 리포지토리 이름이 'dashboard'인 경우: '/dashboard/'
// 루트 도메인을 사용하는 경우: '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/dashboard/' : '/',
})


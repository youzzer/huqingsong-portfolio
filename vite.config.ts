import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 不引入 @types/node，仅声明构建期需要的 env 读取
declare const process: { env: Record<string, string | undefined> }

// 托管环境通过 PORT 环境变量指定端口，且需允许反向代理域名访问
const port = Number(process.env.PORT) || 5173

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port, strictPort: true, allowedHosts: true },
  preview: { host: '0.0.0.0', port, strictPort: true, allowedHosts: true },
})

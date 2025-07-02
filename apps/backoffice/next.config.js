/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for HTTPS and turbo mode
  experimental: {
    // Turbo mode is enabled by default in Next.js 15
    // HTTPS is handled by --experimental-https flag
  },
  
  // TypeScript configuration
  typescript: {
    // Dangerously allows production builds to successfully complete even if
    // your project has TypeScript errors
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  
  // Path mapping support
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    }
    return config
  },
  
  // Server configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // Backend API proxy
      },
    ]
  },
}

export default nextConfig
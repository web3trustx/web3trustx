/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/web3trustx-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/web3trustx-website/' : '',
  trailingSlash: true,
}

module.exports = nextConfig

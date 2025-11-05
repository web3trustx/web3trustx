/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/web3trustx' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/web3trustx/' : '',
  trailingSlash: true,
}

module.exports = nextConfig

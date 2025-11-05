/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath needed for web3trustx.github.io/web3trustx (using custom domain)
  trailingSlash: true,
}

module.exports = nextConfig

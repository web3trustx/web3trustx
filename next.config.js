/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath needed when using custom domain (CNAME)
  // basePath is only needed for github.io/repository URLs
  trailingSlash: true,
}

module.exports = nextConfig

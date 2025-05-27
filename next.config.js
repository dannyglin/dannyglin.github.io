/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
    },
    output: 'export',
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
}

module.exports = nextConfig

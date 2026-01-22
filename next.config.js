// /** @type {import('next').NextConfig} */
// const path = require('path');

// const nextConfig = {
//   /* config options here */
//   webpack: (config) => {
//     // Add path alias for '@'
//     config.resolve.alias['@'] = path.join(__dirname, 'src');
//     return config;
//   },
// };

// module.exports = nextConfig; 



/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // suppress warning
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // optional: keep webpack alias if building with webpack
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  // Turbopack native alias for `@`
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;

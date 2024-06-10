/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    webpack: (config, { isServer }) => {
      // Add a rule to handle HTML files
      config.module.rules.push({
        test: /\.html$/,
        use: 'raw-loader',
      });
  
      return config;
    },
  };
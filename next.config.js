/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });

    return config;
  }
}

module.exports = nextConfig

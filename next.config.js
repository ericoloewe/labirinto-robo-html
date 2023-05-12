const isDev = process.env.NODE_ENV === 'development';
const basePath = isDev ? '' : '/labirinto-robo-html';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isDev ? undefined : basePath,
  assetPrefix: isDev ? undefined : `${basePath}/`,
  env: {
    BASE_PATH: basePath
  },
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });

    return config;
  }
}

module.exports = nextConfig

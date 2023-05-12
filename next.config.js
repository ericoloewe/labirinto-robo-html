const isExport = process.argv.some(a => a.includes('export'));
const isDev = process.argv.some(a => a.includes('dev'));
const basePath = isDev ? '' : '/labirinto-robo-html';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  env: {
    BASE_PATH: basePath
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });

    return config;
  }
}

module.exports = nextConfig

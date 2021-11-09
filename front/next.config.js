const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  compress: true,
  webpack(config, { webpack }) {
    const newConfig = {
      ...config,
      mode: isProduction ? 'production' : 'development',
      plugins: [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)],
    };
    if (isProduction) {
      newConfig.devtool = 'hidden-source-map';
    }
    return newConfig;
  },
};

module.exports = withPlugins([withBundleAnalyzer, withImages], nextConfig);

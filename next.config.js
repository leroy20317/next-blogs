// @ts-check

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { name } = require('./package.json');
// const { withSentryConfig } = require('@sentry/nextjs');

const isProd = process.env.NODE_ENV === 'production';
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  distDir: 'build',
  // 默认压缩，不用额外配置compression
  compress: true,
  sentry: {
    // 本地及测试环境禁用sentry
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  env: {
    API_HOST: isProd ? 'https://api.leroy.net.cn/web' : 'http://localhost:5001/web',
    STATIC_HOST: isProd ? `//cdn.leroy.net.cn/${name}/public/` : '/',
  },

  // cdn in production and localhost for development
  assetPrefix: isProd ? `//cdn.leroy.net.cn/${name}` : '',

  // 运行时配置(server client皆可获取)
  // publicRuntimeConfig: {
  // },

  api: {
    bodyParser: true,
  },

  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new AntdDayjsWebpackPlugin()); // 默认不引用momentjs，减小antd打包体积
    if (isProd) {
      config.plugins.push(
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['build/static/'].map((item) =>
            path.resolve(__dirname, item),
          ),
          verbose: true,
        }),
      );
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            extractComments: false, // 移除注释
            compress: {
              drop_console: isProd,
              drop_debugger: isProd,
            },
          },
        }),
      );
    }
    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const sentryWebpackPluginOptions = {
//   // silent: true, // Suppresses all logs
//   debug: true,
// };

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

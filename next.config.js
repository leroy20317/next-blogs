// @ts-check

const { name } = require('./package.json');
// const { withSentryConfig } = require('@sentry/nextjs');

const isProd = process.env.NODE_ENV === 'production';
// const isProd = false;

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
  excludeDefaultMomentLocales: true,
  env: {
    API_HOST: isProd ? 'https://api.leroy.net.cn/web' : 'http://api.leroy.net.cn/web',
    STATIC_HOST: isProd ? `//cdn.leroy.net.cn/${name}/static` : '/static',
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
  },

  // cdn in production and localhost for development
  // assetPrefix: isProd ? `//cdn.leroy.net.cn/${name}` : '',

  // 运行时配置(server client皆可获取)
  // publicRuntimeConfig: {
  // },
  images: {
    minimumCacheTTL: 24 * 3600,
    domains: ['cdn.leroy.net.cn', 'api.leroy.net.cn'],
  },
  api: {
    bodyParser: true,
  },
  sassOptions: {
    // 写入额外变量
    additionalData: isProd
      ? `$static: '//cdn.leroy.net.cn/${name}/static';`
      : `$static: '/static';`,
    // prependData:  isProd ? `@import "@/styles/config/prod.scss";` : `@import "@/styles/config/dev.scss";`,
  },
  swcMinify: true,
  experimental: {
    removeConsole: isProd,
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

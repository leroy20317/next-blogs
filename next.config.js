/*
 * @Author: leroy
 * @Date: 2025-02-05 14:14:18
 * @LastEditTime: 2025-02-05 14:19:07
 * @Description: 
 */

const isProd = process.env.NODE_ENV === 'production';
// const isProd = false;
const baseDomain = '.leroytop.com';

/**
 * @type {import('next').NextConfig}
 **/
let nextConfig = {
  distDir: 'build',
  // 默认压缩，不用额外配置compression
  compress: true,
  transpilePackages: ['ahooks'],
  env: {
    BASE_DOMAIN: baseDomain,
    API_HOST: `https://api${baseDomain}/web`,
    STATIC_HOST: '/static',
    COMMENT_CLIENT_SECRET: process.env.COMMENT_CLIENT_SECRET,
    COMMENT_CLIENT_ID: process.env.COMMENT_CLIENT_ID,
  },

  // cdn in production and localhost for development
  // assetPrefix: isProd ? `//cdn.leroytop.com/${name}` : '',

  // 运行时配置(server client皆可获取)
  // publicRuntimeConfig: {
  // },
  images: {
    minimumCacheTTL: 24 * 3600,
    domains: [`api${baseDomain}`, `cdn${baseDomain}`],
  },
  sassOptions: {
    // 写入额外变量
    additionalData: `$static: '/static';`,
    // prependData:  isProd ? `@import "@/styles/config/prod.scss";` : `@import "@/styles/config/dev.scss";`,
  },
  compiler: {
    removeConsole: isProd,
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = require('@next/bundle-analyzer')({
    enabled: true,
  });
}

// const sentryWebpackPluginOptions = {
//   // silent: true, // Suppresses all logs
//   debug: true,
// };
// nextConfig = withSentryConfig(nextConfig, sentryWebpackPluginOptions)

export default nextConfig;

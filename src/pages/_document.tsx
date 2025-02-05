/*
 * @Author: leroy
 * @Date: 2023-11-17 15:21:03
 * @LastEditTime: 2025-02-05 09:55:56
 * @Description: Document
 */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style data-test="extract" dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="zh-CN">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

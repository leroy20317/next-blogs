/*
 * @Author: leroy
 * @Date: 2022-03-07 09:38:39
 * @LastEditTime: 2025-02-05 14:17:55
 * @Description:
 */

import type { FC } from 'react';
import { Image } from 'antd';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/coy';

const Markdown: FC<{ value: string }> = ({ value }) => {
  return (
    <div>
      <ReactMarkdown
        components={{
          // 自定义 img 标签的渲染
          img: ({ src, alt, className, style }) => (
            <Image
              src={src}
              alt={alt}
              className={className}
              style={{ maxWidth: '100%', ...style }} // 可以添加自定义样式
            />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={theme}
                language={match[1]}
                PreTag="div"
                {...props}
                customStyle={{
                  fontSize: 14,
                  overflow: 'auto',
                  backgroundColor: 'var(--color-code-bg)',
                  padding: 16,
                }}
                codeTagProps={{ className }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {value || ''}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;

/**
 * @author: leroy
 * @date: 2022-03-07 09:38
 * @description：Markdown
 */

import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/coy';

const Markdown: FC<{ value: string }> = ({ value }) => {
  return (
    <div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
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

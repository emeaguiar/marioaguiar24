'use client';

/**
 * External dependencies
 */
import { useEffect } from 'react';
import { Highlight, themes, Prism } from 'prism-react-renderer';
import clsx from 'clsx';

export default function Code({
  children,
  language,
  allowExpand = true,
}: {
  children: string;
  language: string;
  allowExpand?: boolean;
}) {
  useEffect(() => {
    const loadLanguages = async () => {
      (typeof global !== 'undefined' ? global : window).Prism = Prism;
      require('prismjs/components/prism-markup-templating');
      require('prismjs/components/prism-css');
      require('prismjs/components/prism-css-extras');
      require('prismjs/components/prism-php');
      require('prismjs/components/prism-php-extras');
      require('prismjs/components/prism-bash');
      require('prismjs/components/prism-json');
      require('prismjs/components/prism-scss');
    };

    loadLanguages();
  }, []);

  return (
    <Highlight theme={themes.dracula} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={clsx(
            className,
            'text-sm/1.5 w-full overflow-x-auto rounded-md p-2',
            'lg:rounded-lg lg:p-4 lg:text-base',
            {
              'lg:-mx-8 lg:max-w-screen-md': allowExpand,
            }
          )}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({
                line,
                className: clsx('px-2', {
                  //'bg-slate-800': i % 2 === 0,
                  //'bg-slate-900': i % 2 !== 0,
                }),
              })}
            >
              <span className='mr-4 inline-block min-w-6 select-none'>
                {i + 1}
              </span>

              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

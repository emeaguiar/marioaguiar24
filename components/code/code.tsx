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
}: {
  children: string;
  language: string;
}) {
  useEffect(() => {
    const loadLanguages = async () => {
      (typeof global !== 'undefined' ? global : window).Prism = Prism;
      await Promise.all([
        import('prismjs/components/prism-markup-templating'),
        import('prismjs/components/prism-css'),
        import('prismjs/components/prism-css-extras'),
        import('prismjs/components/prism-php'),
        import('prismjs/components/prism-php-extras'),
        import('prismjs/components/prism-bash'),
        import('prismjs/components/prism-json'),
        import('prismjs/components/prism-scss'),
      ]);
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
            'lg:-mx-8 lg:max-w-screen-md lg:rounded-lg lg:p-4 lg:text-base'
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
              <span className='mr-4'>{i + 1}</span>

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

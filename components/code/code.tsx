/**
 * External dependencies
 */
import { Highlight, themes } from "prism-react-renderer";
import clsx from "clsx";

export default function Code( { children, language }: {
    children: string;
    language: string;
} ) {
    return (
        <Highlight
            theme={ themes.dracula }
            code={ children }
            language={ language }
        >
            { ( { className, style, tokens, getLineProps, getTokenProps } ) => (
                    <pre
                        style={ style }
                        className={
                            clsx(
                                className,
                                'rounded-md overflow-x-auto text-sm/1.5 bg-slate-700',
                                'lg:text-base lg:rounded-lg lg:overflow-hidden lg:-mx-8 lg:max-w-screen-md'
                            )
                        }
                    >
                        { tokens.map( ( line, i ) => (
                            <div
                                key={ i }
                                {
                                    ...getLineProps( {
                                        line,
                                        className: clsx(
                                            'px-2',
                                            {
                                                //'bg-slate-800': i % 2 === 0,
                                                //'bg-slate-900': i % 2 !== 0,
                                            }
                                        )
                                    } )
                                }
                            >
                                <span className="mr-4">{i + 1}</span>

                                { line.map( ( token, key ) => (
                                    <span key={ key } { ...getTokenProps( { token } ) } />
                                ) ) }
                            </div>
                        ) ) }
                    </pre>
            ) }
        </Highlight>
    );
}

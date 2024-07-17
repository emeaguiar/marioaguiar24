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
            {...themes.dracula}
            code={ children }
            language={ language }
        >
            { ( { className, style, tokens, getLineProps, getTokenProps } ) => (
                <pre
                    style={ style }
                    className={
                        clsx(
                            className,
                            'max-w-screen-md rounded-md overflow-auto text-sm/1.5',
                            'lg:text-base lg:rounded-lg lg:overflow-hidden'
                        )
                    }
                >
                    { tokens.map( ( line, i ) => (
                        <div key={ i } { ...getLineProps( { line } ) }>
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

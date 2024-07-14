/**
 * Next dependencies
 */
import type { MDXComponents } from "mdx/types";

/**
 * Inetrnal dependencies
 */
import { H2 } from "./app/ui/elements";

export function useMDXComponents( components: MDXComponents ): MDXComponents {
    return {
        H2: ( props ) => <H2 { ...props } />,
        ...components
    };
}

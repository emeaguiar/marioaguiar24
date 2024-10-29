/**
 * Internal dependencies
 */
import Code from '@/components/code/code';

export const Pre = ({
  children,
  allowExpand = true,
}: {
  children: any;
  allowExpand?: boolean;
}) => {
  if (!children) {
    return null;
  }

  return (
    <Code
      language={children.props.className.replace('language-', '')}
      allowExpand={allowExpand}
    >
      {children.props.children}
    </Code>
  );
};

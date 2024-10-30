/**
 * Internal dependencies
 */
import Code from '@/components/code/code';

export const Pre = (props: any) => {
  const { children, allowExpand } = props;

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

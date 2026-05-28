/**
 * External dependencies
 */
import { motion, useReducedMotion } from 'motion/react';

type Segment = { text: string; bold?: boolean };

type Props = {
  lines: Segment[][];
  as?: 'p' | 'h1' | 'h2' | 'h3';
  className?: string;
  onComplete?: () => void;
  speed?: number;
};

export default function Typewriter({
  lines,
  as = 'p',
  className,
  onComplete,
  speed = 40,
}: Props) {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: prefersReduced ? {} : { staggerChildren: speed / 1000 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  const initial = prefersReduced ? 'visible' : 'hidden';

  const Tag = motion[as] as typeof motion.p;

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial={initial}
      animate='visible'
      onAnimationComplete={onComplete}
    >
      {lines.map((segments, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          {segments.map((segment, segIndex) => {
            const chars = segment.text.split('');
            const inner = chars.map((char, charIndex) => (
              <motion.span key={charIndex} variants={charVariants}>
                {char}
              </motion.span>
            ));
            return segment.bold ? (
              <strong className='font-black' key={segIndex}>
                {inner}
              </strong>
            ) : (
              <span key={segIndex}>{inner}</span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

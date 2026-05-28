/**
 * External dependencies
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Segment = { text: string; bold?: boolean };

type Props = {
  lines: Segment[][];
  as?: 'p' | 'h1' | 'h2' | 'h3';
  className?: string;
  onComplete?: () => void;
  speed?: number;
  showCursor?: boolean;
  keepCursor?: boolean;
};

export default function Typewriter({
  lines,
  as = 'p',
  className,
  onComplete,
  speed = 40,
  showCursor = true,
  keepCursor = true,
}: Props) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const charRefsMap = useRef<Map<number, HTMLElement>>(new Map());

  const cursorDelay = showCursor && !prefersReduced ? 1.4 : 0;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: prefersReduced
        ? {}
        : { staggerChildren: speed / 1000, delayChildren: cursorDelay },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  const initial = prefersReduced ? 'visible' : 'hidden';

  const Tag = motion[as] as typeof motion.p;

  const moveCursor = useCallback((el: HTMLElement, placeBefore = false) => {
    if (!containerRef.current || !cursorRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const x = (placeBefore ? er.left : er.right) - cr.left;
    const y = er.top - cr.top;
    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    if (prefersReduced || !showCursor) return;
    const first = charRefsMap.current.get(0);
    if (first) moveCursor(first, true);
  }, [prefersReduced, showCursor, moveCursor]);

  const handleAnimationComplete = useCallback(() => {
    setAnimationDone(true);
    onComplete?.();
  }, [onComplete]);

  let globalCharIndex = 0;

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
      style={{ position: 'relative' }}
      variants={containerVariants}
      initial={initial}
      animate='visible'
      onAnimationComplete={handleAnimationComplete}
    >
      {lines.map((segments, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          {segments.map((segment, segIndex) => {
            const chars = segment.text.split('');
            const inner = chars.map((char, charIndex) => {
              const myIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIndex}
                  variants={charVariants}
                  ref={(el) => {
                    if (el) charRefsMap.current.set(myIndex, el);
                  }}
                  onAnimationComplete={(definition) => {
                    if (definition !== 'visible') return;
                    const el = charRefsMap.current.get(myIndex);
                    if (el) moveCursor(el);
                  }}
                >
                  {char}
                </motion.span>
              );
            });
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
      {showCursor && !prefersReduced && (
        <span
          ref={cursorRef}
          className='typewriter-cursor'
          aria-hidden='true'
          style={
            animationDone && !keepCursor
              ? { opacity: 0, animation: 'none' }
              : undefined
          }
        />
      )}
    </Tag>
  );
}

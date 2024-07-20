/**
 * Internal dependencies
 */
import { merriweather } from '@/components/fonts';
import MobileIcon from '@/components/services/icons/mobile-icon';
import PerformanceIcon from '@/components/services/icons/performance-icon';
import WordPressIcon from '@/components/services/icons/wordpress-icon';

const icons = {
  mobile: <MobileIcon />,
  performance: <PerformanceIcon />,
  wordpress: <WordPressIcon />,
};

export default function Card({
  children,
  title,
  type,
}: {
  children: React.ReactNode;
  title: string;
  type: 'mobile' | 'performance' | 'wordpress';
}) {
  const IconComponent = () => <div className='mb-4'>{icons[type]}</div>;

  return (
    <div
      className={`${merriweather.className} mb-8 flex flex-col items-center gap-4`}
    >
      <div className='text-secondary dark:text-sky-300'>
        <IconComponent />
      </div>

      <h2 className='font-bold'>{title}</h2>

      <div className='w-3/4 px-4'>{children}</div>
    </div>
  );
}

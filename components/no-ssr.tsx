import dynamic from 'next/dynamic';

const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional fallback
});

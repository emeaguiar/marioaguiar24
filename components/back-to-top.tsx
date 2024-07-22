export default function BackToTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className='fixed bottom-0 right-0 z-50 m-4 rounded-lg bg-slate-200 p-4 text-blue-900 shadow-md'
    >
      Back to top
    </button>
  );
}

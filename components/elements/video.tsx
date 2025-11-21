export function Video(props: { children?: React.ReactNode; src: string }) {
  const { children, src } = props;

  return (
    <video
      className='relative mx-auto mt-8 block aspect-video w-full md:max-w-screen-md'
      controls
      src={src}
      muted
    >
      {children}
    </video>
  );
}

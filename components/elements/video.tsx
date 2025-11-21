export function Video(props: any) {
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

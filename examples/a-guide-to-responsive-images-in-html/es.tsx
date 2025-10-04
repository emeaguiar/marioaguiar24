export function SrcsetExample() {
  return (
    <img
      src='https://picsum.photos/400/225'
      srcSet='https://picsum.photos/600/338 600w,
                    https://picsum.photos/800/450 800w'
      sizes='(min-width: 500px) 600px
                (min-width: 740px) 800px'
      alt='Imagen Responsiva'
    />
  );
}

/**
 * Internal dependencies
 */
import { DebounceFunction } from '@/examples/implementing-debounce-in-javascript/interfaces';

export function ExampleOne() {
  return (
    <form className='bg-slate-200 p-8' onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor='search1'
        className='block text-sm font-medium text-gray-700'
      >
        Ingresa una palabra clave
      </label>
      <input
        type='text'
        id='search1'
        name='search1'
        className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </form>
  );
}

export function ExampleTwo() {
  const debounce: DebounceFunction = (callback, delay) => {
    // Guardamos referencia al timer.
    let timer: NodeJS.Timeout;

    return (...args) => {
      // Limpiamos el timer si existe.
      clearTimeout(timer);

      // Creamos un nuevo timer.
      timer = setTimeout(() => {
        // Ejecutamos la función con los argumentos.
        callback(...args);
      }, delay);
    };
  };

  const debounced = debounce((e) => {
    console.log(e.target.value);
  }, 500);

  return (
    <form className='bg-slate-200 p-8' onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor='search1'
        className='block text-sm font-medium text-gray-700'
      >
        Ingresa una palabra clave
      </label>
      <input
        type='text'
        id='search1'
        name='search1'
        className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        onChange={debounced}
      />
    </form>
  );
}

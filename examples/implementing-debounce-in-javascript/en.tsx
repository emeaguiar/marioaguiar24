export function ExampleOne() {
  return (
    <form className='bg-slate-200 p-8' onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor='search1'
        className='block text-sm font-medium text-gray-700'
      >
        Enter a keyword
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
  const debounce = (callback, delay) => {
    // Store a reference to the timer.
    let timer;

    return (...args) => {
      // Clear the timer if it exists.
      clearTimeout(timer);

      // Create a new timer.
      timer = setTimeout(() => {
        // Execute the function with the arguments.
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
        Enter a keyword
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

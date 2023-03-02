function throttle<T = unknown>(callBack: (data: T) => Promise<void>, timeout: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function perform(...args: [T]) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      callBack(...args);
      clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
}

export default throttle;

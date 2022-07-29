export function sleep(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function debounce(callback: (...args: any) => any, delay: number) {
  let timer: any = null;

  return (...args: any) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(callback(...args))
      }, delay);
    });
  };
}

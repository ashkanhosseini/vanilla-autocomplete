export default function debounce(fn, timeout) {
  let timeoutId;
  return (...args) => {
    console.log("deboune stareted");
    if (timeoutId) {
      console.log("timeout cleared");
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      console.log("executed");
      fn(...args);
    }, timeout);
  };
}

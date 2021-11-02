export function on(event, callback) {
  document.addEventListener(event, (e) => callback(e.detail));
}

export function dispatch(event, data) {
  document.dispatchEvent(new CustomEvent(event, { detail: data }));
}

export function remove(event, callback) {
  document.removeEventListener(event, callback);
}

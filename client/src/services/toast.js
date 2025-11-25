// Small service wrapper so non-react modules can trigger toasts.
let _fn = null;

export function registerToast(fn) {
  _fn = fn;
}

function _call(type, message, duration = 4000) {
  if (typeof _fn === "function") {
    _fn({ type, message, duration });
  } else {
    // Fallback to alert if provider isn't mounted yet
    if (type === "error") {
      alert("Error: " + message);
    } else {
      alert(message);
    }
  }
}

export function success(message, duration) {
  _call("success", message, duration);
}

export function error(message, duration) {
  _call("error", message, duration);
}

export function info(message, duration) {
  _call("info", message, duration);
}

export default { registerToast, success, error, info };

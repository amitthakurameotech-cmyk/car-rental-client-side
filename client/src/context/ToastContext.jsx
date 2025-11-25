import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { registerToast } from "../services/toast";

const ToastContext = createContext(null);

let idCounter = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(({ type = "info", message = "", duration = 4000 }) => {
    const id = idCounter++;
    setToasts((t) => [{ id, type, message }, ...t]);
    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
    return id;
  }, [remove]);

  // register global helper so non-hook modules can call toasts
  useEffect(() => {
    registerToast(show);
    return () => registerToast(null);
  }, [show]);

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}

      {/* Toast container (top-right) */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-md w-full px-5 py-4 rounded-lg shadow-lg border transform transition-all duration-150 ease-in-out ${
              t.type === "success"
                ? "bg-green-50 border-green-200 text-green-900"
                : t.type === "error"
                ? "bg-red-50 border-red-200 text-red-900"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 text-base font-semibold">{t.message}</div>
              <button
                aria-label="close"
                onClick={() => remove(t.id)}
                className="text-sm opacity-80 hover:opacity-100 ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastContext;

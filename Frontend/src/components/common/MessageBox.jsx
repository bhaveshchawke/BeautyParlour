import { useEffect, useState } from "react";
import { useMessage } from "../../hooks/useMessage";

export const MessageBox = () => {
  const { messageData } = useMessage();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth transition control
  useEffect(() => {
    if (messageData.text) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [messageData.text]);

  if (!messageData.text && !isVisible) return null;

  const isError = messageData.type === "error";

  return (
    <div
      className={`fixed top-8 right-8 z-[9999] flex items-center gap-3.5 px-5 py-3.5 bg-white/80 backdrop-blur-lg border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl transform transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        isVisible && messageData.text
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-12 opacity-0 scale-95"
      }`}
    >
      {/* Premium Solid Icon Box */}
      <div
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
          isError ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
        }`}
      >
        {isError ? (
          /* Solid Error Icon */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          /* Solid Success Icon */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Message Text */}
      <p className="text-sm font-medium text-gray-700 leading-snug tracking-wide">
        {messageData.text}
      </p>
    </div>
  );
};

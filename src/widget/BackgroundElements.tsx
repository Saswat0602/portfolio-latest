import React from "react";

const BackgroundElements = React.memo(() => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="floating-blob absolute top-1/4 -left-20 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change"
          data-speed="0.05"
        ></div>
        <div
          className="floating-blob absolute top-3/4 -right-20 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change"
          style={{ animationDelay: '2s' }}
          data-speed="0.08"
        ></div>
        <div
          className="floating-blob absolute top-1/2 left-1/3 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change"
          style={{ animationDelay: '4s' }}
          data-speed="0.06"
        ></div>
      </div>
    </>
  );
});
export default BackgroundElements
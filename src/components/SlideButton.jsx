import { memo } from "react";

const SlideButton = ({ direction, onClick }) => {
  const isLeft = direction === "left";
  return (
    <div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-8 md:w-12 lg:w-15 xl:w-19`}
    >
      <div
        className={`
          pointer-events-none
          absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} 
          w-8 md:w-12 lg:w-15 xl:w-19
          bg-neutral-900/60 z-10
        `}
      />
      <button
        type="button"
        onClick={onClick}
        className={`
          group/button
          flex items-center justify-center
          absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} 
          w-8 md:w-12 lg:w-15 xl:w-19
          opacity-0 group-hover:opacity-100
          hover:bg-black/50
          transition-opacity duration-200
          rounded-md cursor-pointer
          z-20
        `}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="
            w-8 h-14
            transition-transform
            duration-200
            group-hover/button:scale-125
            md:w-12 lg:w-15 xl:w-19
          "
        >
          {isLeft ? (
            <path d="M30 10 L18 24 L30 38" />
          ) : (
            <path d="M18 10 L30 24 L18 38" />
          )}
        </svg>
      </button>
    </div>
  );
};

export default memo(SlideButton);

export function TulipOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold/40 sm:w-24" />
      <svg
        width="30"
        height="34"
        viewBox="0 0 32 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-rosegold/75"
      >
        {/* Center tulip petal */}
        <path
          d="M16 4C13.2 8.2 12.6 14 16 18.5C19.4 14 18.8 8.2 16 4Z"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Left outer tulip cup */}
        <path
          d="M16 18.5C11.2 18.2 8.5 14 9.5 7.5C11.8 8.5 13.6 10.6 14.3 13"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right outer tulip cup */}
        <path
          d="M16 18.5C20.8 18.2 23.5 14 22.5 7.5C20.2 8.5 18.4 10.6 17.7 13"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stem & sweeping tulip leaves */}
        <path
          d="M16 18.5V33"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <path
          d="M16 30C12.5 28.5 9.5 25 9 20.5C11.8 22 14.3 25 16 28.5"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 31C19.5 29.5 22.5 26 23 21.5C20.2 23 17.7 26 16 29.5"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold/40 sm:w-24" />
    </div>
  );
}

export function TulipSilhouette({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 4C13.2 8.2 12.6 14 16 18.5C19.4 14 18.8 8.2 16 4Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M16 18.5C11.2 18.2 8.5 14 9.5 7.5C11.8 8.5 13.6 10.6 14.3 13"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M16 18.5C20.8 18.2 23.5 14 22.5 7.5C20.2 8.5 18.4 10.6 17.7 13"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M16 18.5V33M16 29.5C12.2 27.8 9.6 24.4 9.2 20.5M16 30.5C19.8 28.8 22.4 25.4 22.8 21.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StartScreen({ onStart }) {
  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <button
        onClick={onStart}
        className="
          w-16 h-16
          rounded-full
          bg-gray-900
          border-4 border-gray-700
          text-white
          flex justify-center items-center
          shadow-lg
          hover:bg-gray-800 hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
          opacity-0
          animate-fade-in
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
    </div>
  );
}
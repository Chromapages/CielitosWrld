export default function Loading() {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0f110c] text-[#f8f3e9]">
      <div className="relative flex w-full max-w-sm flex-col items-center px-6">
        <svg
          width="96"
          height="96"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
          aria-hidden
        >
          <path
            d="M90 25C80 15 62 12 47 20C26 31 20 58 31 79C42 100 70 108 92 97"
            stroke="#E08A5C"
            strokeWidth="7"
            strokeLinecap="round"
            className="animate-[drawC_1.6s_ease-in-out_infinite]"
            style={{ strokeDasharray: 220, strokeDashoffset: 220 }}
          />
        </svg>

        <p className="font-display text-xl tracking-wide">Cielitos Wrld</p>

        <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/3 animate-[loadingBar_1.2s_ease-in-out_infinite] bg-[#E08A5C]" />
        </div>
      </div>
    </div>
  );
}

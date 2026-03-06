export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-600 font-body">
        Scroll
      </span>
      <div className="w-px h-12 relative overflow-hidden">
        <div className="w-full h-full bg-gray-400 dark:bg-gray-600 animate-scroll-line" />
      </div>
    </div>
  )
}

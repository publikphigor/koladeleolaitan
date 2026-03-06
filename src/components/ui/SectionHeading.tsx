interface SectionHeadingProps {
  children: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ children, subtitle, align = 'left', className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white leading-none">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-500 font-body max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonBaseProps = {
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type ButtonAsAnchor = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const baseClasses = 'font-display uppercase tracking-widest transition-all duration-300 inline-block text-center'
  const variantClasses = variant === 'primary'
    ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80'
    : 'border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`

  if (props.as === 'a') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _, ...anchorProps } = props as ButtonAsAnchor
    return <a className={classes} {...anchorProps}>{children}</a>
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _, ...buttonProps } = props as ButtonAsButton
  return <button className={classes} {...buttonProps}>{children}</button>
}

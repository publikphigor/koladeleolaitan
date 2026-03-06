const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/publikphigor/' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/koladeleolaitan/' },
  { label: 'Twitter', url: 'https://twitter.com/publikphigor' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-gray-600 dark:text-gray-500 font-body">
          &copy; 2022 &mdash; {year} Koladele Olaitan. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

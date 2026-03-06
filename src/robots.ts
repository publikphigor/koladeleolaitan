export const robotsMeta = {
  index: true,
  follow: true,
  'max-image-preview': 'large' as const,
  'max-snippet': -1,
  'max-video-preview': -1,
}

export function getRobotsContent(): string {
  return Object.entries(robotsMeta)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : `no${key}`
      }
      return `${key}:${value}`
    })
    .join(', ')
}

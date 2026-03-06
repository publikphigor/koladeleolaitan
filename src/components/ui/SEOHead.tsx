import { Helmet } from 'react-helmet-async'
import { getRobotsContent } from '../../robots'

interface SEOHeadProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SEOHead({ title, description, canonical, ogImage, schema }: SEOHeadProps) {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={getRobotsContent()} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:creator" content="@publikphigor" />

      {/* JSON-LD Structured Data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}

import SEOHead from '../components/ui/SEOHead'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/layout/PageTransition'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import { seoData, personSchema, websiteSchema } from '../data/seo'

export default function Home() {
  return (
    <>
      <SEOHead
        title={seoData.home.title}
        description={seoData.home.description}
        canonical={seoData.home.canonical}
        ogImage={seoData.home.ogImage}
        schema={[personSchema, websiteSchema]}
      />
      <Header />
      <PageTransition>
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}

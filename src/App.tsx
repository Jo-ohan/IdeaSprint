import { useState } from 'react'
import type { DomainKey } from './config'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import IdeaSpark from './components/IdeaSpark'
import Registration from './components/Registration'
import Footer from './components/Footer'

export default function App() {
  const [presetDomain, setPresetDomain] = useState<DomainKey | ''>('')
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Schedule />
        <IdeaSpark onUse={setPresetDomain} />
        <Registration presetDomain={presetDomain} />
      </main>
      <Footer />
    </>
  )
}

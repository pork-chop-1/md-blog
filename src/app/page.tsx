
import Link from 'next/link'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import Main from '@/layout/Main'

export default function Home() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      {/* <main>
        <Link href={'/feature-test'}>feature test</Link>
      </main> */}
      <Footer />
    </>
  )
}

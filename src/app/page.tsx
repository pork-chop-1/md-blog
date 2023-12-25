
import Link from 'next/link'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import Main from '@/layout/Main'
import ButtonsSide from '@/components/buttons-side'

export default function Home() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <ButtonsSide />
      <Footer />
    </>
  )
}

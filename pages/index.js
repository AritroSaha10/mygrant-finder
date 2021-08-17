import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Navbar'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>MyGrant | Finder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Header />
    </div>
  )
}

import Head from 'next/head'

import Card from "../components/Card"

import Header from '../components/Navbar'
import Footer from "../components/Footer"

type Grant = {
  name: String,
  shortDescription: String,
  longDescription: String,
  dateCreated: Number,
  imgSrc: String
}

const Grants: Grant[] = [
  {
    name: "Cool Grant",
    shortDescription: "It's cool",
    longDescription: "blah blah blah",
    dateCreated: 1629171140,
    imgSrc: "/images/logo.png"
  }
];

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>MyGrant | Finder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

      <div className="flex flex-col gap-4 p-10 min-h-screen min-w-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-black font-bold text-center">Grant Search</h1>
          <p className="text-md text-gray-600 text-center">Search through a large choice of grants using our tools!</p>
        </div>

        <div className="flex self-center items-end gap-2 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col gap-1 flex-grow">
            <label htmlFor="search">
              <p className="text-sm text-gray-500 font-semibold">
                Your keywords
              </p>
            </label>

            <input
              className="bg-gray-200 appearance-none outline-none px-4 py-1 rounded focus:ring focus:bg-gray-300 duration-75 w-full"
              type="text"
              placeholder="Ex. covid"
              id="search"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-bold">
            Search
          </button>
        </div>

        <div className="p-4 mb-4">
          {Grants.map(({ name, shortDescription, imgSrc, dateCreated }, idx) => (
            <Card title={name} image={imgSrc} subtitle={shortDescription} dateCreated={dateCreated} href="/" key={idx} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

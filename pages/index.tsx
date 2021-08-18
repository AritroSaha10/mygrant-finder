import Head from 'next/head'
import { GetStaticProps } from 'next';
import React, { useState } from "react"

import Card from "../components/Card"
import Header from '../components/Navbar'
import Footer from "../components/Footer"

import getAllGrants from "../util/getAllGrants";
import getGrantInfo from "../util/getGrantInfo";

type Grant = {
  name: String,
  shortDescription: String,
  longDescription: String,
  keywords: String[],
  dateCreated: String,
  img: String,
  objectID: String
}


export const getStaticProps: GetStaticProps = async (context) => {
  const grantsIDs = await getAllGrants();
  const allGrantsInfo: Grant[] = await Promise.all(grantsIDs.map(
    async (id) => ({
      ...(await getGrantInfo(`${id}.json`)),
      objectID: id
    })
  ));

  return {
    props: {
      grants: allGrantsInfo
    }
  }
}


export default function Home({ grants }) {
  const [search, setSearch] = useState("");
  const grantsFiltered: Grant[] = grants.filter(
    ({ name }) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="bg-gray-50">
      <Head>
        <title>MyGrant | Finder</title>
        <meta name="description" content="Search through a large choice of grants using the MyGrant Finder!" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="MyGrant | Finder" />
        <meta property="og:description" content="Search through a large choice of grants using the MyGrant Finder!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="287" />
        <meta property="og:image:height" content="91" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="MyGrant | Finder" />
        <meta property="twitter:description" content="Search through a large choice of grants using the MyGrant Finder!" />
        <meta property="twitter:image:src" content="/images/logo.png" />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/*
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-bold">
            Search
          </button>
          */}
        </div>

        <div className="p-4 mb-4">
          { /* Shows cards */}
          {grantsFiltered.map(({ name, shortDescription, img, dateCreated }, idx) => (
            <Card title={name} image={img} subtitle={shortDescription} dateCreated={dateCreated} href="/" key={idx} />
          ))}

          {/* Fallback if no search results */}
          {!grantsFiltered.length &&
            <div>
              <h1 className="text-2xl font-bold text-center mt-4">No search results found</h1>
              <p className="text-lg text-center my-2">Try adjusting your search to find what you&apos;re looking for.</p>
            </div>
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}

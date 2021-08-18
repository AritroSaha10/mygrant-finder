import Head from 'next/head'
import { GetStaticProps } from 'next';
import React, { useState } from "react"

import Card from "../components/Card"
import Header from '../components/Navbar'
import Footer from "../components/Footer"

import getAllGrants from "../util/getAllGrants";
import getGrantInfo from "../util/getGrantInfo";

import SearchArea from "../components/Search";

type Grant = {
  name: String,
  shortDescription: String,
  longDescription: String,
  keywords: String[],
  dateCreated: String,
  img: String,
  objectID: String
}

export default function Home() {
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

        <SearchArea />
      </div>

      <hr />

      <Footer />
    </div>
  )
}

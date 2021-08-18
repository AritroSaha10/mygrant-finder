import Head from 'next/head'
import { GetStaticProps } from 'next';
import React, { useState } from "react"

import Card from "../components/Card"
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"

import getAllGrants from "../util/getAllGrants";
import getGrantInfo from "../util/getGrantInfo";

import SearchArea from "../components/Search";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout name="">
      <div className="flex flex-col gap-4 p-10 min-h-screen min-w-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-black font-bold text-center">Grant Search</h1>
          <p className="text-md text-gray-600 text-center">Search through a large choice of grants using our tools!</p>
        </div>

        <SearchArea />
      </div>
    </Layout>
  )
}

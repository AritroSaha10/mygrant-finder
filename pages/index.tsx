import Head from 'next/head'
import { GetStaticProps } from 'next';
import React, { useRef, useState } from "react"

import Card from "../components/Card"
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"

import getAllGrants from "../util/getAllGrants";
import getGrantInfo from "../util/getGrantInfo";

import SearchArea from "../components/Search";

import Layout from "../components/Layout";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Home() {
  // const name = useRef<HTMLInputElement>();
  // const email = useRef<HTMLInputElement>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email
    };

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-info", ...data })
      });
    } catch (e) {
      console.log(e);
    }

    setSubmitted(true);
  }

  return (
    <Layout name="Finder">
      {submitted ? (
        <div className="flex flex-col gap-4 p-10 flex-grow min-w-screen">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-black font-bold text-center">Grant Search</h1>
            <p className="text-md text-gray-600 text-center">Search through a large choice of grants using our tools!</p>
          </div>

          <SearchArea />
        </div>
      )
        :
        <div className="flex flex-col flex-grow justify-center items-center gap-4 p-10 min-w-screen">
          <h1 className="text-3xl font-bold">MyGrant Finder</h1>
          <p className="text-md text-gray-500">Submit your contact information to gain access to our grant finder!</p>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="fullName">
                  <span className="text-md text-gray-500">
                    Full Name <span className="text-red-500"> *</span>
                  </span>
                </label>

                <input
                  type="text"
                  id="fullName"
                  className="bg-gray-200 appearance-none outline-none px-4 py-1 rounded focus:ring focus:bg-gray-300 duration-75 w-full"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email">
                  <span className="text-md text-gray-500">
                    Email <span className="text-red-500"> *</span>
                  </span>
                </label>

                <input
                  type="text"
                  id="email"
                  className="bg-gray-200 appearance-none outline-none px-4 py-1 rounded focus:ring focus:bg-gray-300 duration-75 w-full"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 px-2 py-4 rounded-lg text-white font-semibold duration-150"
            >
              Submit
            </button>
          </form>
        </div>
      }
    </Layout>
  )
}

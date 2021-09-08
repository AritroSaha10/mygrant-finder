import React, { useState } from "react"

import SearchArea from "../components/Search";

import Layout from "../components/Layout";
import { useEffect } from "react";
import MainSkeletonPage from "../components/MainSkeletonPage";

import { useCookies } from "react-cookie";

const encode = (data: Object) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['submitted-contact-info']);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email
    };

    try {
      await fetch("/api/addContactInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.log(e);
    }

    setSubmitted(true);
    setCookie("submitted-contact-info", true);
  }

  useEffect(() => {
    (async () => {
      // Only run API check if no cookies
      if (cookies["submitted-contact-info"] !== "true") {
        // Check with API and set data to this
        const res = await fetch("/api/checkWhitelist");
        const data = await res.json();

        setSubmitted(data.onWhitelist);

        // Wait for a tiny bit to remove the blinking effect
        setTimeout(() => setLoaded(true), 250);
      } else {
        setSubmitted(true);
        setLoaded(true);
      }
    })();
  }, [cookies]);

  return (
    <Layout name="Finder">
      {loaded ?

        (submitted ? (
          // Data loaded + user is on whitelist
          <div className="flex flex-col gap-4 p-10 flex-grow min-w-screen">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl text-black font-bold text-center">Grant Search</h1>
              <p className="text-md text-gray-600 text-center">Search through a large choice of grants using our tools!</p>
            </div>

            <SearchArea />
          </div>
        )
          : (
            // Data loaded, but user has not added contact information, show contact form
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
                      type="email"
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
          ))

        :
        // Whitelist state not fetched yet
        (
          <MainSkeletonPage />
        )
      }
    </Layout>
  )
}
 
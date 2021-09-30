import React, { useState } from "react"

import SearchArea from "../components/Search";

import Layout from "../components/Layout";
import { useEffect } from "react";
import MainSkeletonPage from "../components/MainSkeletonPage";

import { useCookies } from "react-cookie";
import axios from "axios";

const employeesQuestionsOptions = [
  "1-3",
  "4-19",
  "19-100",
  "100+"
];

const businessSectorOptions = [
  "Agriculture",
  "Entertainment",
  "Financial",
  "Technology",
  "Retail",
  "Hospitality",
  "Other"
];

const businessFundingOptions = [
  "Expansion",
  "COVID-19 Recovery",
  "Research and Development",
  "Employment",
  "Startup Capital",
  "Marketing",
  "Other"
];

const businessLocationOptions = [
  "Region (City)",
  "Province (Province/Territory)",
  "Nation (All of Canada)"
];

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [businessEmployeeCount, setBusinessEmployeeCount] = useState(null);
  const [businessSector, setBusinessSector] = useState(null);
  const [businessFunding, setBusinessFunding] = useState(null);
  const [businessLocation, setBusinessLocation] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [formState, setFormState] = useState(1);

  const [cookies, setCookie] = useCookies(['submitted-contact-info']);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Increment by 1 to move to next page

    setFormState(formState + 1);
    // Only completely submit after done 
    if (formState > 4) {
      const data = {
        name,
        email,
        businessEmployeeCount,
        businessSector,
        businessFunding,
        businessLocation
      };

      try {
        await axios.post("/api/addContactInfo", data);
      } catch (e) {
        console.log(e);
      }

      setSubmitted(true);
      setCookie("submitted-contact-info", true);
    }
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
              <p className="text-md text-gray-500">
                {formState === 1 &&
                  <>
                    Submit your contact information to gain access to our grant finder!
                  </>
                }

                {formState !== 1 &&
                  <>
                    Fill out this quick quiz to access our grant finder!
                  </>
                }
              </p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-1/4">
                {formState === 1 &&
                  <div className="flex flex-col lg:flex-row gap-4 self-center">
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
                }

                {formState === 2 &&
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-xl font-semibold text-left">My business has...</h2>

                    {employeesQuestionsOptions.map(option => (
                      <div key={option}>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" onChange={() => setBusinessEmployeeCount(option)} checked={businessEmployeeCount === option} />
                          <span className="ml-2 text-gray-600">{option} employees</span>
                        </label>
                      </div>
                    ))}
                  </div>
                }

                {formState === 3 &&
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-xl font-semibold text-left">My business operates in the...</h2>

                    {businessSectorOptions.map(option => (
                      <div key={option}>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" onChange={() => setBusinessSector(option)} checked={businessSector === option} />
                          <span className="ml-2 text-gray-600">{option} sector</span>
                        </label>
                      </div>
                    ))}
                  </div>
                }

                {formState === 4 &&
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-xl font-semibold text-left">My business needs funding for...</h2>

                    {businessFundingOptions.map(option => (
                      <div key={option}>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" onChange={() => setBusinessFunding(option)} checked={businessFunding === option} />
                          <span className="ml-2 text-gray-600">{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                }

                {formState === 5 &&
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-xl font-semibold text-left">My business operates within a...</h2>

                    {businessLocationOptions.map(option => (
                      <div key={option}>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" onChange={() => setBusinessLocation(option)} checked={businessLocation === option} />
                          <span className="ml-2 text-gray-600">{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                }

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 px-2 py-4 rounded-lg text-white font-semibold duration-150"
                >
                  Continue
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

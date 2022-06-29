import Head from "next/head";
import Image from "next/image";
import client from "../apollo-client";
import { getJobs } from "../graphql/queries";
import ReactCountryFlag from "react-country-flag";
import Avatar from "react-avatar";
import {SearchJob, filterJobs} from "../components/SearchJob";
import { useState } from 'react';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getJobs,
  });

  return {
    props: {
      jobsData: data.jobs,
    },
  };
}

export default function Home({ jobsData }) {
  
  const [jobs,setJobs] = useState(jobsData);
  const handleOnSearch = location => {
		const filteredJobs = location ? filterJobs(jobsData, location) : jobsData;
		setJobs(filteredJobs);
	};

  return (
    <div className="bg-slate-100 min-h-screen">
      <Head>
        <title>Get your dream jobs!</title>
        <meta
          name="description"
          content="Get your dream jobs from graphqljobs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" max-w-7xl mx-auto py-8 md:px-8">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Get your dream Jobs!
        </h1>
        <SearchJob handleOnSearch={handleOnSearch} />
        <div className="grid grid-cols-6 md:gap-6 mt-8 py-2">
          {jobs.length > 0 ? jobs.map((job) => (
            <div
              key={job.id}
              className="col-span-6 md:col-span-3 lg:col-span-2 px-6 md:px-4 py-4 rounded-lg bg-white relative"
            >
              {job.isFeatured ? (
                <span className="text-xs text-blue-400 font-semibold block mb-3 animate-pulse">
                  FEATURED
                </span>
              ) : (
                ""
              )}
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex justify-start">
                  <Avatar
                    src={job.company.logoUrl}
                    name={job.company.name}
                    size="42"
                    className="rounded-lg mr-3"
                  />
                  <div>
                    <h4 className="font-medium md:font-semibold -mt-1">
                      {job.title}
                    </h4>
                    <h5 className="text-gray-500">
                      {job.company.name}
                    </h5>
                    <div className="text-sm font-light text-gray-600 mt-2">
                      {job.cities.length > 0
                        ? job.cities.map((city, i) => (
                            <span key={city.id}>
                              {i ? ", " : ""}
                              <ReactCountryFlag
                                countryCode={city.country.isoCode}
                              />{" "}
                              {city.name}
                            </span>
                          ))
                        : ""}
                      {job.cities.length > 0 && job.remotes.length > 0 ? (
                        <span className="italic">, Remote</span>
                      ) : job.remotes.length > 0 ? (
                        <span className="italic">Remote</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )): <div className=" col-span-6 mx-auto text-xl font-light px-6 md:px-8 text-center">Sorry, there is no job in this location.<br /> Try finding other places.</div>}
        </div>
      </main>

      <footer className="text-center pb-8">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

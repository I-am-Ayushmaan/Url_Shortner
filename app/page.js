'use client';

import Head from 'next/head'
import Header from './header'
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";


const Home = () => {
  const [data,setData] = useState([]);
  const [newUrl,setNewUrl] = useState("");
  const [isLoading, setIsLoading]= useState(false);


  //call  api on load
  useEffect(()=>{
    setIsLoading(true);
    fetch("../api/url")
    .then(res=>res.json())
    .then(data=>{
      setData(data);
      setIsLoading(false);
    })
  },[]);

  // on submit form call post api
  const handleOnSubmit= async (e)=>{
    e.preventDefault();
    const _newUrl  = newUrl;
    console.log(newUrl);
    setNewUrl("");

    const response = await fetch("../api/url", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({url: _newUrl}),
    });

    const content  = await response.json();
    if(content){
      // add new above all prev. ones
      setData([content, ...data]);
    }

  };

  return (
    <>
      <Head>
        <title>url_shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
    <main className="">
      <Header/>

      <div className=" dark:text-gray-100 dark:bg-slate-800 duration-100 mb-8"> 

        <div className="flex items-center justify-center bg-white">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-4xl font-bold mb-10 text-blue-600">URL Shortener</h2>
            <form  onSubmit={handleOnSubmit} className="mb-6">
              <input type="text" placeholder="Enter long URL here..." value={newUrl} onChange={(e)=>setNewUrl(e.target.value)} 
              className=" md:text-2xl text-black border border-gray-300 rounded-md 
              px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="submit" className="ml-8 bg-blue-500 text-white rounded-md px-6 py-4 hover:bg-blue-600">Shorten URL</button>
            </form>
          </div>
        </div>

      </div>  



        <div className="flex min-w-full justify-center ">
        
            <div className="overflow-hidden md:min-w-[90%] flex justify-center py-2 sm:px-6 lg:px-8 ">
            

                <table className=" text-left font-light md:min-w-[85%]  ">
                  <thead className="border-4 font-medium text-2xl dark:border-neutral-300 ">
                    <tr className="">
                      <th scope="col" className="px-6 py-4">Long-Url</th>
                      <th scope="col" className="px-6 py-4">Short-Url</th>
                      <th scope="col" className="px-6 py-4">Clicked</th>
                    </tr>
                  </thead>

                  <tbody className="md:text-2xl">
                    {data.map((urlObject) => (
                      <React.Fragment key={urlObject.code}>
                        <tr>
                          <td className="p-4">
                            <a href={urlObject.url} className="break-all">
                              {urlObject.url.slice(0, 60)}
                              {urlObject.url.length > 60 ? "..." : ""}
                            </a>
                          </td>
                          <td className="p-4">
                            <a
                              target="_blank"
                              href={`../api/${urlObject.code}`}
                              className="break-all"
                            >
                              {urlObject.code}
                            </a>
                          </td>
                          <td className="p-4">{urlObject.clicked}</td>
                        </tr>
                        <tr className="spacer">
                          <td colSpan="100"></td>
                        </tr>
                      </React.Fragment>
                    ))};
              </tbody>
            </table>

          </div>
      </div>

    </main>
    </>
  );
};


export default dynamic (() => Promise.resolve(Home), {ssr: false})

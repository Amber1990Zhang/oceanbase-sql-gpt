import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { AnimatePresence, motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState("");
  const [description, setDescription] = useState("");
  const [sql, setSqls] = useState<String>("");

  // console.log("Streamed response: ", sql);

  const prompt =
   `Generate OceanBase SQL with comments based on provided schema and description.
   For OceanBase SQL Requirements:

   1. To use multiple line comments in your SQL, start with '#' . Any text between  '#' will be ignored (will not be executed).
   2. DO NOT use SQL "SELECT ... FOR SHARE ..." syntax.
   3. DO NOT use SQL "SHOW WARNINGS" syntax.
   

   Input example:
   ---
   Schema:
   table: Users (UserID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL).

   Description:
   Get 5 users whose first name contains 'Amber', case-insensitive.

   SQL example:
   # Get 5 users whose first name contains 'Amber', case-insensitive. 
   SELECT * 
   FROM Users 
   WHERE LOWER(FirstName) LIKE '%amber%';
   ---

   Schema:
   ${schema}
   Description:
   ${description}
   Query:`;
  
  const composeQuery = async (e: any) => {
    e.preventDefault();
    setSqls("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Required SQL returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setSqls((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>OceanBase SQL generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Amber1990Zhang/oceanbase-sql-gpt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Generate Your OceanBase SQL With Chat-GPT
        </h1>
        {/* <p className="text-slate-500 mt-5">10,312 queries generated so far.</p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Provide your schema here
              {/* <span className="text-slate-500">
                (or drop your DDL queries)
              </span> */}
              .
            </p>
          </div>
          <textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. table: Users (UserID INT PRIMARY KEY AUTO_INCREMENT,FirstName VARCHAR(50) NOT NULL,LastName VARCHAR(50) NOT NULL,Email VARCHAR(100) NOT NULL UNIQUE,Password VARCHAR(255) NOT NULL)."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Describe what you would like to query.</p>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Get 5 users whose first name contains 'Amber', case-insensitive."
            }
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => composeQuery(e)}
            >
              Compose your Oceanbase SQL Query &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {sql && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your Queries
                    </h2>
                  </div>
                  {/* text should be Left aligned */}
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto" style={{ textAlign: "left" }}>
                  {sql
                  .substring(sql.indexOf("1") + 3)
                  .split("2.")
                  .map((sql) => {
                    return (
                      <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(sql);
                        toast("SQL copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={sql}
                    >
                    <p>
                    <SyntaxHighlighter language="sql" >
                      {sql.toString()}
                    </SyntaxHighlighter>
                    </p>
                    </div>
                    );
                  })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

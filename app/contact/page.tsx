"use client";

import React from "react";
import Header from "../_components/header";
import ActualSidebar from "../_components/actualSidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

export default function Index(): JSX.Element {
  const client = new ApolloClient({uri: 'http://localhost:4000', cache: new InMemoryCache()});

    return (
      <ApolloProvider client={client}>
      <SidebarProvider>
        <Header activeNav={4} />
        <div className="flex dark:bg-gray-900">
          <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
            <ContactPage />
          </main>
          <div className="order-1 bg-slate-100">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
      </ApolloProvider>
    );
  }

function ContactPage(): JSX.Element {
  return (
    <div className="p-6 dark:text-white">
      
      <section >
        <div className="flex justify-center">        
          <img className="rounded-full" src="https://opensource.com/sites/default/files/lead-images/fire-pink-flower-maggie-valley.jpg"></img>
        </div>
        <header >
          <h1 className="mb-6 text-5xl font-extrabold dark:text-white">
           About Me
          </h1>
        </header>
        <p>
          Hello! My name is Jason Klamert and I am the creator of RE Scout. 
          I am a software developer by trade and I invest in real estate on the side. 
    
          I got my early investor education through online communities such as BiggerPockets and FinancialSamurai. 
          I am not affiliated with them at all but I still recommend their communities as they are a great place to find like minded people.
          The information that I learned from these communities has allowed me to successfully invest in my local community and bring more starter homes into my local market.
          I wish to build or renovate more starter homes to help raise the low home ownership rates in the upcoming generations. 
        </p>
      </section>
    </div>
  );
}

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
            <DashboardPage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
      </ApolloProvider>
    );
  }

function DashboardPage(): JSX.Element {
  return (
    <div className="p-6">
      <section>
        <header>
          <h1 className="mb-6 text-5xl font-extrabold dark:text-white">
           Dashboard Coming Soon...
          </h1>
        </header>
      </section>
    </div>
  );
}
"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SidebarProvider } from "../context/SidebarContext";
import ActualSidebar from "../_components/actualSidebar";
import Header from "../_components/header";
export default function Index(): JSX.Element {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SidebarProvider>
        <Header activeNav={-1} />
        <div className="flex dark:bg-gray-900">
          <main
            style={{ height: "100%" }}
            className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"
          >
            <MyDealsPage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
    </ApolloProvider>
  );
}

function MyDealsPage(): JSX.Element {
  return <div className="p-6">My deals</div>;
}

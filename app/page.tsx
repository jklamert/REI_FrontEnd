"use client";

import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
  TypedDocumentNode,
} from "@apollo/client";
import fetch from "cross-fetch";
import { SidebarProvider } from "./context/SidebarContext";
import ActualSidebar from "./_components/actualSidebar";
import Header from "./_components/header";

const SEARCH_QUERY: TypedDocumentNode<{
  searchesByUserId: Array<{
    id: string;
    city: string;
    state: string;
    expenseFk: {
      id: number;
      taxes: number;
      insurance: number;
      water: number;
      sewer: number;
      garbage: number;
      electric: number;
      gas: number;
      hoa: number;
      lot: number;
      vacancy: number;
      repairs: number;
      capex: number;
      management: number;
      mortgage: number;
    };
    zip: string;
    user: number;
    beds: number;
    minBath: number;
    maxBath: number;
    type: string;
    props: string;
    key: string;
  }>;
}> = gql`
  query Query($userId: Int!) {
    searchesByUserId(userId: $userId) {
      id
      city
      state
      expenseFk {
        id
        taxes
        insurance
        water
        sewer
        garbage
        electric
        gas
        hoa
        lot
        vacancy
        repairs
        capex
        management
        mortgage
      }
      zip
      user
      beds
      minBath
      maxBath
    }
  }
`;

export default function Index(): JSX.Element {
  const API_URL = "http://localhost:4000";
  const client = new ApolloClient({
    link: new HttpLink({
      uri: API_URL,
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SidebarProvider>
        <Header activeNav={0} />
        <div className="flex dark:bg-gray-900">
          <main
            style={{ height: "100%" }}
            className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"
          >
            <HomePage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
    </ApolloProvider>
  );
}

function HomePage(): JSX.Element {
  return <div>Feed Goes Here</div>;
}

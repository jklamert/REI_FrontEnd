"use client";
import ActualSidebar from "#components/actualSidebar";
import Header from "#components/header";
import { gql, TypedDocumentNode } from "@apollo/client";
// import {getClient} from "#app/context/ApolloClient";
import useBreakpoint from "#app/_hooks/useBreakpoint";
import useWindowWidth from "#app/_hooks/useWindowWidth";
import CardWithActionButton from "#components/cardWithButton";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Button, Table } from "flowbite-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
};

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
  return (
    <div>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main
          className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"
          style={{ height: "100%" }}
        >
          <SearchesPage />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function SearchesPage(): JSX.Element {
  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { userId: 1 },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });

  const windowWidth = useWindowWidth();
  const { isDesktop, isTablet } = useBreakpoint(windowWidth);

  // const router = useRouter();
  if (loading) return <div style={{ height: "100%" }}>Loading...</div>;
  if (error) return <div style={{ height: "100%" }}>{error.message}</div>;

  const searches = data?.searchesByUserId;
  if (searches && searches.length) {
    if (isDesktop || isTablet) {
      return (
        <div style={{ height: "100%" }}>
          <h1 className="font-bold my-4 dark:text-white">My Searches</h1>

          <Table data-testid="searchesTable" striped>
            <Table.Head>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Beds</Table.HeadCell>
              <Table.HeadCell>Min Baths</Table.HeadCell>
              <Table.HeadCell>Max Baths</Table.HeadCell>
              <Table.HeadCell>
                <Button as={Link} href={"mysearches/detail/new"}>
                  Add Search
                </Button>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {searches.map((search) => {
                const { id, city, state, zip, beds, minBath, maxBath } = search;

                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {city}, {state} {zip}
                    </Table.Cell>
                    <Table.Cell>{beds}</Table.Cell>
                    <Table.Cell>{minBath}</Table.Cell>
                    <Table.Cell>{maxBath}</Table.Cell>
                    <Table.Cell>
                      <a
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        href={`/mysearches/detail/${id}`}
                      >
                        <p>Edit</p>
                      </a>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return (
        <div style={{ height: "100%" }}>
          {searches.map((search, index) => {
            const { id, city, state, zip, beds, minBath, maxBath } = search;
            return (
              <CardWithActionButton
                data-testid={`searchCards-${index}`}
                key={id}
                buttonText="View Details"
                header={`${city} ${state}, ${zip}`}
                body={
                  <div>
                    <div>
                      <label>Beds:</label> {beds}
                    </div>
                    <div>
                      <label>Min Baths:</label> {minBath}
                    </div>
                    <div>
                      <label>Max Baths:</label> {maxBath}
                    </div>
                  </div>
                }
                route={`/mysearches/detail/${id}`}
              />
            );
          })}
        </div>
      );
    }
  } else {
    return <div>You have no searches!</div>;
  }
}

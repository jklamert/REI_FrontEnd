"use client";

import CardWithActionButton from "#components/cardWithButton";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ActualSidebar from "../_components/actualSidebar";
import Header from "../_components/header";
// import {getClient} from "#app/context/ApolloClient";

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
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <MySearchesPage />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function MySearchesPage(): JSX.Element {
  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { userId: 1 },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });
  // const router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const searches = data?.searchesByUserId;
  if (searches && searches.length) {
    return (
      <div>
        {searches.map((search) => {
          const {
            id,
            city,
            state,
            zip,
            expenseFk,
            user,
            beds,
            minBath,
            maxBath,
          } = search;
          return (
            <CardWithActionButton
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
  } else {
    return <div>You have no searches!</div>;
  }
}

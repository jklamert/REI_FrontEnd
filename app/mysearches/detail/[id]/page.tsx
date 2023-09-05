"use client";

import ActualSidebar from "#components/actualSidebar";
import Header from "#components/header";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Button, Card, Spinner } from "flowbite-react";
import { HiPencil } from "react-icons/hi";
// import {getClient} from "#app/context/ApolloClient";

const SEARCH_QUERY: TypedDocumentNode<{
  search: {
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
  };
}> = gql`
  query Query($id: Int) {
    search(id: $id) {
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

type searchDetailProps = {
  id: number;
};

export default function Index(props: searchDetailProps): JSX.Element {
  const { id } = props;
  return (
    <div>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <SearchDetailPage id={id} />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

function SearchDetailPage({ id }: searchDetailProps): JSX.Element {
  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { id: 1 },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });
  // const router = useRouter();
  if (loading) return <Spinner aria-label="Loading Search Detail" />;
  if (error) return <div>{error.message}</div>;

  console.debug("data: ", data);
  const searchData = data?.search;
  if (searchData) {
    const { city, state, zip, expenseFk, beds, maxBath, minBath } = searchData;
    const {
      taxes,
      insurance,
      water,
      sewer,
      garbage,
      electric,
      gas,
      hoa,
      lot,
      vacancy,
      repairs,
      capex,
      management,
      mortgage,
    } = expenseFk;
    return (
      <Card className="max-w-sm" href="#">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white grid grid-flow-col auto-cols-max justify-around content-center">
          <span className="shrink-0 self-center">
            {city} {state}, {zip}
          </span>
          <Button>
            <HiPencil className="h-6 w-6" />
          </Button>
        </h5>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Beds: {beds}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Max Baths: {maxBath}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Min Baths: {minBath}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Taxes: ${taxes}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Insurance: ${insurance}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Water: ${water}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Sewer: ${sewer}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Garbage: ${garbage}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Electric: ${electric}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Gas: ${gas}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Hoa: ${hoa}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Lot: ${lot}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Vacancy: ${vacancy}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Repairs: ${repairs}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Capex: ${capex}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Management: ${management}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Mortgage: ${mortgage}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    );
  } else {
    return (
      <div className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        Sorry. We couldn't retrieve your search details... Please try again
        later. If this problem persist, please file a ticket{" "}
        <a
          target={"_blank"}
          referrerPolicy={"no-referrer"}
          href={"https://github.com/jklamert/backend/issues"}
          className={
            "text-sky-600 hover:text-blue-400 underline decoration-sky-600 hover:decoration-blue-400"
          }
        >
          here
        </a>
        .
      </div>
    );
  }
}

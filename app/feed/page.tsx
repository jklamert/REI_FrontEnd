"use client";
import { gql, TypedDocumentNode } from "@apollo/client";
import Header from "../_components/header";
// import {getClient} from "#app/context/ApolloClient";
import ActualSidebar from "#components/actualSidebar";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Error from "next/error";

type User = {
  id: string;
  name: string;
};

type props = {
  errorCode: number;
  errorMessage: string;
  data: User;
};

const GET_USER: TypedDocumentNode<{
  user: User;
}> = gql`
  query Query($userId: Int) {
    user(id: $userId) {
      id
      name
    }
  }
`;

export default function Index(props: props): JSX.Element {
  console.debug("Props: ", props);
  const { errorCode, errorMessage, data } = props;
  if (errorMessage && errorMessage.length) {
    return <Error statusCode={errorCode} title={errorMessage} />;
  }

  return (
    <div>
      <Header activeNav={1} />
      <div className="flex dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <div className="p-6">
            Feed
            <div>{data?.name}</div>
          </div>
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const { data, error } = useQuery(GET_USER, {
    variables: { userId: 1 },
    // if the cache data from SSR is only partial, this will still trigger a network request
    fetchPolicy: "cache-first",
  });

  console.debug("getServerSideProps: ", data);
  const code = error?.networkError?.statusCode || 500;
  const user = data?.user || null;

  // Pass data to the page via props
  return {
    props: {
      errorCode: code,
      errorMessage: error?.message,
      data: JSON.stringify(user),
    },
  };
}

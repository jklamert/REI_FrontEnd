import { SidebarProvider } from "#app/context/SidebarContext";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { render, screen } from "@testing-library/react";
import fetch from "cross-fetch";

describe("Searches Page", () => {
  const API_URL = "http://localhost:4000";
  const client = new ApolloClient({
    link: new HttpLink({
      uri: API_URL,
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });
  xit("renders a heading", async () => {
    const doc = render(
      <ApolloProvider client={client}>
        <SidebarProvider>
          {/* <Header activeNav={0} /> */}
          {/* <div className="flex dark:bg-gray-900"> */}
          {/* <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]"> */}

          {/* </main> */}
          {/* <div className="order-1">
              <ActualSidebar />
            </div> */}
          {/* </div> */}
        </SidebarProvider>
      </ApolloProvider>
    );

    // console.debug("Doc: ", doc.container);

    const el = await screen.getByText("My Searches");
    expect(el).toBeInTheDocument();
    // const cards = screen.getAllByTestId("searchCards-1");

    // const table = screen.getAllByTestId("searchesTable");

    // expect(cards).toBeInTheDocument();
    // expect(table).toBeInTheDocument();
  });
});

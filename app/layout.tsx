import { ApolloWrapper } from "#app/context/ApolloWrapper";
import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import { SidebarProvider } from "./context/SidebarContext";
import "./globals.css";
import Footer from "./_components/footer";

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <ApolloWrapper>
        <html lang="en">
          <body>
            <FlowbiteContext>{children}</FlowbiteContext>

            <Footer />
          </body>
        </html>
      </ApolloWrapper>
    </SidebarProvider>
  );
};

export default RootLayout;

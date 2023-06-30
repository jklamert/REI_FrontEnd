import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";
import Footer from './_components/footer';
import Header from './_components/header';
import Sidebar from "./_components/sidebar";
import { SidebarProvider } from "./context/SidebarContext";

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
           
    <html lang="en">
      <body>
        <FlowbiteContext>{children}</FlowbiteContext>
        <Footer/>
      </body>
    </html>
    </SidebarProvider>
  );
};

export default RootLayout;

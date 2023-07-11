"use client";

import React from "react";
import Header from "../_components/header";
import ActualSidebar from "../_components/actualSidebar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Index(): JSX.Element {
    return (
      <SidebarProvider>
        <Header activeNav={3}/>
        <div className="flex dark:bg-gray-900">
          <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
            <PricingPage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
    );
  }

function PricingPage(): JSX.Element {
  return (
    <div className="p-6 dark:text-white">
    <section>
      <header>
        <h1 className="mb-6 text-5xl font-extrabold dark:text-white">
         Pricing
        </h1>
      </header>
      RE Scout is currently free to use! It serves as one of my portfolio projects and I use it to invest in my local area. 
        If you would like to learn more about me, or how to contact me, please visit the bottom of any page or click on 'Contact' in the top navigation for more information.  
    </section>
  </div>
  );
}

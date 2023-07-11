"use client";

import React from "react";
import Header from "../_components/header";
import ActualSidebar from "../_components/actualSidebar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Index(): JSX.Element {
    return (
      <SidebarProvider>
        <Header activeNav={-1} />
        <div className="flex dark:bg-gray-900">
          <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
            <HelpPage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
    );
  }

function HelpPage(): JSX.Element {
  return (
    <div className="p-6 dark:text-white">
        RE Scout is a tool that provides level one filtering of the MLS deal funnel. 
        You can setup searches with custom parameters that will determine what fits into your buy box. 
        When a property fits your search criteria, it be will presented to you in your feed. 
        Swipe left to reject a deal. Swipe right to accept a deal.
        Accepted deals are retained in the 'My Deals' sections. 
        From there you can determine how you want to follow up on that deal. 
        You can share it with your realtor or business partners, delve in further by going to the site of origin, or even dismiss the deal.
        Multiple searches are supported so you can shop multiple locations at once. 
    </div>
  );
}

"use client";

import React from "react";
import Header from "../_components/header";
import ActualSidebar from "../_components/actualSidebar";
import Sidebar from "./components/sidebar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Index(): JSX.Element {
    return (
      <SidebarProvider>
        <Header />
        <div className="flex dark:bg-gray-900">
          <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
            <HomePage />
          </main>
          <div className="order-1">
            <ActualSidebar />
          </div>
        </div>
      </SidebarProvider>
    );
  }

function HomePage(): JSX.Element {
  return (
    <div className="p-6">
        About
    </div>
  );
}

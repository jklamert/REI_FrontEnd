"use client";

import { SidebarProvider } from "../context/SidebarContext";
import ActualSidebar from "../_components/actualSidebar";
import Header from "../_components/header";

export default function Index(): JSX.Element {
  return (
    <SidebarProvider>
      <Header activeNav={-1} />
      <div className="flex dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <PrivacyPage />
        </main>
        <div className="order-1">
          <ActualSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}

function PrivacyPage(): JSX.Element {
  return <div className="p-6">About</div>;
}

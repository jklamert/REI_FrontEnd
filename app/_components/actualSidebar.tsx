"use client";

import { FC } from "react";
import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import {
  HiChartPie,
  HiDocument,
  HiInbox,
  HiLogin,
  HiLogout,
  HiSearch,
  HiUser,
} from "react-icons/hi";
import Sidebar from "../_components/sidebar";

const ActualSidebar: FC<Record<string, never>> = function () {
    return (
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/mysearches" icon={HiSearch}>
                My Searches
              </Sidebar.Item>
              <Sidebar.Item href="/mydeals" icon={HiInbox}>
                My Deals
              </Sidebar.Item>
              <Sidebar.Item href="/profile" icon={HiUser}>
                My Profile
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiDocument}>
                Documentation
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={BiHelpCircle}>
                Help
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiLogin}>
                Login
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiLogout}>
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      );
};

export default ActualSidebar;

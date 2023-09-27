"use client";

import { FC } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { HiDocument, HiHome, HiPhone, HiSearch, HiUser } from "react-icons/hi";
import Sidebar from "../_components/sidebar";

const ActualSidebar: FC<Record<string, never>> = function () {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiHome}></Sidebar.Item>
          <Sidebar.Item href="/" icon={HiHome} className="mt-2">
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/searches" icon={HiSearch}>
            Searches
          </Sidebar.Item>
          <Sidebar.Item href="/contact" icon={HiPhone}>
            Contact Us
          </Sidebar.Item>
          <Sidebar.Item href="/profile" icon={HiUser}>
            My Profile
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        {/* <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiLogin}>
                Login
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiLogout}>
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup> */}
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/documentation" icon={HiDocument}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="/help" icon={BiHelpCircle}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ActualSidebar;

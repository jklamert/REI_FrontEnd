"use client";
import { Footer } from "flowbite-react";
import { FC } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const FooterExample: FC<Record<string, never>> = function () {
  return (
    <Footer
      container
      className="border divide-y border-gray-200 rounded-none bg-slate-100 dark:border-slate-50/[0.06]"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          {/* <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
            RE Scout
          </span> */}
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/jklamert">
                  Github
                </Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/jason-klamert-5848b594/">
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Jason Klamert" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.linkedin.com/in/jason-klamert-5848b594/"
              icon={BsLinkedin}
            />
            <Footer.Icon href="https://github.com/jklamert" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterExample;

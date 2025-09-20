import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Select, Button } from "antd";
import { RiRobotFill } from "react-icons/ri";
import jobRolesData from "../data/jobRoles.json";
import skillsData from "../data/skills.json";
import { SiGooglegemini } from "react-icons/si";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleAnalyze = () => {
    console.log("Analyzing...");
    console.log("Job Role:", selectedJobRole);
    console.log("Skills:", selectedSkills);
    // Add your analysis logic here
  };

  return (
    <div
      className="isolate bg-gray-900 min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero_bg.png')" }}
    >
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#444444" />
              <stop offset={1} stopColor="#00d5ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1 items-center">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">Skill Bridge</span>
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
              <span className="ml-3 text-xl font-bold text-white">
                Skill Bridge
              </span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">{/* //navs */}</div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel
            focus="true"
            className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">{/* {navs} */}</div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <main>
        <div className="relative py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h4 className="text-3xl font-bold tracking-tight text-white mb-8">
                Bridge Your Skills to Your Dream Job
              </h4>

              {/* Search Bar Section */}
              <div className="bg-gray-800 backdrop-blur-md rounded-3xl p-4 border border-white/20 mt-8 mx-auto max-w-4xl">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Job Role Select */}
                  <div className="flex-none sm:w-1/4">
                    <Select
                      placeholder="Select Job Role"
                      value={selectedJobRole}
                      onChange={setSelectedJobRole}
                      options={jobRolesData}
                      style={{
                        width: "100%",
                        height: "50px",
                      }}
                      size="large"
                      className="custom-select"
                    />
                  </div>

                  {/* Skills Select */}
                  <div className="flex-1">
                    <Select
                      mode="multiple"
                      placeholder="Select Skills"
                      value={selectedSkills}
                      onChange={setSelectedSkills}
                      options={skillsData}
                      style={{
                        width: "100%",
                        minHeight: "50px",
                      }}
                      size="large"
                      className="custom-select"
                      maxTagCount="responsive"
                    />
                  </div>

                  {/* Analyze Button */}
                  <div className="flex-none sm:w-auto">
                    <Button
                      type="primary"
                      size="large"
                      icon={<SiGooglegemini />}
                      onClick={handleAnalyze}
                      style={{
                        width: "100%",
                        height: "50px",
                        background:
                          "linear-gradient(135deg, #9b10ff 0%, #b700ff 100%)",
                        border: "none",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                      className="analyze-button"
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

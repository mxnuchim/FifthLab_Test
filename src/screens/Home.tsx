/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LoadingView from "../components/LoadingView";
import SearchInput from "../components/SearchInput";
import UserTypeSelector from "../components/UserTypeSelector";

import { FaFemale, FaMale, FaUsers } from "react-icons/fa";
import CountrySelector from "../components/CountrySelector";
import ToggleComponent from "../components/Toggle";
import { IUser } from "../types";
import UserList from "../components/UserList";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCloudDownload,
} from "react-icons/io";
import { fetchUsers } from "../services/api";
import { downloadCSV } from "../utils/utils";

const PAGE_SIZE = 3;

function Home() {
  const [loading, setLoading] = useState(false);
  const [userFilter, setUserFilter] = useState("All Users");
  const [userData, setUserData] = useState<IUser[]>([]);
  const [filteredUserData, setFilteredUserData] = useState<IUser[] | null>(
    null
  );
  const [country, setCountry] = useState("");
  const [showCountry, setShowCountry] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log({ currentPage, PAGE_SIZE });
      const response = await fetchUsers({
        page: currentPage,
        limit: PAGE_SIZE,
      });
      console.log("user data response --> ", response?.data);

      if (response?.success) {
        setUserData(response?.data);
        setFilteredUserData(response?.data);
      } else {
        console.log("Something went wrong here --> ", response);
      }
      setLoading(false);
    };

    console.log("current page --> ", currentPage);
    if (currentPage > 0) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    // Function to filter user data based on gender
    const filterUserData = () => {
      if (userFilter.toLowerCase() === "all users") {
        setFilteredUserData(userData); // No filter applied, show all users
      } else {
        const filteredData = userData.filter(
          (user) => user.gender.toLowerCase() === userFilter.toLowerCase()
        );
        setFilteredUserData(filteredData);
      }
    };

    filterUserData();
  }, [userFilter, userData]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (searchTerm: string) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);

    const filteredUsers = userData?.filter(
      (user: IUser) =>
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUserData(filteredUsers);
  };

  const handleSelectCountry = (selectedCountry: string) => {
    console.log(selectedCountry);

    if (selectedCountry === "") {
      setFilteredUserData(userData);
      setCountry("");
      return;
    }
    setCountry(selectedCountry);

    const filteredUsers = userData?.filter(
      (user) => user?.location?.country === selectedCountry
    );

    setFilteredUserData(filteredUsers);
  };

  return (
    <div className="bg-darkBlue min-h-auto xl:min-h-screen overflow-scroll pb-12">
      {loading ? <LoadingView /> : null}

      <div className=" grid grid-cols-1 xl:grid-cols-2 gap-8 pt-[10%] md:pt-12 md:mb-96 lg:mb-0 lg:pt-32 px-0 md:px-0 xl:px-6 ">
        <div className="w-full xl:w-5/6 pt-[40%] md:pt-[25%] lg:pt-[15%] pb-[20%] md:pb-[20%] lg:pb-[5%] px-8 md:px-16 lg:px-[10%]">
          <div>
            <h1 className="text-3xl 2xl:text-5xl text-gray-400 font-thin font-poppins text-left mb-1 2xl:mb-2">
              Hello, <span className="font-bold text-white">Manuchim</span>
            </h1>

            <span className="text-xs lg:text-sm 2xl:text-base text-gray-400 font-thin font-poppins text-left">
              Welcome to your dashboard, kindly sort through the user base
            </span>
          </div>

          <div className="my-3">
            <SearchInput
              value={searchTerm}
              placeholder={"Find a user"}
              onSearch={handleSearch}
            />
          </div>

          <div className="w-full mt-8 lg:mt-16">
            <span className=" text-white text-left font-normal text-sm lg:text-base">
              Show Users
            </span>

            <div className="w-full gap-8 flex flex-col md:flex-row xl:flex-wrap justify-center mt-5">
              <UserTypeSelector
                icon={<FaUsers size={40} color="#fff" />}
                description="All Users"
                className="bg-customPink"
                onClick={() => setUserFilter("All Users")}
              />
              <UserTypeSelector
                icon={<FaMale size={40} color="#fff" />}
                description="Male Users"
                className="bg-customGreen"
                onClick={() => setUserFilter("male")}
              />
              <UserTypeSelector
                icon={<FaFemale size={40} color="#fff" />}
                description="Female Users"
                className="bg-customPurple"
                onClick={() => setUserFilter("female")}
              />
            </div>
          </div>
        </div>

        <div
          className="bg-customLightGray rounded-3xl w-full px-8 pt-8 py-8 md:pt-32"
          id="results"
        >
          <div className="flex flex-col w-full justify-start md:justify-center">
            <h1 className="capitalize text-lg md:text-xl lg:text-2xl text-black text-center lg:text-left font-bold font-poppins">
              {userFilter}
            </h1>
            <span className="text-xs text-center lg:text-left">Filter By</span>
          </div>

          <div className="flex mt-8 gap-6 items-center flex-wrap justify-between w-full">
            <div>
              <SearchInput
                value={searchTerm}
                placeholder={"Find in list"}
                onSearch={handleSearch}
                resultStyle
              />
            </div>

            <div>
              <CountrySelector
                selectedCountry={country}
                onSelectCountry={handleSelectCountry}
              />
            </div>

            <div>
              <ToggleComponent
                label="Show Country"
                checked={showCountry}
                onChange={() => setShowCountry(!showCountry)}
              />
            </div>
          </div>

          <div className="my-16">
            {filteredUserData?.length ? (
              <UserList users={filteredUserData} showCountry={showCountry} />
            ) : (
              <div className="flex w-full h-44 items-center justify-center">
                <p className="font-sm text-gray-400 whitespace-nowrap">
                  No users found
                </p>
              </div>
            )}
          </div>

          <div className="h-5 w-full flex items-center justify-between">
            {/** DOWNLOAD PDF */}
            <div
              onClick={() => downloadCSV(filteredUserData)}
              className="cursor-pointer flex items-center justify-start gap-2 px-6 py-3 w-48 bg-customPurple rounded-full"
            >
              <IoIosCloudDownload size={20} className="text-white" />
              <p className="whitespace-nowrap text-white text-xs text-center lg:text-left font-roboto">
                Download Results
              </p>
            </div>

            {/** PAGINATION BUTTONS */}
            <div className="flex items-center justify-end gap-2">
              <div
                className="cursor-pointer flex items-center justify-end gap-2"
                onClick={prevPage}
              >
                <div className="bg-gray-300 drop-shadow-md h-12 w-16 flex items-center justify-center rounded-xl">
                  <IoIosArrowBack size={20} className="text-black" />
                </div>
              </div>

              <div
                className="cursor-pointer flex items-center justify-end gap-2"
                onClick={nextPage}
              >
                <div className="bg-black drop-shadow-md h-12 w-16 flex items-center justify-center rounded-xl">
                  <IoIosArrowForward size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

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

function Home() {
  const [loading, setLoading] = useState(false);
  const [userFilter, setUserFilter] = useState("All Users");
  const [userData, setUserData] = useState(null);
  const [country, setCountry] = useState("All Users");
  const [showCountry, setShowCountry] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetchUsers({ page: 1, limit: 3 });
      console.log("user data response --> ", response);

      if (response?.success) {
        setUserData(response?.data);
      } else {
        console.log("Something went wrong here --> ", response);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    // Handle search action with the search term
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleSelectCountry = (country: string) => {
    setCountry(country);
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
              />
              <UserTypeSelector
                icon={<FaMale size={40} color="#fff" />}
                description="Male Users"
                className="bg-customGreen"
              />
              <UserTypeSelector
                icon={<FaFemale size={40} color="#fff" />}
                description="Female Users"
                className="bg-customPurple"
              />
            </div>
          </div>
        </div>

        <div className="bg-customLightGray rounded-3xl w-full px-8 pt-8 py-8 md:pt-32">
          <div className="flex flex-col w-full justify-start md:justify-center">
            <h1 className="text-lg md:text-xl lg:text-2xl text-black text-center lg:text-left font-bold font-poppins">
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
            <UserList users={userData} />
          </div>

          <div className="h-5 w-full flex items-center justify-between">
            <div className="flex items-center justify-start gap-2 px-6 py-3 w-48 bg-customPurple rounded-full">
              <IoIosCloudDownload size={20} className="text-white" />
              <p className="whitespace-nowrap text-white text-xs text-center lg:text-left font-roboto">
                Download Results
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <div className="bg-gray-300 drop-shadow-md h-12 w-16 flex items-center justify-center rounded-xl">
                <IoIosArrowBack size={20} className="text-black" />
              </div>

              <div className="bg-black drop-shadow-md h-12 w-16 flex items-center justify-center rounded-xl">
                <IoIosArrowForward size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const users: IUser[] = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Vicente",
      last: "Mendes",
    },
    location: {
      street: {
        number: 1933,
        name: "Rua Amazonas ",
      },
      city: "Teixeira de Freitas",
      state: "Paraíba",
      country: "Brazil",
      postcode: 12480,
      coordinates: {
        latitude: "-79.0943",
        longitude: "-87.4446",
      },
      timezone: {
        offset: "+5:45",
        description: "Kathmandu",
      },
    },
    email: "vicente.mendes@example.com",
    login: {
      uuid: "f9c31e80-d17e-49f1-b531-6d290442dc49",
      username: "brownbird480",
      password: "factory",
      salt: "YdE3J8hE",
      md5: "a27efc6580cce25fe3fcf40a9cc0e36e",
      sha1: "943dc3f6cff10c4856d193392f82f7ff70e649d2",
      sha256:
        "fc4e0fc696f6a606624aee7ef1039ba670f802dc4055105a0ae90ea3c9124c13",
    },
    dob: {
      date: "1992-07-31T11:44:57.731Z",
      age: 31,
    },
    registered: {
      date: "2005-03-05T14:04:50.031Z",
      age: 19,
    },
    phone: "(03) 2188-3594",
    cell: "(35) 9386-0708",
    id: {
      name: "CPF",
      value: "762.800.017-93",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/56.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
    },
    nat: "BR",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Vicente",
      last: "Mendes",
    },
    location: {
      street: {
        number: 1933,
        name: "Rua Amazonas ",
      },
      city: "Teixeira de Freitas",
      state: "Paraíba",
      country: "Brazil",
      postcode: 12480,
      coordinates: {
        latitude: "-79.0943",
        longitude: "-87.4446",
      },
      timezone: {
        offset: "+5:45",
        description: "Kathmandu",
      },
    },
    email: "vicente.mendes@example.com",
    login: {
      uuid: "f9c31e80-d17e-49f1-b531-6d290442dc49",
      username: "brownbird480",
      password: "factory",
      salt: "YdE3J8hE",
      md5: "a27efc6580cce25fe3fcf40a9cc0e36e",
      sha1: "943dc3f6cff10c4856d193392f82f7ff70e649d2",
      sha256:
        "fc4e0fc696f6a606624aee7ef1039ba670f802dc4055105a0ae90ea3c9124c13",
    },
    dob: {
      date: "1992-07-31T11:44:57.731Z",
      age: 31,
    },
    registered: {
      date: "2005-03-05T14:04:50.031Z",
      age: 19,
    },
    phone: "(03) 2188-3594",
    cell: "(35) 9386-0708",
    id: {
      name: "CPF",
      value: "762.800.017-93",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/56.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
    },
    nat: "BR",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Vicente",
      last: "Mendes",
    },
    location: {
      street: {
        number: 1933,
        name: "Rua Amazonas ",
      },
      city: "Teixeira de Freitas",
      state: "Paraíba",
      country: "Brazil",
      postcode: 12480,
      coordinates: {
        latitude: "-79.0943",
        longitude: "-87.4446",
      },
      timezone: {
        offset: "+5:45",
        description: "Kathmandu",
      },
    },
    email: "vicente.mendes@example.com",
    login: {
      uuid: "f9c31e80-d17e-49f1-b531-6d290442dc49",
      username: "brownbird480",
      password: "factory",
      salt: "YdE3J8hE",
      md5: "a27efc6580cce25fe3fcf40a9cc0e36e",
      sha1: "943dc3f6cff10c4856d193392f82f7ff70e649d2",
      sha256:
        "fc4e0fc696f6a606624aee7ef1039ba670f802dc4055105a0ae90ea3c9124c13",
    },
    dob: {
      date: "1992-07-31T11:44:57.731Z",
      age: 31,
    },
    registered: {
      date: "2005-03-05T14:04:50.031Z",
      age: 19,
    },
    phone: "(03) 2188-3594",
    cell: "(35) 9386-0708",
    id: {
      name: "CPF",
      value: "762.800.017-93",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/56.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
    },
    nat: "BR",
  },
];

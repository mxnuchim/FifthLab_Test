import React from "react";
import { IUser } from "../types";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { formatDate } from "../utils/dateFunctions";

interface UserProfileProps {
  user: IUser;
  onBackClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBackClick }) => {
  return (
    <div className="">
      <div
        onClick={onBackClick}
        className="w-full h-10 bg-transparent flex cursor-pointer items-center justify-start gap-2"
      >
        <IoMdArrowBack size={24} className="text-customGreen" />
        <p className="text-sm text-left font-normal">Back to results</p>
      </div>

      <div className=" w-full mt-8 flex flex-col xl:flex-row items-start justify-start gap-12">
        <div className="w-full xl:w-fit flex items-center justify-center xl:justify-start rounded-full">
          <img
            src={user?.picture?.large}
            alt={user?.name?.first}
            className="rounded-full border-[5px] border-customGreen h-44 xl:h-44 w-44 xl:w-52 object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full xl:w-fit">
          <span className="font-bold text-xl xl:text-2xl text-center xl:text-center">
            {`${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`}
            {", "}
            <span className="font-thin">{user?.dob?.age}</span>
          </span>

          <p className="mt-1 text-black font-roboto font-light text-base text-center lg:text-center">{`${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>

          <div className="my-4 w-full flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-start gap-2 px-4 py-1 bg-gray-300 rounded-full">
              <MdOutlineEmail size={24} className="text-gray-400" />
              <p className="text-gray-800 text-sm text-center lg:text-left font-roboto">
                {user?.email}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-start gap-6 px-4 py-2 bg-customLightPink rounded-full">
                <p className="text-gray-800 text-xs text-center lg:text-left font-roboto">
                  Joined: {formatDate(user?.registered?.date)}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2 px-4 py-2 bg-gray-300 rounded-full">
                <FiPhoneCall size={20} className="text-gray-400" />
                <p className="text-gray-800 text-xs text-center lg:text-left font-roboto">
                  {user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

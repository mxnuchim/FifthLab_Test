import React from "react";
import { IUser } from "../types";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";

interface UserListItemProps {
  user: IUser;
  onClick: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onClick }) => {
  return (
    <div
      className="w-full cursor-pointer px-3 py-6 flex flex-col xl:flex-row gap-4 bg-white rounded-lg drop-shadow-xl"
      onClick={onClick}
    >
      <div className="w-full xl:w-fit flex items-center justify-center xl:justify-start">
        <img
          src={user?.picture?.medium}
          alt={user?.name?.first}
          className="rounded-full border-[6px] border-customGreen h-24 w-24 object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        <div className="flex flex-col w-full">
          <span className="font-bold text-xl text-center xl:text-left">{`${user.name.first} ${user.name.last}`}</span>
          <p className="mt-1 italic text-black font-roboto font-thin text-base text-center xl:text-left">{`${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between  gap-4 w-full ">
          <div className="flex items-center justify-start gap-2">
            <MdOutlineEmail size={24} className="text-gray-400" />
            <p className="text-gray-400 text-xs text-center lg:text-left">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FiPhoneCall size={24} className="text-gray-400" />
            <p className="text-gray-400 text-center lg:text-left text-xs">
              {user?.phone}
            </p>
          </div>
          <div className="h-10 w-10 bg-customGreen rounded-lg drop-shadow-md flex items-center justify-center">
            <IoMdArrowForward size={24} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;

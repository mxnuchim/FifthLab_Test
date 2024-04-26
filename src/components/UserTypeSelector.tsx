/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface UserTypeSelectorProps {
  icon: any;
  description: string;
  onClick?: () => void;
  className?: string;
}

const UserTypeSelector = ({
  icon,
  description,
  onClick,
  className,
}: UserTypeSelectorProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div
        className={`${className} mb-3 flex items-center justify-center rounded-[26px] h-24 w-full md:w-32 lg:w-32 xl:w-38 2xl:w-48  drop-shadow-md`}
        onClick={onClick}
      >
        {icon}
      </div>

      <span className="font-thin text-base lg:text-lg text-gray-400 text-center">
        {description}
      </span>
    </div>
  );
};

export default UserTypeSelector;

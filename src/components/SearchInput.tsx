/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  placeholder: string;
  value: string;
  className?: string;
  inputClassName?: string;
  onSearch: (searchTerm: string) => void;
  resultStyle?: boolean;
}

const SearchInput = ({
  placeholder,
  onSearch,
  value,
  resultStyle,
}: SearchInputProps) => {
  const handleSearch = (e: any) => {
    onSearch(e.target.value);
  };

  return (
    <div
      className={`flex items-center py-2 ${
        resultStyle
          ? "bg-gray-200 rounded-full h-12 md:h-16  pl-8 w-64 lg:w-[550px] 2xl:w-80"
          : "bg-gray-300  rounded-xl  px-3"
      }`}
    >
      <FaSearch className="text-gray-600 mr-3" />
      <input
        type="text"
        placeholder={placeholder}
        className={`outline-none  text-base flex-grow text-gray-600 ${
          resultStyle
            ? "bg-gray-200 rounded-full h-10 md:h-16 "
            : "bg-gray-300  rounded-2xl"
        }`}
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;

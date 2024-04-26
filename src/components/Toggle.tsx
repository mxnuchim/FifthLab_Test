import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

interface ToggleComponentProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="flex flex-col flex-wrap gap-3 items-center">
      <Toggle checked={checked} onChange={handleToggle} icons={false} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

export default ToggleComponent;

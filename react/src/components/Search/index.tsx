import { SetStateAction, Dispatch } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";
import "./index.scss";

interface SeachProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const Search = ({ value, onChange }: SeachProps) => {
  const clear = () => {
    onChange("");
  };

  return (
    <div className="search-input">
      <img className="search-icon" src={searchIcon} alt="Search" />
      <input
        type="text"
        placeholder="Search all launches"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <img
        className={`close-icon ${value ? 'visible' : ''}`}
        src={closeIcon}
        onClick={clear}
        alt="Close"
      />
    </div>
  );
};

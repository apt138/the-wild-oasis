import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options = [], type }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type={type}
      onChange={handleChange}
      value={searchParams.get("sortBy") || options.at(0).value}
    />
  );
}

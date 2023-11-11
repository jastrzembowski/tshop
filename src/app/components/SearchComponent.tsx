import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { useState } from "react";
import { setProductParams } from "../../api/catalogSlice";

export default function SearchComponent() {
  const { itemParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState(itemParams.searchString);

  const debouncedSearch = debounce((event) => {
    dispatch(setProductParams({ searchString: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
      sx={{
        width: "392px",
        height: "48px",
        margin: "0px 20px 0px 108px",
        fontSize: "14px",
      }}
    />
  );
}

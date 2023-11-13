import { InputAdornment, TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { useState } from "react";
import { setProductParams } from "../../api/catalogSlice";
import search from "../../assets/search.svg";

export default function SearchComponent() {
  const { itemParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState(itemParams.searchString);

  const debouncedSearch = debounce((event) => {
    dispatch(setProductParams({ searchString: event.target.value }));
  }, 1000);

  return (
    <TextField
      label={searchTerm === "" ? "Search" : ""}
      variant="outlined"
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
      InputLabelProps={{ shrink: false }}
      sx={{
        width: "392px",
        height: "48px",
        margin: "0px 20px 0px 108px",
        fontSize: "14px",
        "& fieldset": {
          borderColor: "#e0e2ea",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <img src={search} alt="search" className="search-icon"></img>
          </InputAdornment>
        ),
      }}
    />
  );
}

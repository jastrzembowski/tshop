import { InputAdornment, SxProps, TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { useState } from "react";
import { setProductParams } from "../../api/catalogSlice";
import search from "../../assets/search.svg";

interface Props{
  sx: SxProps
}

export default function SearchComponent({sx}: Props) {
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
      sx={sx}
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

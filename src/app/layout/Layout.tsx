import {FormGroup } from "@mui/material";
import "./layout.scss";
import SearchComponent from "../components/SearchComponent";
import AppCheckbox from "../components/AppCheckbox";

export default function Layout() {
  return (
    <nav>
      <h1>join.tsh.io</h1>
      <SearchComponent />
      <FormGroup
        sx={{
          flexDirection: "row",
        }}
      >
        <AppCheckbox/>
      </FormGroup>
      <img src="https://picsum.photos/seed/picsum/200/200" alt="avatar"></img>
    </nav>
  );
}

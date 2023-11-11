import { FormGroup } from "@mui/material";
import "./layout.scss";
import SearchComponent from "../components/SearchComponent";
import AppCheckbox from "../components/AppCheckbox";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <nav>
      <Link to="/home">join.tsh.io</Link>
      <SearchComponent />
      <FormGroup
        sx={{
          flexDirection: "row",
        }}
      >
        <AppCheckbox />
      </FormGroup>
      <img src="https://picsum.photos/seed/picsum/200/200" alt="avatar"></img>
    </nav>
  );
}

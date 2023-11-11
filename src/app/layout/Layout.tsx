import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import "./layout.scss";

export default function Layout() {
  return (
    <nav>
      <h1>join.tsh.io</h1>
      <TextField
        label="Search"
        variant="outlined"
        sx={{
          width: "392px",
          height: "48px",
          margin: "0px 20px 0px 108px",
          fontSize: "14px"
        }}
    
      />
      <FormGroup
        sx={{
          flexDirection: "row",
        }}
      >
        <FormControlLabel control={<Checkbox />} label="Active" />
        <FormControlLabel control={<Checkbox />} label="Promo" />
      </FormGroup>
      <img src="https://picsum.photos/seed/picsum/200/200" alt="avatar"></img>
    </nav>
  );
}

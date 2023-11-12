import { Dialog, FormGroup, SxProps } from "@mui/material";
import "./layout.scss";
import SearchComponent from "../components/SearchComponent";
import AppCheckbox from "../components/AppCheckbox";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { useEffect, useState } from "react";
import { fetchCurrentUser, logout } from "../../api/accountSlice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((state) => state.account);

  useEffect(() => {
    user === null && dispatch(fetchCurrentUser());
  }, [dispatch, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  const sx: SxProps = {
    "& .MuiDialog-paper": {
      position: "absolute",
      top: "75px",
      right: "90px",
    },
  };
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
      <img src={user?.avatar} alt="avatar" onClick={handleClickOpen}></img>
      <Dialog open={open} onClose={handleClose} hideBackdrop sx={sx}>
        <div className="logout-dropdown" onClick={handleLogout}>
          <p>Logout</p>
        </div>
      </Dialog>
    </nav>
  );
}

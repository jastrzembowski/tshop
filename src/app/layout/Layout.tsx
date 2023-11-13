import { Dialog, FormGroup, SxProps } from "@mui/material";
import "./layout.scss";
import SearchComponent from "../components/SearchComponent";
import AppCheckbox from "../components/checkbox/AppCheckbox";
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
    dispatch(logout());
  };

  const dialogsx: SxProps = {
    "& .MuiDialog-paper": {
      position: "absolute",
      top: "75px",
      right: "90px",
      "@media (max-width:500px)": {
        right: "4px"
      }
    },
  };
  const formsx: SxProps = {
    flexDirection: "row",
    "@media (max-width:900px)": {
      display: "none",
    },
  };

  const desktopsx: SxProps = {
    width: "392px",
    height: "48px",
    margin: "0px 20px 0px 108px",
    fontSize: "14px",
    "& fieldset": {
      borderColor: "#e0e2ea",
      borderRadius: "8px"
    },
    "@media (max-width:900px)": {
      display: "none",
    },
  }

  const mobilesx: SxProps = {
    width: "100%",
    height: "48px",
    marginBottom: "24px",
    fontSize: "14px",
    "& fieldset": {
      borderColor: "#e0e2ea",
      borderRadius: "8px"
    },
    "@media (min-width:900px)": {
      display: "none",
    },
  }
  return (
    <nav>
      <div className="nav-row-container">
        <Link to="/home">join.tsh.io</Link>
        <SearchComponent sx={desktopsx}/>
        <FormGroup sx={formsx}>
          <AppCheckbox />
        </FormGroup>
        {user ? (
          <>
            <img
              src={user?.avatar}
              alt="avatar"
              onClick={handleClickOpen}
            ></img>
            <Dialog
              open={open}
              onClose={handleClose}
              hideBackdrop
              sx={dialogsx}
            >
              <div className="logout-dropdown" onClick={handleLogout}>
                <p>Logout</p>
              </div>
            </Dialog>
          </>
        ) : (
          <>
            <Link to="/" className="login-button">
              Log in
            </Link>
          </>
        )}
      </div>
      <div className="mobile-nav-container">
        <SearchComponent sx={mobilesx} />
        <FormGroup
          sx={{
            flexDirection: "row",
          }}
        >
          <AppCheckbox />
        </FormGroup>
      </div>
    </nav>
  );
}

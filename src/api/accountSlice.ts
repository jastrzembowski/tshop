import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { router } from "../routing/AppRoutes";

interface AccountState {
  user: {
    id: string;
    user: string;
    avatar: string;
  } | null;
  status: string;
  loginError: boolean;
}

const initialState: AccountState = {
  user: null,
  status: "idle",
  loginError: false,
};

export const login = createAsyncThunk(
  "account/login",
  async ({ username, password }: FieldValues, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/users/login",
        {
          username: username,
          password: password,
          headers: {
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token);

      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await axios.get(
        "http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return user.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      (state.user = null), localStorage.removeItem("token");
      router.navigate("/");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pendingLogin";
        state.loginError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        router.navigate("/home");
        state.status = "idle";
      })
      .addCase(login.rejected, (state) => {
        state.status = "idle";
        state.loginError = true;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "pendingLogin";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        router.navigate("/home");
        state.status = "idle";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "idle";
      });
  },
});
export const { logout } = accountSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";

interface AccountState {
  user: {
    id: string;
    user: string;
    avatar: string;
  } | null;
  status: string;
}

const initialState: AccountState = {
  user: null,
  status: "idle",
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

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pendingLogin";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.status = "idle";
      })
      .addCase(login.rejected, (state) => {
        state.status = "idle";
      });
  },
});

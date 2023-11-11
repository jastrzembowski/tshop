import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Item, ItemParams } from "../models/item";
import { MetaData } from "../models/meta";
import { RootState } from "./configureStore";

interface CatalogState {
  metaData: MetaData | null;
  status: string;
  itemsLoaded: boolean;
  itemParams: ItemParams;
}

function initParams() {
  return {
    currentPage: 1,
    itemsPerPage: 8,
  };
}

const initialState: CatalogState = {
  metaData: null,
  status: "idle",
  itemsLoaded: false,
  itemParams: initParams(),
};
const productsAdapter = createEntityAdapter<Item>();

function getAxiosParams(itemParams: ItemParams) {
  const params = new URLSearchParams();
  params.append("page", itemParams.currentPage.toString());
  params.append("limit", itemParams.itemsPerPage.toString());
  // params.append("searchTerm", productParams.searchTerm);
  return params;
}

export const fetchItemsAsync = createAsyncThunk<
  Item[],
  void,
  { state: RootState }
>("catalog/fetchItemsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.itemParams);

  try {
    const response = await axios({
      method: "get",
      url: `http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/products?${params}`,
      headers: {
        Accept: "application/json",
      },
    });
    thunkAPI.dispatch(setMetaData(response.data.meta));
    return response.data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>(initialState),
  reducers: {
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.itemsLoaded = false;
      state.itemParams = { ...state.itemParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.itemsLoaded = true;
    });
    builder.addCase(fetchItemsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});
export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setMetaData, setPageNumber } = catalogSlice.actions;

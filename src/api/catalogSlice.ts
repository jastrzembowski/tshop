import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Item, ItemParams } from "../models/item";
import { MetaData } from "../models/meta";
import { RootState } from "./configureStore";

interface CatalogState {
  metaData: MetaData | null;
  status: string;
  itemsLoaded: boolean;
  itemParams: ItemParams;
  appLoaded: boolean,
  itemsError: boolean
}

function initParams() {
  return {
    searchString: "",
    currentPage: 1,
    itemsPerPage: 8,
  };
}

const initialState: CatalogState = {
  metaData: null,
  status: "idle",
  itemsLoaded: false,
  itemParams: initParams(),
  appLoaded: false,
  itemsError: false
};
const productsAdapter = createEntityAdapter<Item>();

function getAxiosParams(itemParams: ItemParams) {
  const params = new URLSearchParams();
  params.append("search", itemParams.searchString);
  params.append("page", itemParams.currentPage.toString());
  params.append("limit", itemParams.itemsPerPage.toString());
  itemParams.promo && params.append("promo", itemParams.promo.toString());
  itemParams.active && params.append("active", itemParams.active.toString());

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
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>(initialState),
  reducers: {
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setProductParams: (state, action) => {
      state.itemsLoaded = false;
      state.itemParams = {
        ...state.itemParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.itemsLoaded = false;
      state.itemParams = { ...state.itemParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
      state.itemsLoaded = false
      state.itemsError= false
    });
    builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.itemsLoaded = true;
      state.appLoaded = true
    });
    builder.addCase(fetchItemsAsync.rejected, (state) => {
      state.status = "idle";
      state.itemsError = true
    });
  },
});
export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setMetaData, setPageNumber, setProductParams } =
  catalogSlice.actions;

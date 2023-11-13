import { useEffect } from "react";
import {
  fetchItemsAsync,
  productSelectors
} from "../../api/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import ItemCard from "./ItemCard";
import "./catalog.scss";
import { Grid } from "@mui/material";
import AppPagination from "../components/pagination/AppPagination";
import NoItemsError from "../components/NoItemsError";

export default function Main() {
  const dispatch = useAppDispatch();
  const { itemsLoaded, metaData } = useAppSelector((state) => state.catalog);
  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    if (!itemsLoaded) dispatch(fetchItemsAsync());
  }, [itemsLoaded, dispatch]);

  return (
    <article className="items-container">
      {products.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ItemCard product={product} />
              </Grid>
            ))}
          </Grid>
          {metaData && <AppPagination metaData={metaData} />}
        </>
      ) : (
        <NoItemsError />
      )}
    </article>
  );
}

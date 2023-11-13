import { useEffect } from "react";
import { fetchItemsAsync, productSelectors } from "../../api/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import ItemCard from "./ItemCard";
import "./catalog.scss";
import { Grid } from "@mui/material";
import AppPagination from "../components/pagination/AppPagination";
import NoItemsError from "../components/NoItemsError";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Loader from "../../ui/loader/Loader";

export default function Main() {
  const dispatch = useAppDispatch();
  const { itemsLoaded, metaData, appLoaded, itemsError } = useAppSelector(
    (state) => state.catalog
  );
  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    if (!itemsLoaded) dispatch(fetchItemsAsync());
  }, [itemsLoaded, dispatch]);


  return (
    <article className="items-container">
      {itemsError ? (
        <NoItemsError
          text={"We encountered error while fetching data. Try again later"}
        />
      ) : (
        <>
          {!appLoaded ? (
            <Loader />
          ) : products.length > 0 ? (
            <>
    <Grid container spacing={4} >
                {products.map((product) => (
                  <Grid key={product.id} item xs={12} sm={12} md={6} lg={3}>
                    {!itemsLoaded ? (
                      <ProductCardSkeleton />
                    ) : (
                      <ItemCard product={product} />
                    )}
                  </Grid>
                ))}
              </Grid>
              {metaData && <AppPagination metaData={metaData} />}
            </>
          ) : (
            <NoItemsError text={"There are no products on the list"} />
          )}
        </>
      )}
    </article>
  );
}

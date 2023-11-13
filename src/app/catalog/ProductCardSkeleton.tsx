import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Grid
      item
      xs
      component={Card}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
      <CardActions>
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            sx={{ marginLeft: "10px" }}
          />
      </CardActions>
      <Skeleton
        sx={{ height: 40, width: "80%", margin: "10px", alignSelf: "center" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
}

import { Box, Pagination } from "@mui/material";
import { MetaData } from "../../models/meta";
import { setPageNumber } from "../../api/catalogSlice";
import { useAppDispatch } from "../../api/configureStore";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}
export default function AppPagination({ metaData, onPageChange }: Props) {
  const { totalPages, currentPage } = metaData;
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <p onClick={() => dispatch(setPageNumber({ currentPage: 1 }))}>First</p>
      <Pagination
        size="small"
        count={totalPages}
        page={currentPage}
        siblingCount={1}
        boundaryCount={0}
        hidePrevButton
        hideNextButton
        onChange={(e, page) => onPageChange(page)}
        sx={{ padding: "20px" }}
      />
      <p onClick={() => dispatch(setPageNumber({ currentPage: totalPages }))}>
        Last
      </p>
    </Box>
  );
}

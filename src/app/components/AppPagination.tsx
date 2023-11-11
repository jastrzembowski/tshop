import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../../models/meta";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}
export default function AppPagination({ metaData, onPageChange }: Props) {
  const { totalItems, totalPages, currentPage, itemsPerPage } = metaData;



  
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying
        {(currentPage - 1) * itemsPerPage + 1} -
        {currentPage * itemsPerPage > totalItems
          ? totalItems
          : currentPage * itemsPerPage}
        of {totalItems} items
      </Typography>
      <Pagination
        color="secondary"
        size="small"
        count={totalPages}
        page={currentPage}
        siblingCount={0}
        boundaryCount={1}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
}

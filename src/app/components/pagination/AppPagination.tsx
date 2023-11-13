import { setPageNumber } from "../../../api/catalogSlice";
import { useAppDispatch } from "../../../api/configureStore";
import { MetaData } from "../../../models/meta";
import "./pagination.scss";

interface Props {
  metaData: MetaData;
}
export default function AppPagination({ metaData }: Props) {
  const { totalPages, currentPage } = metaData;
  const dispatch = useAppDispatch();

  const generatePagination = () => {
    if (totalPages <= 6) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (currentPage === 3 && totalPages === 7) {
      return [2, 3, 4, 5,  totalPages - 1, totalPages];
    } else if (currentPage === 3) {
      return [2, 3, 4, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (
      (currentPage === 4 && totalPages === 7) ||
      currentPage >= totalPages - 5
    ) {
      return [
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
  };
  const pagination = generatePagination();

  return (
    <div className="pagination-box">
      <button
        disabled={currentPage == 1}
        onClick={() => dispatch(setPageNumber({ currentPage: 1 }))}
      >
        First
      </button>
      {pagination.map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          onClick={() => dispatch(setPageNumber({ currentPage: page }))}
          className={currentPage == page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage == totalPages}
        onClick={() => dispatch(setPageNumber({ currentPage: totalPages }))}
      >
        Last
      </button>
    </div>
  );
}

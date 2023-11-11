export interface Item {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  promo: boolean;
  active: boolean;
}
export interface ItemParams {
  searchString: string;
  currentPage: number;
  itemsPerPage: number;
  promo?: boolean;
  active?: boolean;
}

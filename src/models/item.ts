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
  currentPage: number;
  itemsPerPage: number;
}

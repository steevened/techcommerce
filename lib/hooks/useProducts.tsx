import { useQuery } from 'react-query';
import { techApi } from '../api/techApi';
import { ProductsResponse } from '../interfaces/products.interface';

export const getProductById = async (id: string): Promise<ProductsResponse> => {
  const { data } = await techApi.get(`/products/${id}`);
  return data;
};

export const useProductById = (id: string) => {
  const productQuery = useQuery(['product', id], () => getProductById(id));

  return productQuery;
};

export default getProductById;

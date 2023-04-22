import { useQuery } from 'react-query';
import { techApi } from '../api/techApi';
import {
  ProductsResponse,
  AddProductToCart,
  CartResponse,
} from '../interfaces/products.interface';

export const getProductById = async (id: string): Promise<ProductsResponse> => {
  const { data } = await techApi.get(`/products/${id}`);
  return data;
};

export const useProductById = (id: string) => {
  const productQuery = useQuery(['product', id], () => getProductById(id));

  return productQuery;
};

export const addProductToCart = async (data: AddProductToCart) => {
  const res = await techApi.post('/cart', data);
  return res;
};

export const getCartProducts = async () => {
  const data = await techApi.get('/cart');
  return data;
};

export default getProductById;

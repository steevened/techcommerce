import { useMutation, useQuery, useQueryClient } from 'react-query';
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

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(addProductToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });
};

const getCartProducts = async () => {
  const { data } = await techApi.get<CartResponse[]>('/cart');
  return data;
};

export const useCartProducts = () => {
  const { data, error, isError, isLoading } = useQuery(
    ['cart'],
    getCartProducts
  );

  return { data, error, isError, isLoading };
};

const deleteProductToCart = async (id: number) => {
  const res = await techApi.delete(`/cart/${id}`);
  return res;
};

export const useDeleteProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProductToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });
};

const updateProductQuantity = ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) => {
  const res = techApi.put(`/cart/${id}`, { quantity });
  return res;
};

export const useUpdateProductQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProductQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });
};

export default getProductById;

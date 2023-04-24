import { useMutation, useQuery, useQueryClient } from 'react-query';
import { techApi } from '../api/techApi';
import {
  ProductsResponse,
  AddProductToCart,
  CartResponse,
  PurchasesResponse,
} from '../interfaces/products.interface';
import { useContext } from 'react';
import { UIContext } from '@/context/ui/UIContext';

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

export const getProductById = async (id: string): Promise<ProductsResponse> => {
  const { data } = await techApi.get(`/products/${id}`);
  return data;
};

export const useProductById = (id: string) => {
  const productQuery = useQuery(['product', id], () => getProductById(id));

  return productQuery;
};

const addProductToCart = async (data: AddProductToCart) => {
  const res = await techApi.post('/cart', data);
  return res;
};

export const useAddProductToCart = () => {
  const { productsOnCart, setProductsOnCart } = useContext(UIContext);
  const queryClient = useQueryClient();
  return useMutation(addProductToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
      setProductsOnCart(productsOnCart + 1);
    },
  });
};

const deleteProductToCart = async (id: number) => {
  const res = await techApi.delete(`/cart/${id}`);
  return res;
};

export const useDeleteProductToCart = () => {
  const { productsOnCart, setProductsOnCart } = useContext(UIContext);
  const queryClient = useQueryClient();
  return useMutation(deleteProductToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
      setProductsOnCart(productsOnCart - 1);
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

const getUserPurchases = async () => {
  const res = await techApi.get<PurchasesResponse[]>('/purchases');
  return res.data;
};

export const useUserPurchases = () => {
  const { data, error, isError, isLoading } = useQuery(
    ['purchases'],
    getUserPurchases
  );

  return { data, error, isError, isLoading };
};

const createPurchase = async () => {
  const res = await techApi.post('/purchases');
  return res;
};

export const useCreatePurchase = () => {
  const { productsOnCart, setProductsOnCart } = useContext(UIContext);
  const queryClient = useQueryClient();
  return useMutation(createPurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
      setProductsOnCart(0);
    },
  });
};

export default getProductById;

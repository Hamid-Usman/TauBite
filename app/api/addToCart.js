// api/cart.js
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const token = localStorage.getItem('auth_token')
const addToCartApi = async (cartItem) => {
  const response = await axios.post('http://127.0.0.1:8000/cart/', cartItem, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return response.data;
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: addToCartApi
  });
};

// hooks/useOrderMutations.js
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const updateOrderStatus = async ({ id, status }) => {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("No auth token found");
  if (!id) throw new Error("Order ID is required");

  const response = await axios.patch( // Changed from PUT to PATCH
    `${apiUrl}/order/${id}/`, // Added /status/ endpoint
    { status },
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { updateOrderStatus: updateStoreStatus } = useOrderStore();

  return useMutation({
    mutationFn: updateOrderStatus,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] });
      const previousOrders = queryClient.getQueryData(['orders']);

      queryClient.setQueryData(['orders'], (old) => 
        old?.map(order => 
          order.id === variables.id 
            ? { ...order, status: variables.status } 
            : order
        ) || []
      );

      return { previousOrders };
    },
    onSuccess: (data, variables) => {
        updateStoreStatus(variables.id, variables.status);
    },
    onError: (err, variables, context) => {
      console.error("Status update failed:", err);
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  loadTokenFromStorage: async () => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      set({ token: storedToken });

      try {
        const res = await axios.get(`${apiUrl}/auth/users/me/`, {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        });
        set({ user: res.data });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("auth_token");
        set({ user: null, token: null });
      }
    }
  },
}));

export default useUserStore;

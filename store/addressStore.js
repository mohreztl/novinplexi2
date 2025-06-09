// store/addressStore.js
import { create } from "zustand";

export const useAddressStore = create((set) => ({
  addresses: [],
  selectedAddress: null,
  setAddresses: (addresses) => set({ addresses }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));

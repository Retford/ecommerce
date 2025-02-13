import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// interface Address {
//   firstName: string;
//   lastName: string;
//   address: string;
//   addressTwo?: string;
//   postalCode: string;
//   city: string;
//   country: string;
//   phone: string;
// }

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    addressTwo?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
  // Methods
  // setAddress: (address: Address) => void;
  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        addressTwo: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: 'address-storage' }
  )
);

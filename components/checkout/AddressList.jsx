// components/AddressList.js
import { useEffect } from "react";
import { useAddressStore } from "@/store/addressStore";

export default function AddressList() {
  const { addresses, setAddresses, selectedAddress, setSelectedAddress } = useAddressStore();

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await fetch("/api/address/list");
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">انتخاب آدرس ذخیره‌شده</h3>
      {addresses.length === 0 ? (
        <p>هیچ آدرسی ذخیره نشده است.</p>
      ) : (
        <ul className="space-y-2">
          {addresses.map((address) => (
            <li
              key={address._id}
              className={`p-2 border rounded cursor-pointer ${
                selectedAddress?._id === address._id ? "bg-blues/90 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              {address.street}, {address.city}, {address.province}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

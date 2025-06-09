import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditProductButton = ({ productId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/editProduct/${productId}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="bg-blues/90 text-white hover:bg-blues focus:ring-2 focus:ring-blue-300"
    >
      Edit Product
    </Button>
  );
};

export default EditProductButton;
